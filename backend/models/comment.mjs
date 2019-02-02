import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Comm = new Schema({
  author:   { type: String },
  date:     { type: Date, default: Date.now },
  text:     { type: String }
});

export default mongoose.model('Comm', Comm);
