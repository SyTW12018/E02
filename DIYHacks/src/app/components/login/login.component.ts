import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// import { UsersService } from '../../services/users.service'
// import { User } from '../../models/user.model';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`

  `]
})
export class LoginComponent implements OnInit {

  noValid = false;
  returnUrl:string;
  formulario:FormGroup;

  constructor(/*private userService:UsersService,*/
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {

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
  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  // login
  login() {
    console.log('Login')
    console.log(this.formulario)
    console.log(this.formulario.value)

    this.authenticationService.login(this.formulario.value.user, this.formulario.value.password)
           .pipe(first())
           .subscribe(
               data => {
                 // Navegar a la página solicitada
                 console.log('Credenciales correctas');
                 this.router.navigate([this.returnUrl]);
                 this.router.navigate(['/dashboard'])
               },
               error => {
                 //Si las credenciales no son válidas...
                 this.noValid = true;
                 console.log('Credenciales no válidas')
               });
  }


}
