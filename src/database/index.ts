import mongoose from 'mongoose';
import { DATABASE_URL } from '../constants/env';

function connectToDatabase() {
  mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.set('useFindAndModify', true);

  const db = mongoose.connection;

  db.on('error', (err) => console.error(err));

  db.once('open', () => {
    console.log('Connected to database!');
  });
}

export default connectToDatabase;
