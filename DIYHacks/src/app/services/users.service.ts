import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  variable = "Esto es el servicio Users";
  url = "http://localhost:4000";

  constructor(private http:HttpClient) {
  }

  getUsers() {
    return this.http.get(`${this.url}/users`);
  }

  getUser(id) {
    return this.http.get(`${this.url}/profile/${id}`);
  }
}
