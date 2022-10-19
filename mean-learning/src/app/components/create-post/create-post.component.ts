import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post-model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {

  createPostForm:any;
  visibilityOptions:any;

  constructor(
    private formBuilder : FormBuilder,
    private postsService : PostsService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.visibilityOptions = [
      {
        label: 'High',
        value: 'high'
      },
      {
        label: 'Low',
        value: 'low'
      }
    ]
  }

  initializeForm(){
    this.createPostForm = this.formBuilder.group({
      title : ["", Validators.required],
      description : ["", Validators.required],
      visibility: ['', Validators.required],
    })
  }

  onSubmit(event : any) {
    if(this.createPostForm.valid){
      var post:Post = {
        title: this.createPostForm.value.title,
        desc: this.createPostForm.value.description,
        priority: this.createPostForm.value.visibility
      };
      this.postsService.addPost(post).subscribe(
        (res:any)=>{
          this.initializeForm();
          if(res.status=='SUCCESS'){
            this.router.navigate(['/list']);
          }
        }
      )
    }
  }
}
