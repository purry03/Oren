import { Question, User, Response } from '../declarations';
import database from './index';

export async function getUserByName(name: string): Promise<User>{
	const text = 'SELECT * FROM users WHERE name = $1';
	const values = [name];
	const user = await (await database.query(text,values)).rows[0];
	return user;
}

export async function getUserByID(id: number|string): Promise<User>{
	const text = 'SELECT * FROM users WHERE id = $1';
	const values = [id];
	const user = await (await database.query(text,values)).rows[0];
	return user;
}

export async function getAllUsers(): Promise<User[]>{
	const text = 'SELECT * FROM users ORDER BY id ASC';
	const users = await (await database.query(text)).rows;
	return users;
}

export async function getAllQuestions(): Promise<Question[]>{
	const text = 'SELECT * FROM questions ORDER BY id ASC';
	const questions = await (await database.query(text)).rows;
	return questions;
}

export async function getQuestionByID(id: number|string): Promise<Question>{
	const text = 'SELECT * FROM questions WHERE id = $1';
	const values = [id];
	const question = await (await database.query(text,values)).rows[0];
	return question;
}

export async function getReponseByUser(userId: number|string): Promise<Response>{
	const text = 'SELECT * FROM responses WHERE user_id = $1';
	const values = [userId];
	const response = await (await database.query(text, values)).rows[0];
	return response;
}

export async function getReponseByID(id: number): Promise<Response>{
	const text = 'SELECT * FROM responses WHERE id = $1';
	const values = [id];
	const response = await (await database.query(text, values)).rows[0];
	return response;
}

export async function getAllResponses(): Promise<Response[]>{
	const text = 'SELECT * FROM responses ORDER BY id ASC';
	const response = await (await database.query(text)).rows;
	return response;
}