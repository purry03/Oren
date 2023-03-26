/* eslint-disable no-case-declarations */
import { NextFunction, Request, Response } from 'express';
import {getAllQuestions, getReponseByUser, getUserByName} from '../database/read';
import { addResponse } from '../database/write';


export async function getReponses(req: Request,res: Response){
	const user = await getUserByName(req.user!.name);
	const questions = await getAllQuestions();
	const response = await getReponseByUser(user!.id);
	res.render('user/response',{user, questions, response});
}

export async function postResponse(req: Request,res: Response){
	const user = await getUserByName(req.user!.name);
	await addResponse(user!.id, req.body);
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
		if(typeof response === 'undefined'){
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
	const questions = await getAllQuestions();
	const prettyResponses: any = {};	// initialize to empty object

	const data: any = response!.data;	// extract response
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
			prettyResponses[question.content] = responseData;	// store as {question:response}
			break;
		case 2:	// tabular questions
			prettyResponses[title] = {};
			idx = 0;
			for(const col of question.content[1]){
				prettyResponses[title][col] = {};
				for(const row of question.content[0]){
					prettyResponses[title][col][row] = responseData[idx];
					idx+=1;
				}
			}
			break;
		case 3:	// dynamic row questions
			prettyResponses[question.content] = [];
			for(const itm of responseData){
				prettyResponses[question.content].push(itm);
			}
			break;
		case 4:	// yes/no + details questions
			prettyResponses[title] = {};
			idx = 0;
			for(const row of question.content){
				prettyResponses[title][row] = {};
				prettyResponses[title][row]['Yes/No'] = responseData[idx*2];
				prettyResponses[title][row]['Details'] = responseData[idx*2+1];

				idx += 1;
			}
			break;
		case 5:	// tabular quesstions with multiple tabs
			let tabIdx = 0;
			for(const tab in question.content){
				prettyResponses[tab] = {};
				const tabData = question.content[tab];	// extract responses for one tab
				idx = 0;
				for(const col of tabData[1]){	// generate key value pairs for the tab
					prettyResponses[tab][col] = {};
					for(const row of tabData[0]){
						prettyResponses[tab][col][row] = responseData[tabIdx][idx];
						idx+=1;
					}
				}
				tabIdx += 1;	// increment tab count to move to next tab
			}
			break;
		}
	}

	res.status(200).send(prettyResponses);

}