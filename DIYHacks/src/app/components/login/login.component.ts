import { Component } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsersService } from '../../services/users.service'
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`

  `]
})
export class LoginComponent {

  formulario:FormGroup;

  constructor(private userService:UsersService) {

    this.formulario = new FormGroup({
      'user':     new FormControl(  ''   , [
                          Validators.required,
                          Validators.minLength(4)
                        ] ),
      'password': new FormControl(  ''   , [
                          Validators.required,
                          Validators.minLength(6)
                        ] ),
      'checkme':  new FormControl( false , Validators.required )
    })

  }
  // login
  login() {
    console.log('Login')
    console.log(this.formulario)
    console.log(this.formulario.value)
  }


}
