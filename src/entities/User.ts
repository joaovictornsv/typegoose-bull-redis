/* eslint-disable func-names */
/* eslint-disable no-use-before-define */
import {
  getModelForClass, post, pre, prop,
} from '@typegoose/typegoose';

@pre<User>('save', function () {
  if (this.email.match(/@gmail.com$/i)) {
    this.isGmail = true;
  }
})

@post<User>('save', function () {
  console.log(this.isGmail ? 'Gmail account registered' : 'Another email account registered');
})

class User {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public email!: string;

  @prop({ default: false })
  public verifiedEmail: boolean;

  @prop({ default: false })
  public isGmail: boolean;
}

const UserModel = getModelForClass(User);

export { UserModel };
