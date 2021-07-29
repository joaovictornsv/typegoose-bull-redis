import express from 'express';
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import connectToDatabase from './database';
import { router } from './routes';
import { mailQueue } from './services/mail-queue';

connectToDatabase();
const app = express();

const serverAdapter = new ExpressAdapter();

createBullBoard({
  queues: [new BullAdapter(mailQueue)],
  serverAdapter,
});

app.use(express.json());
serverAdapter.setBasePath('/admin/queues');
app.use('/admin/queues', serverAdapter.getRouter());
app.use(router);

export { app };
