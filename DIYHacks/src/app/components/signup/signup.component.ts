import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [`
    
  `]
})
export class SignupComponent implements OnInit {

  datosUsuario:User = new User('','','');
  loadingUsernameStatus = false;
  usernameValido = false;

  constructor(private userService:UsersService) { }

  guardar( form:NgForm, username:any ) {
    this.checkUserAvailability();
    console.log('Funcion guardar')
    console.log(this.datosUsuario);
    console.log('Username ngmodel:',username)
  }

  checkUserAvailability () {
    this.loadingUsernameStatus = true;
    this.userService.getUser(this.datosUsuario.username).subscribe( (res) => {
      this.loadingUsernameStatus = false;

      res ? this.usernameValido = false : this.usernameValido = true;
      // if( res == undefined) {
      //   this.usernameValido = true;
      // } else {
      //   this.usernameValido = false;
      // }
      // console.log('checked for:', this.datosUsuario.username)
      console.log(res);
    })
  }

  saludar () {
    console.log('hola')
  }

  ngOnInit() {
  }

}
