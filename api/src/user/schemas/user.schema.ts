import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 10,
    lowercase: true,
    required: true,
  },
  fullName: {
    type: String,
    minlength: 2,
    maxlength: 20,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  photo: {
    type: String,
    required: true,
    default: 'http://mybroadband.co.za/news/wp-content/uploads/2017/04/Twitter-profile-picture.jpg',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});
