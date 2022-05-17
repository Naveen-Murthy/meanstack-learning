import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post-model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {

  postsList:Post[] = [];

  constructor(
    private postService : PostsService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.getPostsData();
  }

  getPostsData(){
    this.postService.getPosts().subscribe(
      (res:any)=>{
        this.postsList=res || [];
      }
    )
  }

  createPost(){
    this.router.navigate(['/create']);
  }

  deletePost(post:any){
    console.log(post)
    this.postService.deletePost(post._id).subscribe(
      (res:any)=>{
        console.log(res);
        if(res.status=='SUCCESS'){
          this.getPostsData();
        }
      }
    )
  }

  editPost(post:any){
    this.router.navigate(['/edit/'+post._id]);
  }
}
