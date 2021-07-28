import nodemailer from 'nodemailer';
import { mailTransportConfig } from '../config/mail';

const mailTransport = nodemailer.createTransport(mailTransportConfig);

export { mailTransport };
