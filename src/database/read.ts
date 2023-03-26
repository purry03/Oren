import { User,Question,Response, UserAttributes, QuestionAttributes, ResponseAttributes } from './index';

export async function getUserByName(name: string): Promise<UserAttributes|null>{
	const user = await User.findOne({
		where:{name},
	});
	return user;
}

export async function getUserByID(id: number|string): Promise<UserAttributes|null>{
	const user = await User.findOne({
		where:{id},
	});
	return user;
}

export async function getAllUsers(): Promise<UserAttributes[]>{
	const users = await User.findAll();
	return users;
}

export async function getAllQuestions(): Promise<QuestionAttributes[]>{
	const questions = await Question.findAll({
		order: [['id','ASC']]
	});
	return questions;
}

export async function getQuestionByID(id: number|string): Promise<QuestionAttributes|null>{
	const question = await Question.findOne({
		where:{id},
	});
	return question;
}

export async function getReponseByUser(userId: number|string): Promise<ResponseAttributes|null>{
	const response = await Response.findOne({
		where:{user_id: userId},
	});
	return response;
}

export async function getReponseByID(id: number): Promise<ResponseAttributes|null>{
	const response = await Response.findOne({
		where:{id},
	});
	return response;
}

export async function getAllResponses(): Promise<ResponseAttributes[]>{
	const response = await Response.findAll();
	return response;
}