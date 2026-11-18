import { Router } from 'express';
import * as index from '../controllers/indexController.js';

const indexRouter = Router();

indexRouter.get('/', index.rootGet);

export default indexRouter;
