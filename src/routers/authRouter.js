import { Router } from 'express';
import * as authCont from '../controllers/authController.js';

const origin = `Error: file origins at ${(import.meta.dirname, import.meta.filename)}`;

const authRouter = Router();

authRouter.get('/register', authCont.getRegistration);

export default authRouter;
