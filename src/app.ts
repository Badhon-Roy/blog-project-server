import express, { Application, Request, Response } from 'express';
import cors from "cors"
import router from './routes';
import { Error } from 'mongoose';
import { NextFunction } from 'express';
import globalErrorHandlers from './middlewares/globalErrorHandler';
const app: Application = express();

app.use(express.json());
app.use(cors())

//* application routes

app.use('/api/v1', router)


app.get('/', (req: Request, res: Response) => {
  res.send('🚀 Welcome to my blog project');
});



//* global error handler
app.use(globalErrorHandlers)

export default app;