import express from 'express';
import * as auth from '../../services/auth';
import * as user from '../../services/user';
import * as admin from '../../services/admin';
import { requireAdminAuth, requireUserAuth } from '../middlewares/auth';

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

export default router;