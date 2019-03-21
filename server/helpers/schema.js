import Joi from 'joi';

const string = Joi.string();
const email = Joi.string().email().lowercase().required();
const password = Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/).required();

export default {
  createUser: Joi.object().keys({
    firstName: string.required(),
    lastName: string.required(),
    email,
    password,
  }),
  signin: Joi.object().keys({
    email,
    password,
  }),
  newMessage: Joi.object().keys({
    from: email,
    receiverEmail: email,
    subject: string.required(),
    message: string.required(),
    status: string.valid(['sent', 'draft', 'read']).required(),
    parentMessageId: Joi.number().default(null),
  }),
  newGroup: Joi.object().keys({
    groupName: string.min(1).required(),
    // members: Joi.array().min(1).items(email).required(),
  }),
};
