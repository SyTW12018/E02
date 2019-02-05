import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styles: []
})

export class CreatepostComponent implements OnInit {

  video:boolean = true;
  form:FormGroup;
  post:Post;
  image:any;

  constructor(private postService:PostService,
              private router: Router) {

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));


    this.form = new FormGroup ({
      'author': new FormControl(currentUser.id),
      'title': new FormControl('', [
                                  Validators.required
                                ]),
      'text': new FormControl('', Validators.required)
    })

  }

  ngOnInit() {
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

  subir() {
    let videolink = (<HTMLInputElement>document.getElementById('videolink')).value;
    let media = this.image ? this.image : videolink;
    console.log(media)
      this.post = new Post(this.form.value.author,
                           this.form.value.title, media,
                           this.form.value.text )
      console.log(this.post);

    this.postService.uploadPost(this.post).subscribe( (res)=>{
      console.log(res);
      this.router.navigate(['/dashboard'])
    } )
  }

}
