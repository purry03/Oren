import { Request, Response } from 'express';
import {getAllQuestions, getAllUsers, getUserByID, getUserByName} from '../database/read';

export async function getIndex(req: Request,res: Response){
	const user = await getUserByName(req.user!.name);
	const questions = await getAllQuestions();
	res.render('user/index',{user, questions});
}

export async function getUsersAPI(req: Request,res: Response){
	const {filter} = req.params;
	if(filter === 'all'){
		const users = await getAllUsers();
		res.send(users);
	}
	else{
		const user = await getUserByID(filter);
		if(user === null){
			// if user does not exist
			res.send([]);
			return;
		}
		delete user!['password'];
		res.send([user]);
	}
}