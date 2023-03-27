/* eslint-disable no-case-declarations */
import { NextFunction, Request, Response } from 'express';
import {getAllQuestions, getFilesByUser, getReponseByUser, getUserByName} from '../database/read';
import { addFile, addResponse } from '../database/write';
import UID from 'uid-safe';
import { UploadedFile } from 'express-fileupload';

import path from 'path';

export async function getReponses(req: Request,res: Response){
	const user = await getUserByName(req.user!.name);
	const questions = await getAllQuestions();
	const response = await getReponseByUser(user!.id);
	const files = await getFilesByUser(user!.id);
	res.render('user/response',{user, questions, response, files});
}

export async function postResponse(req: Request,res: Response){
	const user = await getUserByName(req.user!.name);
	await addResponse(user!.id, req.body);
	res.sendStatus(200);
}


export async function getResponseFile(req: Request,res: Response){
	const {uuid} = req.params;
	const user = await getUserByName(req.user!.name);
	// get all files of this user
	const files = await getFilesByUser(user!.id);
	if(files === null){
		res.sendStatus(404);
		return;
	}
	// search for file with given uuid
	for(const key in files!.data){
		const file = (files as any).data[key];
		if(file.uuid === uuid){
			// if found, download file
			res.download(path.join(__dirname,'..','..','data',uuid), file.name);
			return;
		}
	}
	// else send 404
	res.sendStatus(404);
}

export async function postResponseFile(req: Request,res: Response){
	const user = await getUserByName(req.user!.name);
	const dbData: any = {};	// to store data to be stored in db
	// iterate through all files
	for(const questionId in req.files){
		const file = req.files[questionId];
		// generate random id for file
		const fileId = await UID(6);
		// save file to disk
		await (file as UploadedFile).mv(path.join(__dirname,'..','..','data',fileId));
		// append to dbData
		dbData[questionId] = {
			uuid: fileId,
			name:(file as UploadedFile).name
		};
	}
	await addFile(user!.id, dbData);
	res.sendStatus(200);
}

export async function getResponseAPI(req: Request,res: Response,next: NextFunction){
	try{
		const userId = parseInt(req.params.userId);
		const user = await getUserByName(req.user!.name);
		if(userId !== user!.id){
			// if current user id is not the same as the one in the request
			res.redirect(403, '/auth');
			return;
		}
		const response = await getReponseByUser(userId);
		if(response === null){
			// if the response does not exist
			res.send([]);
			return;
		}
		res.send([response]);
	}
	catch(err){
		next(err);
	}
}

export async function getPrettyResponseAPI(req: Request,res: Response){
	const userId = parseInt(req.params.userId);
	const user = await getUserByName(req.user!.name);
	if(userId !== user!.id){
		res.redirect(403, '/auth');
		return;
	}
	const response = await getReponseByUser(userId);
	if(response === null){
		res.send([]);
		return;
	}
	const files = await getFilesByUser(userId);
	const questions = await getAllQuestions();
	const prettyResponses: any = {};	// initialize to empty object

	const data: any = response!.data;	// extract response

	prettyResponses['questions'] = {};

	// handle questions
	for(const questionId in data){
		const responseData = data[questionId];	// store response data
		// find responseData in questions
		let title = '';
		let question: any = {type:0, content: ''};	// empty object to destructure question data to
		for(const q of questions){
			if(q.id.toString() === questionId){
				question = q.data;
				title = q.title!;
				break;
			}
		}
		let idx = 0;
		switch(question.type){
		case 1:	// general text questions
			prettyResponses['questions'][question.content] = responseData;	// store as {question:response}
			break;
		case 2:	// tabular questions
			prettyResponses['questions'][title] = {};
			idx = 0;
			for(const col of question.content[1]){
				prettyResponses['questions'][title][col] = {};
				for(const row of question.content[0]){
					prettyResponses['questions'][title][col][row] = responseData[idx];
					idx+=1;
				}
			}
			break;
		case 3:	// dynamic row questions
			prettyResponses['questions'][question.content] = [];
			for(const itm of responseData){
				prettyResponses['questions'][question.content].push(itm);
			}
			break;
		case 4:	// yes/no + details questions
			prettyResponses['questions'][title] = {};
			idx = 0;
			for(const row of question.content){
				prettyResponses['questions'][title][row] = {};
				prettyResponses['questions'][title][row]['Yes/No'] = responseData[idx*2];
				prettyResponses['questions'][title][row]['Details'] = responseData[idx*2+1];

				idx += 1;
			}
			break;
		case 5:	// tabular quesstions with multiple tabs
			let tabIdx = 0;
			for(const tab in question.content){
				prettyResponses['questions'][tab] = {};
				const tabData = question.content[tab];	// extract responses for one tab
				idx = 0;
				for(const col of tabData[1]){	// generate key value pairs for the tab
					prettyResponses['questions'][tab][col] = {};
					for(const row of tabData[0]){
						prettyResponses['questions'][tab][col][row] = responseData[tabIdx][idx];
						idx+=1;
					}
				}
				tabIdx += 1;	// increment tab count to move to next tab
			}
			break;
		}
	}

	prettyResponses['attachments'] = {};

	if(files !== null){
	// handle files
		const fileData = files!.data;
		for(const questionId in fileData){
			const {uuid,name} = (fileData as any)[questionId];

			let title = '';
			let question: any = {type:0, content: ''};	// empty object to destructure question data to
			for(const q of questions){
				if(q.id.toString() === questionId){
					question = q.data;
					title = q.title!;
					break;
				}
			}

			if(title !== '' && title !== null){	// if question has a title
				prettyResponses['attachments'][title] = {uuid,name};	// then display attachment with title
			}
			else{
				prettyResponses['attachments'][question.content] = {uuid,name};	// otherwise use question content
			}

		}
	}

	res.status(200).send(prettyResponses);

}