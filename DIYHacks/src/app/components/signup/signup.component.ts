import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [`

  `]
})
export class SignupComponent {

  formulario:FormGroup;

  constructor(private router:Router,
              private userService:UsersService) {

    this.formulario = new FormGroup ({
      'username': new FormControl('', [
                          Validators.required,
                          Validators.minLength(3)
                        ]/*, asyncvalid*/),
      'email':    new FormControl('',  [
                          Validators.required,
                          Validators.pattern('\\S{3,}@\\S{3,}\\.\\S{2,4}$')
                        ]/*, asyncvalid*/),
      'password':new FormControl('', [
                          Validators.required,
                          Validators.minLength(6)
                        ]/*, asyncvalid*/),
      'passrepeat':new FormControl(''/*, asyncvalid*/),
      'checkbox': new FormControl(false, Validators.requiredTrue)
    })
    // password repeat validator
    this.formulario.controls['passrepeat'].setValidators([
        Validators.required,
        Validators.minLength(6),
        this.distinctPasswords.bind( this.formulario )
    ]);
    // setting async validators
    this.formulario.controls['username'].setAsyncValidators(
      this.checkUsername.bind( this )
    );
    this.formulario.controls['email'].setAsyncValidators(
      this.checkEmail.bind( this )
    )
  }

  // Custom Validators
  distinctPasswords( control:FormControl ):{ [s:string]:boolean } {
    let form:any = this;
    if (control.value !== form.controls['password'].value ) {
      return { passwdistinct:true }
    }
    return null;
  }
  // Validaciones asíncronas
  checkUsername( control:FormControl ): Promise<any>|Observable<any> {
    let mainObj:any = this;
    let promesa = new Promise( (resolve, reject) => {
      setTimeout( () => {
        let currentUsername = mainObj.formulario.controls['username'].value;
        mainObj.userService.checkUser(currentUsername).subscribe( (res) => {
          if (res)
            resolve( { usertaken: true } )
          resolve( null );
        })
      }, 1000);
    })
    return promesa;
  }
  checkEmail( control:FormControl ): Promise<any>|Observable<any> {
    let mainObj:any = this;
    let promesa = new Promise( (resolve, reject) => {
      setTimeout( () => {
        let currentEmail = mainObj.formulario.controls['email'].value;
        mainObj.userService.checkEmail(currentEmail).subscribe( (res) => {
          if (res)
            resolve( { emailtaken: true } )
          resolve( null );
        })
      }, 1000);
    })
    return promesa;
  }

  // Subir el formulario
  submitForm( ) {
    console.log('Funcion submit');
    let user:User = new User(this.formulario.controls['username'].value,
                             this.formulario.controls['password'].value,
                             this.formulario.controls['email'].value)
    // Add user from service
    this.userService.addUser(user).subscribe( (res:any)=> {
      if (res.user) {
        console.log(res.user)
        this.router.navigate(['/login'])
      } else {
        console.log('something went wrong')
      }
    })
  }

}
