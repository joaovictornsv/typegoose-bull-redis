import Queue from 'bull';
import { redisConfig } from '../config/redis';
import { RegistrationMail } from '../jobs/registration-mail';

const mailQueue = new Queue(RegistrationMail.key, { redis: redisConfig });

export { mailQueue };
