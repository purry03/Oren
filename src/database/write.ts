import database from './index';

export async function addUser(name: string,password: string){
	const text = 'INSERT INTO users(name,password) VALUES($1, $2)';
	const values = [name, password];
	await database.query(text,values);
	return;
}

export async function addResponse(user: number,data: string){
	const text1 = 'DELETE FROM responses WHERE user_id = $1';
	const values1 = [user];
	await database.query(text1,values1);
	const text2 = 'INSERT INTO responses(user_id,data) VALUES($1, $2)';
	const values2 = [user, data];
	await database.query(text2,values2);
	return;
}