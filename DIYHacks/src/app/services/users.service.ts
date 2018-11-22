import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = "http://localhost:4000";

  constructor(private http:HttpClient) {
  }

  getUsers():Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`).pipe(
            map( res => {
              return res.map( (user) => {
                return new User( user.username,user.password,user.email, user._id,);
              } )
            } )
          );
  }

  getUser(id:any):Observable<User> {
    if (id == '') id = 'a';
    return this.http.get<User>(`${this.url}/profile/${id}`).pipe(
      map( user => {
        if(user[0])
          return new User(user[0].username,user[0].password,user[0].email, user[0]._id,);
        else
          return undefined;
      })
    );
  }

  addUser(user:User) {
    return this.http.post(`${this.url}/profile/add`, user);
  }

  updateUser(id, user:User) {
    return this.http.post(`${this.url}/profile/update/${id}`, user);
  }

  deleteUser(id){
    return this.http.get(`${this.url}/profile/delete/${id}`);
  }
}
