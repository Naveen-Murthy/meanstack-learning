import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';

const routes: Routes = [
  { path: 'list', component: PostsListComponent },
  { path: '', redirectTo: 'list', pathMatch:'full' },
  { path: 'create', component: CreatePostComponent },
  { path: 'edit/:id', component: EditPostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
