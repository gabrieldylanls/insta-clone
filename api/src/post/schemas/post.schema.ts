import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 2,
    maxlength: 20,
    required: true,
  },
  content: {
    type: String,
    maxlength: 420,
    required: true,
  },
  photo: {
    type: String,
    required: false,
  },
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
});
