import { Router } from 'express';
import * as authCont from '../controllers/authController.js';

const origin = `Error: file origins at ${(import.meta.dirname, import.meta.filename)}`;

const authRouter = Router();

authRouter.get('/register', authCont.getRegistration);
authRouter.post('/register', authCont.postRegistration);

export default authRouter;
