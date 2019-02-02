import { PostContent } from './postcontent.model';
import { Comment } from './comment.model';

export class Post  {

  constructor(a:String,
              f:Date, 
              t:String,
              c:PostContent,
              l:Number,
              comms:[Comment],
              id?:String) {
    this._id = id;
    this.author = a;
    this.title = t;
    this.date = f;
    this.content = c;
    this.likes = l;
    this.comments = comms;
  }
  author:String;
  title:String;
  date:Date;
  content:PostContent;
  likes:Number;
  comments:[Comment];
  _id:String;

  saludar() {
    return `Hola, soy ${this.author}`
  }

}
