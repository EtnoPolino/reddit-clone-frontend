import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from './post-model';
import { CreatePostPayload } from '../post/create-post/create-post.payload';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private httpClient: HttpClient) {}

  getAllPost(): Observable<Array<PostModel>> {
    return this.httpClient.get<Array<PostModel>>(
      'http://localhost:8080/api/posts'
    );
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.httpClient.post<CreatePostPayload>(
      'http://localhost:8080/api/posts',
      postPayload
    );
  }

  getPost(id: number): Observable<PostModel> {
    return this.httpClient.get<PostModel>(
      'http://localhost:8080/api/posts/' + id
    );
  }

  getAllPostByUsers(name: string): Observable<PostModel[]> {
    return this.httpClient.get<PostModel[]>(
      'http://localhost:8080/api/posts/' + name
    );
  }
}
