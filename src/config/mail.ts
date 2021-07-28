import { TransportOptions } from 'nodemailer';
import {
  MAIL_HOST, MAIL_PASS, MAIL_PORT, MAIL_USER,
} from '../constants/env';

const mailTransportConfig = {
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
} as TransportOptions;

export { mailTransportConfig };
