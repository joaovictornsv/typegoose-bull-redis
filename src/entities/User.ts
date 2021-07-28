/* eslint-disable func-names */
/* eslint-disable no-use-before-define */
import {
  getModelForClass, prop,
} from '@typegoose/typegoose';

class User {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public email!: string;

  @prop({ default: false })
  public verifiedEmail: boolean;
}

const UserModel = getModelForClass(User);

export { UserModel };
