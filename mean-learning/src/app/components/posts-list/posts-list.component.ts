import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from 'src/app/models/accordian-model';
import { getPost, Post } from 'src/app/models/post-model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {

  postsList:getPost[] = [];
  // Single open mode for Accodian
  options: Config = { multi: false };

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
        if(res.status=="SUCCESS"){
          var postsRes=res.data || [];
          this.postsList = postsRes.map((item:any,index:number)=>{
            if(index==0){
              item['active'] = true;
            }else{
              item['active'] = false;
            }
            if(item.priority == 'high'){
              item['iconClass'] = 'priority_high'
            }else{
              item['iconClass'] = 'low_priority'
            }
            return item;
          })
        }
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
