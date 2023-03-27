import { User, Response, File } from './index';

export async function addUser(name: string,password: string){
	await User.create({
		name,
		password
	});
	return;
}

export async function addResponse(user: number,data: object){
	await Response.destroy({	// remove any existing response for this user
		where: {
			user_id: user
		}
	});
	await Response.create({	// add a new response
		user_id: user,
		data
	});
	return;
}

export async function addFile(user: number,data: object){
	await File.destroy({	// remove any existing file for this user
		where: {
			user_id: user
		}
	});
	await File.create({	// add a new file
		user_id: user,
		data
	});
	return;
}