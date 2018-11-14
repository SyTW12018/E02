import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  usuarios;

  constructor(private userService:UsersService) {
    // this.userService.variable
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((users)=>{
      console.log("Usuarios cargados");
      this.usuarios = users;
    })
  }

}
