import { Request, Response } from 'express';
import {getAllQuestions, getAllUsers, getReponseByUser, getUserByID, getUserByName} from '../database/read';
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
	res.sendStatus(200);
}

export async function getUsersAPI(req: Request,res: Response){
	const {filter} = req.params;
	if(filter === 'all'){
		const users = await getAllUsers();
		users.map((user)=>{delete user['password'];});
		res.send(users);
	}
	else{
		const user = await getUserByID(filter);
		if(typeof user === 'undefined'){
			res.send([]);
			return;
		}
		delete user['password'];
		res.send([user]);
	}
}