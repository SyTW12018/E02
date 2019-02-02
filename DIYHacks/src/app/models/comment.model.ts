export class Comment  {

  constructor(a:String, f:Date, t:String, id?:String) {
    this._id = id;
    this.author = a;
    this.date = f;
    this.text = t;
  }
  _id:String;
  author:String;
  date:Date;
  text:String;

}
