import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service'
import { User } from '../../models/user.model'

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
      console.log(users);
      this.usuarios = users;
    });
  }

  eliminar(id) {
    this.userService.deleteUser(id).subscribe(()=>{
      console.log("Usuario eliminado");
      this.showUsers();
    })
  }

  addUser(name, passw, email) {
    let user = new User(name, passw, email)
    this.userService.addUser(user).subscribe(()=>{
      console.log("Usuario añadido");
      this.showUsers();
    })
  }

}
