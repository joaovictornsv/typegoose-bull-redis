import express from 'express';
import connectToDatabase from './database';
import { router } from './routes';

connectToDatabase();
const app = express();

app.use(express.json());
app.use(router);

export { app };
