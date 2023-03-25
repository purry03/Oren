import { Request, Response } from 'express';
import {getAllQuestions, getUserByName} from '../database/read';

export async function getIndex(req: Request,res: Response){
	const user = await getUserByName(req.user!.name);
	const questions = await getAllQuestions();
	res.render('user/index',{user, questions});
}
