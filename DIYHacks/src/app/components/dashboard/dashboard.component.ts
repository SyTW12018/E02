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
    this.showUsers();
  }

  showUsers() {
    this.userService.getUsers().subscribe((users)=>{
      console.log("Usuarios cargados");
      this.usuarios = users;
    });
  }

  eliminar(id) {
    this.userService.deleteUser(id).subscribe(()=>{
      console.log("Usuario eliminado");
      this.showUsers();
    })
  }

  addUser(user, passw, email) {
    this.userService.addUser(user, passw, email).subscribe(()=>{
      console.log("Usuario añadido");
      this.showUsers();
    })
  }

}
