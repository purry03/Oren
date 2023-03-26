import { User, Response } from './index';

export async function addUser(name: string,password: string){
	await User.create({
		name,
		password
	});
	return;
}

export async function addResponse(user: number,data: object){
	await Response.destroy({
		where: {
			user_id: user
		}
	});
	await Response.create({
		user_id: user,
		data
	});
	return;
}