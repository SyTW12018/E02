import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    .btn-button {
    background-color: #48924A;
    color: #FFFFFF;
    min-width: 150px;
  }
  .btn-face {
  background-color: #3B5998;
  color: #FFFFFF;
  }
  `]
})
export class LoginComponent implements OnInit {

  constructor(private userService:UsersService) { }

  ngOnInit() {
  }

}
