import jwt from 'jsonwebtoken';
import config from '../../config';

import { NextFunction, Request, Response } from 'express';
import { errorHandler } from './error';

export async function authExtract(req: Request, res: Response, next: NextFunction) {
	try{
		let sessionToken = '';
		const authHeader = req.headers.authorization?.split(' ')[1];	// get auth header
		if(typeof authHeader !== 'undefined'){
			// extract token from header if supplied
			sessionToken = authHeader!;
		}
		else{
			// else use cookies
			sessionToken = req.cookies.sessionToken;
		}
		if(sessionToken === undefined || sessionToken === ''){
			// no session cookie found
			req.user = null;
		}
		else{
			const token = await jwt.verify(sessionToken,config.JWTSECRET!) as {sub:string};
			req.user = {
				name: token.sub,
			};
		}	
		next();
	}
	catch(err){
		errorHandler(req,res,err);
		return;
	}
}

export async function requireUserAuth(req: Request, res: Response, next: NextFunction) {
	if(req.user != null){
		if(req.user){
			next();
		}
		else{
			res.redirect(403,'/auth');
		}
	}
	else{
		// redirect to login page
		res.redirect(403, '/auth');
	}
}