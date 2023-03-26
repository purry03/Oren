import { Request, Response } from 'express';
import {getAllQuestions, getReponseByUser, getUserByName} from '../database/read';
import { addResponse } from '../database/write';

export async function getIndex(req: Request,res: Response){
	const user = await getUserByName(req.user!.name);
	const questions = await getAllQuestions();
	res.render('user/index',{user, questions});
}

export async function getReponses(req: Request,res: Response){
	const user = await getUserByName(req.user!.name);
	const questions = await getAllQuestions();
	const response = await getReponseByUser(user.id);
	res.render('user/response',{user, questions, response});
}

export async function postResponse(req: Request,res: Response){
	const user = await getUserByName(req.user!.name);
	await addResponse(user.id, JSON.stringify(req.body));
	res.send('done');
}
