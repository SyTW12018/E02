export class PostContent  {

  constructor(i:[String], v:String, t:String, id?:String) {
    this._id = id;
    this.images = i;
    this.video = v;
    this.text = t;
  }
  _id:String;
  images:[String];
  video:String;
  text:String;

}
