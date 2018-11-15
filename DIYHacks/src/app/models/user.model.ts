
export class User  {

  constructor(u:String, p:String, e:String) {
    this.username = u;
    this.password = p;
    this.email = e;
  }
  username:String;
  password:String;
  email:String;

  saludar() {
    return `Hola soy ${this.username}`
  }

}
