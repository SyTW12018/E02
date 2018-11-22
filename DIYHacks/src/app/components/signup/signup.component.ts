import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [`
    a {
      color: #48924A;
    }
    .wrapper {
      padding: 50px 20px;
    }
    .main-logo {
      max-width: 300px;
    }
    .main-form {
      margin: 30px 0 15px;
    }
    .btn-signup {
      background-color: #48924A;
      color: white;
    }
    .btn-facebook {
      background-color: #3B5998;
      color: white;
    }
    .wrong {
      border: 1px solid #d00;
    }
    .correct {
      color: #48924A;
    }
    .text-wrong {
      color: #D00;
    }
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
