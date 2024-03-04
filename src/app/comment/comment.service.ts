import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentPayload } from '../post/view-post/comments.payload';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private httpClient: HttpClient) {}

  postComment(commentPayload: CommentPayload): Observable<any> {
    return this.httpClient.post<any>(
      'http://localhost:8080/api/comments/',
      commentPayload
    );
  }

  getAllCommentForPost(postId: number): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(
      'http://localhost:8080/api/comments/by-post/' + postId
    );
  }
}
