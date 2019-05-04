import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    maxlength: 420,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  }
});
