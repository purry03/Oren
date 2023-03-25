import database from './index';

export async function addUser(name: string,password: string){
	const text = 'INSERT INTO users(name,password) VALUES($1, $2)';
	const values = [name, password];
	await database.query(text,values);
	return;
}