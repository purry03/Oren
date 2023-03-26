/* eslint-disable no-case-declarations */
import { Request, Response } from 'express';
import {getAllQuestions, getAllResponses, getReponseByID, getReponseByUser} from '../database/read';

export async function getResponseAPI(req: Request,res: Response){
	const {filter} = req.params;
	if(filter === 'all'){
		const questions = await getAllResponses();
		res.send(questions);
	}
	else{
		const question = await getReponseByUser(filter);
		if(typeof question === 'undefined'){
			res.send([]);
			return;
		}
		res.send([question]);
	}
}

export async function getPrettyResponseAPI(req: Request,res: Response){
	const {userId} = req.params;
	const response = await getReponseByUser(userId);
	const questions = await getAllQuestions();
	const prettyResponses: any = {};

	const data = response.data;
	for(const key in data){
		const value = data[key];
		// find value in questions
		let title = '';
		let question: {type: number, content: any} = {type:0, content: ''};
		for(const q of questions){
			if(q.id.toString() === key){
				question = q.data;
				title = q.title;
				break;
			}
		}
		let idx = 0;
		switch(question.type){
		case 1:	
			prettyResponses[question.content] = value;
			break;
		case 2:
			prettyResponses[title] = {};
			idx = 0;
			for(const row of question.content[0]){
				prettyResponses[title][row] = {};
				for(const col of question.content[1]){
					prettyResponses[title][row][col] = value[idx];
					idx+=1;
				}
			}
			break;
		case 3:
			prettyResponses[question.content] = [];
			for(const itm of value){
				prettyResponses[question.content].push(itm);
			}
			break;
		case 4:
			prettyResponses[title] = {};
			idx = 0;
			for(const row of question.content){
				prettyResponses[title][row] = {};
				prettyResponses[title][row]['Yes/No'] = value[idx*2];
				prettyResponses[title][row]['Details'] = value[idx*2+1];

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
						prettyResponses[tab][row][col] = value[tabIdx][idx];
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