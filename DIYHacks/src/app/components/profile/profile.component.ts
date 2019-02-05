import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { PostService } from '../../services/post.service';
import { User } from '../../models/user.model'
import { Post } from '../../models/post.model'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  image;
  currentUser:User;
  urlRegEx:RegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  posts:Post[];

  constructor(private userService:UsersService,
              private postService:PostService) { }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getUser(currentUser.id).subscribe( (u)=>{
      this.currentUser = u;
      console.log(this.currentUser)
    } )
    this.loadPosts();

  }

  changeListener($event) : void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  changePic() {
    if(this.image) {
      this.currentUser.profilepic = this.image;
      this.userService.updateUser(this.currentUser._id, this.currentUser).subscribe( (res) => {
        console.log(res);
        this.userService.getUser(this.currentUser._id).subscribe( (u)=>{
          this.currentUser = u;
          console.log(this.currentUser)
        } )
      } );
    } else {
      console.log("No hay foto seleccionada")
    }
  }

  changePassword() {
    let password = (<HTMLInputElement>document.getElementById('password')).value
    if(password) {
      this.currentUser.password = password;
      this.userService.updateUser(this.currentUser._id, this.currentUser).subscribe( (res)=> {
        console.log(res)
      })
    } else {
      console.log('No has introducido una contraseña');
    }
  }

  loadPosts() {
    this.postService.getPosts().subscribe((posts)=>{
      console.log('Posts Cargados');
      console.log(posts);
      // this.posts = posts;

      posts.reverse();
      posts = posts.filter( (x) => x.author.username == this.currentUser._id )

      posts.forEach( (p, i, arr) => {
        this.userService.getUser(p.author.username).subscribe( (x) => {
          arr[i].author.username = x.username;
          arr[i].author.profilepic = x.profilepic;
        } )
      } )

      this.posts = posts;
    })
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

}
