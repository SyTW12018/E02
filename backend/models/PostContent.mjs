import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let PostContent = new Schema({
  media: { type: String },
  text: { type: String }
})

export default mongoose.model('PostContent', PostContent);
