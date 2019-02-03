import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post, Autor } from '../models/post.model';
// import { PostContent } from '../models/postcontent.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url = "http://localhost:4000";

  constructor(private http:HttpClient) { }

  getPosts():Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/posts/get`).pipe(
            map( (res:any) => {
              // console.log(res)
              if (res.ok)
                return res.posts.map( (post) => {
                  // let comments = res.posts.comments.map( (comment) => {
                  //
                  // } )
                  let autor:Autor = {username:"", profilepic:""};
                  autor.username = post.author;
                  return new Post( autor,post.title,
                                   post.media, post.text,
                                   post.likes, post.comments,
                                   post.date, post._id);
                } )
              return [];
            } )
          );
  }

  likePost(id:string, body) {
    return this.http.post(`${this.url}/like/${id}`, body)
  }

  uploadPost(p:Post) {
    return this.http.post(`${this.url}/post/add`, p);
  }

}
