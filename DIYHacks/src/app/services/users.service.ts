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
                let foll:string[] = user.following.map( (x) => x )
                return new User( user.username,user.password,user.email, foll, user.profilepic, user._id,);
              } )
            } )
          );
  }
  getUser(id:string):Observable<User> {
    return this.http.get<User>(`${this.url}/protected/profile/${id}`).pipe(
      map( (res:any) => {
        if (!res.ok)
          return null;
        let foll:string[] = res.usuario.following.map( (x) => x )
        return new User( res.usuario.username,
                         res.usuario.password,
                         res.usuario.email,
                         foll, res.usuario.profilepic,
                         res.usuario._id )
      })
    )
  }

  getUserName(id:string):Observable<string> {
    return this.http.get<string>(`${this.url}/protected/profile/${id}`).pipe(
      map( (res:any) => {
        if (!res.ok)
          return "";
        return res.usuario.username;
      })
    )
  }

  checkUser(id:string):Observable<boolean> {
    if (id == '') id = 'a';
    return this.http.get<User>(`${this.url}/profile/${id}`).pipe(
      map( (user:any) => {
        return user.ok;
      })
    );
  }

  checkEmail(id:string):Observable<boolean> {
    if (id == '') id = 'a';
    return this.http.get<User>(`${this.url}/email/${id}`).pipe(
      map( (user:any) => {
        return user.ok;
      })
    );
  }

  addUser(user:User) {
    return this.http.post(`${this.url}/profile/add`, user);
  }

  updateUser(id, user:User) {
    return this.http.post(`${this.url}/protected/profile/update/${id}`, user);
  }

  deleteUser(id){
    return this.http.get(`${this.url}/protected/profile/delete/${id}`);
  }
}
