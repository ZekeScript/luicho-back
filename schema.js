import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
  firstname: { type: String, required: true, max: 15 },
  lastname: { type: String, required: true, max: 15 },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  role: { type: String, default: 'user' }
})

export const UserModel = model('users', UserSchema)
