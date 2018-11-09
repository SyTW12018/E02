import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema({
  usuario: {
    type: String
  },
  password: {
    type: String
  }
});

export default mongoose.model('User', User);
