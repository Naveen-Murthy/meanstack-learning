import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  uri:string = '';

  constructor(
    private http: HttpClient,
  ) {
    this.uri = environment.apiKey
  }

  getPosts(){
    var url = this.uri
    return this.http.get(url);
    //Or we can also write it as
    // return this.http.get(`${this.uri}/posts`)
  }

  getPostById(id:string){
    var url = this.uri+'/'+id
    return this.http.get(url);
  }

  addPost(body:any){
    var url = this.uri+'/add'
    return this.http.post(url,body)
  }

  updatePost(id:string,body:any){
    var url = this.uri+'/update/'+id
    return this.http.post(url,body)
  }

  deletePost(id:string){
    var url = this.uri+'/delete/'+id
    return this.http.get(url)
  }
}
