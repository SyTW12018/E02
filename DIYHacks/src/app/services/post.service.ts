import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { PostContent } from '../models/postcontent.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url = "http://localhost:4000";

  constructor(private http:HttpClient) { }

  getPosts():Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/posts/get`).pipe(
            map( (res:any) => {
              console.log(res)
              return res.posts.map( (post) => {
                let postcontent = new PostContent( post.content.images, post.content.video,
                                                   post.content.text, post.content._id )
                // let comments = res.posts.comments.map( (comment) => {
                //
                // } )
                return new Post( post.author,post.date,
                                 post.title, postcontent,
                                 post.likes.length, post.comments,
                                 post._id);
              } )
            } )
          );
  }

}
