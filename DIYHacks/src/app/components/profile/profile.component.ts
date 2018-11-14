import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  constructor(private userService:UsersService) { }

  ngOnInit() {
  }

}
