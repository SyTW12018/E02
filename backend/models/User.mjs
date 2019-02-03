import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema({
  username:   { type:String },
  password:   { type:String },
  email:      { type:String },
  following:  { type:[String] },
  profilepic: { type:String, default: "none" }
});

export default mongoose.model('User', User);
