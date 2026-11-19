import { Router } from 'express';
import * as authCont from '../controllers/authController.js';

const origin = `Error: file origins at ${(import.meta.dirname, import.meta.filename)}`;

const authRouter = Router();

//user registration request handlers
authRouter.get('/register', authCont.getRegistration);
authRouter.post('/register', authCont.postRegistration);

//user log-in request handlers
authRouter.get('/log-in', authCont.getLogIn);
export default authRouter;
