import express from 'express';
import * as auth from '../../services/auth';
import * as user from '../../services/user';
import * as question from '../../services/question';
import * as response from '../../services/response';
import { requireUserAuth } from '../middlewares/auth';

const router = express.Router();

router.get('/auth',(req,res)=>{
	auth.getIndex(req,res);
});

router.get('/auth/signin',(req,res)=>{
	auth.getSignin(req,res);
});

router.post('/auth/signin',(req,res)=>{
	auth.postSignin(req,res);
});

router.get('/auth/register',(req,res)=>{
	auth.getRegister(req,res);
});

router.post('/auth/register',(req,res)=>{
	auth.postRegister(req,res);
});

router.get('/', requireUserAuth ,(req,res)=> {
	user.getIndex(req,res);
});

router.get('/response', requireUserAuth ,(req,res)=> {
	user.getReponses(req,res);
});

router.post('/response', requireUserAuth ,(req,res)=> {
	user.postResponse(req,res);
});

router.get('/api/users/get/:filter', (req,res)=> {
	user.getUsersAPI(req,res);
});

router.get('/api/questions/get/:filter', (req,res)=> {
	question.getQuestionsAPI(req,res);
});

router.get('/api/responses/get/:filter', (req,res)=> {
	response.getResponseAPI(req,res);
});

router.get('/api/responses/get/pretty/:userId', (req,res)=> {
	response.getPrettyResponseAPI(req,res);
});

export default router;
