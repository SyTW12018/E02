import { PostContent } from './postcontent.model';
import { Comment } from './comment.model';

export class Post  {

  constructor(a:Autor,
              t:string,
              m:string,
              txt:string,
              l?:string[],
              comms?:[Comment],
              f?:Date,
              id?:string) {
    this._id = id;
    this.author = a;
    this.title = t;
    this.date = f;
    this.media = m;
    this.text = txt;
    this.likes = l;
    this.comments = comms;
  }
  author:Autor;
  title:String;
  date:Date;
  media:string;
  text:string;
  likes:string[];
  comments:Comment[];
  _id:String;

  saludar() {
    return `Hola, soy ${this.author}`
  }

}

export interface Autor {
  username:string;
  profilepic:string;
}
