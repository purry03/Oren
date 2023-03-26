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
			res.redirect(403, '/auth');
			return;
		}
		const question = await getReponseByUser(userId);
		if(typeof question === 'undefined'){
			res.send([]);
			return;
		}
		res.send([question]);
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
	const prettyResponses: any = {};

	const data: any = response!.data;
	for(const questionId in data){
		const responseData = data[questionId];
		// find responseData in questions
		let title = '';
		let question: any = {type:0, content: ''};
		for(const q of questions){
			if(q.id.toString() === questionId){
				question = q.data;
				title = q.title!;
				break;
			}
		}
		let idx = 0;
		switch(question.type){
		case 1:	
			prettyResponses[question.content] = responseData;
			break;
		case 2:
			prettyResponses[title] = {};
			idx = 0;
			for(const row of question.content[0]){
				prettyResponses[title][row] = {};
				for(const col of question.content[1]){
					prettyResponses[title][row][col] = responseData[idx];
					idx+=1;
				}
			}
			break;
		case 3:
			prettyResponses[question.content] = [];
			for(const itm of responseData){
				prettyResponses[question.content].push(itm);
			}
			break;
		case 4:
			prettyResponses[title] = {};
			idx = 0;
			for(const row of question.content){
				prettyResponses[title][row] = {};
				prettyResponses[title][row]['Yes/No'] = responseData[idx*2];
				prettyResponses[title][row]['Details'] = responseData[idx*2+1];

				idx += 1;
			}
			break;
		case 5:
			let tabIdx = 0;
			for(const tab in question.content){
				prettyResponses[tab] = {};
				const tabData = question.content[tab];
				idx = 0;
				for(const row of tabData[0]){
					prettyResponses[tab][row] = {};
					for(const col of tabData[1]){
						prettyResponses[tab][row][col] = responseData[tabIdx][idx];
						idx+=1;
					}
				}
				tabIdx += 1;
			}
			break;
		}
	}

	res.send(prettyResponses);

}