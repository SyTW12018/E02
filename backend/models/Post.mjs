import mongoose from 'mongoose';
import PostContent from './PostContent';
import Comm from './comment';
import Like from './Like';

const Schema = mongoose.Schema;

let Post = new Schema({
  author:   { type: String },
  date:     { type: Date, default: Date.now },
  title:    { type: String },
  content:  { type: PostContent.schema },
  likes:    { type: [Like.schema] },
  comments: { type: [Comm.Schema] }
});

export default mongoose.model('Post', Post);
