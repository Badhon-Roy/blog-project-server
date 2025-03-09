import express, { Application, Request, Response } from 'express';
import cors from "cors"
import router from './routes';
import cookieParser from "cookie-parser"
import globalErrorHandlers from './middlewares/globalErrorHandler';
const app: Application = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors())

//* application routes

app.use('/api', router)


app.get('/', (req: Request, res: Response) => {
  res.send('🚀 Welcome to my blog project');
});



//* global error handler
app.use(globalErrorHandlers)

export default app;