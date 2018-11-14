import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(private userService:UsersService) {
    // this.userService.variable
  }

  ngOnInit() {
  }

}
