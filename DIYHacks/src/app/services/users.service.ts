import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = "http://localhost:4000";

  constructor(private http:HttpClient) {
  }

  getUsers() {
    return this.http.get(`${this.url}/users`);
  }

  getUser(id) {
    return this.http.get(`${this.url}/profile/${id}`);
  }

  addUser(username, passw) {
    let user = {
      usuario: username,
      password: passw
    };
    return this.http.post(`${this.url}/profile/add`, user);
  }

  updateUser(id, username, passw) {
    let user = {
      usuario: username,
      password: passw
    };
    return this.http.post(`${this.url}/profile/update/${id}`, user);
  }

  deleteUser(id){
    return this.http.get(`${this.url}/profile/delete/${id}`);
  }
}
