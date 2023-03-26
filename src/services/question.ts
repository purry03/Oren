import { Request, Response } from 'express';
import {getAllQuestions, getQuestionByID} from '../database/read';

export async function getQuestionsAPI(req: Request,res: Response){
	const {filter} = req.params;
	if(filter === 'all'){
		const questions = await getAllQuestions();
		res.send(questions);
	}
	else{
		const question = await getQuestionByID(filter);
		if(typeof question === 'undefined'){
			// if question does not exist
			res.send([]);
			return;
		}
		res.send([question]);
	}
}