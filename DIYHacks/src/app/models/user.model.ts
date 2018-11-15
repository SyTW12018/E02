
export class User  {

  constructor(u:String, p:String, e:String, id?:String,) {
    this._id = id;
    this.username = u;
    this.password = p;
    this.email = e;
  }
  _id:String;
  username:String;
  password:String;
  email:String;

  saludar() {
    return `Hola, soy ${this.username}`
  }

  // updateUser( {name, pass, email} ) {
  //   console.log(`User update. Name ${name}; Pass ${pass}; Email ${email};`);
  //   if (name) this.username = name;
  //   if (pass) this.password = pass;
  //   if (email) this.email = email;
  //   console.log(`New user: Name ${this.username}; Pass ${this.password}; Email ${this.email};`)
  // }

}
