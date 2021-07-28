import 'dotenv/config';

import { mailQueue } from './services/mail-queue';
import { RegistrationMail } from './jobs/registration-mail';

mailQueue.process(RegistrationMail.handle);
