import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';
import { CommentPayload } from './comments.payload';
import { CommentService } from 'src/app/comment/comment.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css'],
})
export class ViewPostComponent implements OnInit {
  postId!: number;
  post: PostModel = {} as PostModel;
  commentForm!: FormGroup;
  commentPayLoad: CommentPayload = {} as CommentPayload;
  comments: CommentPayload[] = [];

  constructor(
    private postService: PostService,
    private activateRoute: ActivatedRoute,
    private commentService: CommentService,
    private localStorage: LocalStorageService
  ) {
    this.postId = this.activateRoute.snapshot.params['id'];
    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required),
    });
    this.commentPayLoad = {
      text: '',
      postId: this.postId,
      username: this.getCurrentUsername(),
    };
  }

  ngOnInit() {
    this.getPostbyId();
    this.getCommentsForPost();
  }

  postComment() {
    this.commentPayLoad.text = this.commentForm.get('text')?.value;
    this.commentService.postComment(this.commentPayLoad).subscribe({
      next: () => {
        this.commentForm.get('text')?.setValue('');
        this.getCommentsForPost();
      },
      error: (error) => throwError(() => error),
    });
  }

  private getPostbyId() {
    this.postService.getPost(this.postId).subscribe({
      next: (data) => (this.post = data),
      error: (error) => throwError(() => error),
    });
  }

  private getCommentsForPost() {
    this.commentService.getAllCommentForPost(this.postId).subscribe({
      next: (data) => {
        this.comments = data;
        console.log(this.comments);
      },
      error: (error) => throwError(() => error),
    });
  }

  getCurrentUsername() {
    return this.localStorage.retrieve('username');
  }
}
