export class PostContent  {

  constructor(m:string, t:string, id?:string) {
    this._id = id;
    this.media = m;
    this.text = t;
  }
  _id:string;
  media:string; 
  text:string;

}
