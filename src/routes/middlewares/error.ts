import { Request, Response } from 'express';
import logger from '../../utils/logger';

export function errorHandler(req:Request, res: Response, error: any){
	logger.error(error);
	res.render('error/500');
}

export function notFoundHandler(req:Request, res: Response, error: any){
	logger.error(`error 404 - not found: ${req.url}`);
	res.render('error/404');
}

export function forbiddenHandler(req:Request, res: Response, error: any){
	res.render('error/403');
}