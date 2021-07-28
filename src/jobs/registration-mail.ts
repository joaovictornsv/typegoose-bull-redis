import { mailTransport } from '../services/mail';

const RegistrationMail = {
  key: 'RegistrationMail',
  async handle({ data }) {
    const { user } = data;

    await mailTransport.sendMail({
      from: 'BullRedis <bull-redis@test.com>',
      to: `${user.name} <${user.email}>`,
      subject: `Bem-vindo ${user.name}!`,
      html: `<h2>Hello ${user.name}<h2>
      <p>Click here to verify your email => <a href="http://localhost:3333/users/verify-email/${user.id}">Verificar</a> </p>`,
    });
  },
};

export { RegistrationMail };
