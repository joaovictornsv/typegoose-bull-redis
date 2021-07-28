/* eslint-disable no-underscore-dangle */
import { mailTransport } from '../services/mail-transport';

const RegistrationMail = {
  key: 'RegistrationMail',
  async handle({ data }) {
    const { user } = data;

    console.log('Sending mail...');
    await mailTransport.sendMail({
      from: 'BullRedis <bull-redis@test.com>',
      to: `${user.name} <${user.email}>`,
      subject: `Bem-vindo ${user.name}!`,
      html: `<h2>Hello ${user.name}<h2>
      <p>Click here to verify your email => <a href="http://localhost:3333/users/verify-email/${user._id}">Verificar</a> </p>`,
    });
    console.log('Mail sended!');
  },
};

export { RegistrationMail };
