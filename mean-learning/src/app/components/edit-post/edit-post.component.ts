import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post-model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  editPostForm: any;
  postData: any;
  visibilityOptions:any;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getPostId();
    this.visibilityOptions = [
      {
        label: 'Public',
        value: 'Public'
      },
      {
        label: 'Private',
        value: 'Private'
      }
    ]
  }

  getPostId() {
    this.route.params.subscribe((queryParams: any) => {
      if (queryParams.id.length != 0) {
        this.getPostsData(queryParams.id);
      }
    });
  }

  initializeForm() {
    this.editPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      visibility: ['', Validators.required],
    });
  }

  getPostsData(id: string) {
    this.postService.getPostById(id).subscribe((res: any) => {
      this.postData = res;
      this.editPostForm = this.formBuilder.group({
        title: [res.title, Validators.required],
        description: [res.desc, Validators.required],
        visibility: [res.visibility, Validators.required],
      });
    });
  }

  onSubmit() {
    if (this.editPostForm.valid) {
      var post: Post = {
        title: this.editPostForm.value.title,
        desc: this.editPostForm.value.description,
        visibility: this.editPostForm.value.visibility,
      };
      this.postService
        .updatePost(this.postData._id, post)
        .subscribe((res: any) => {
          if (res.status == 'SUCCESS') {
            this.router.navigate(['/list']);
          }
        });
    }
  }
}
