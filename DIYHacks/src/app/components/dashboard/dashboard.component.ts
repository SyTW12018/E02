import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service'
import { User } from '../../models/user.model'
import { PostService } from '../../services/post.service'
import { Post } from '../../models/post.model'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  urlRegEx:RegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

  logged = true;
  // usuarios:User[];
  posts:Post[];

  constructor(private userService:UsersService,
              private postService:PostService) {
    // this.userService.variable
  }

  ngOnInit() {
    // this.showUsers();
    this.loadPosts();
    this.userService.getUserName("5bed534b9acffb121a6fc467").subscribe( (x)=>console.log(x) )
  }
  //
  // getUsername(id:string):any {
  //   return new Promise( (resolve, reject) => {
  //     this.userService.getUser(id).subscribe( (user)=>{
  //       if(!user) {
  //         reject('NotFound')
  //       }
  //       resolve(user.username);
  //     } )
  //   } )
  // }

  loadPosts() {
    this.postService.getPosts().subscribe((posts)=>{
      console.log('Posts Cargados');
      console.log(posts);
      this.posts = posts;

      this.posts.reverse();

      this.posts.forEach( (p, i, arr) => {
        this.userService.getUser(p.author.username).subscribe( (x) => {
          arr[i].author.username = x.username;
          arr[i].author.profilepic = x.profilepic;
        } )
      } )
    })
    // this.getUsername("5bed534b9acffb121a6fc467").then( (a) => {
      // console.log(a)
    // } );

  }

  likePost(idx:number) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser.id, "le ha dado like al post")
    let body = { author: currentUser.id };
    this.postService.likePost((<string>this.posts[idx]._id), body).subscribe( (res)=> {
      console.log(res)
      if(!this.posts[idx].likes.includes(currentUser.id)) {
        console.log('No le habia dado like')
        this.posts[idx].likes.push(currentUser.id)
      } else {
        this.posts[idx].likes = this.posts[idx].likes.filter( (x) => x != currentUser.id )
        console.log('sí le habia dado like')
      }
    } )
  }

  isliked(idx:number):boolean {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.posts[idx].likes.includes(currentUser.id);
  }
  //
  // showUsers() {
  //   this.userService.getUsers().subscribe((users)=>{
  //     console.log("Usuarios cargados");
  //     console.log(users);
  //     this.usuarios = users;
  //   });
  // }
  //
  // eliminar(id) {
  //   this.userService.deleteUser(id).subscribe(()=>{
  //     console.log("Usuario eliminado");
  //     this.showUsers();
  //   })
  // }
  //
  // // actualizar(id, currentName, name, passw, email) {
  // //   this.userService.getUser(currentName).subscribe( (us)=> {
  // //     us.updateUser( { name, passw, email } );
  // //     this.userService.updateUser(id, user);
  // //   });
  // // }
  //
  // addUser(name, passw, email) {
  //   let user = new User(name, passw, email)
  //   this.userService.addUser(user).subscribe(()=>{
  //     console.log("Usuario añadido");
  //     this.showUsers();
  //   })
  // }

}
