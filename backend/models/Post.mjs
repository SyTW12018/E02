import mongoose from 'mongoose';
// import PostContent from './PostContent';
import Comm from './comment';

const Schema = mongoose.Schema;

let Post = new Schema({
  author:   { type: String },
  title:    { type: String },
  media:    { type: String },
  text:     { type: String },
  likes:    { type: [String] },
  comments: { type: [Comm.schema] },
  date:     { type: Date, default: Date.now },
});

export default mongoose.model('Post', Post);
