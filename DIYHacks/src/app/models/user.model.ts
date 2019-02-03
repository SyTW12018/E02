
export class User  {

  constructor(u:string, p:string, e:string, f?:string[], pic?:string, id?:string,) {
    this._id = id;
    this.username = u;
    this.password = p;
    this.email = e;
    this.following = f;
    this.profilepic = pic;
  }
  _id:string;
  username:string;
  password:string;
  email:string;
  following:string[];
  profilepic:string;

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
