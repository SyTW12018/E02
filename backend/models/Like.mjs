import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Like = new Schema({
  author:   { type: String }
});

export default mongoose.model('Like', Like);
