import { User } from '../declarations';
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

export async function getAllQuestions(): Promise<User[]>{
	const text = 'SELECT * FROM questions ORDER BY id ASC';
	const questions = await (await database.query(text)).rows;
	return questions;
}

export async function getReponseByUser(userId: number): Promise<User[]>{
	const text = 'SELECT * FROM responses WHERE user_id = $1';
	const values = [userId];
	const response = await (await database.query(text, values)).rows[0];
	return response;
}