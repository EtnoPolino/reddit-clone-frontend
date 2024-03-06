import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { CommentService } from 'src/app/comment/comment.service';
import { CommentPayload } from 'src/app/post/view-post/comments.payload';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  name!: string;
  postLength!: number;
  commentLength!: number;
  posts!: PostModel[];
  comments!: CommentPayload[];

  constructor(
    private activeRoute: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService
  ) {
    this.name = this.activeRoute.snapshot.params['name'];

    this.postService.getAllPostByUsers(this.name).subscribe({
      next: (data) => {
        this.posts = data;
        this.postLength = data.length;
      },
      error: (error) => throwError(() => error),
    });

    this.commentService.getAllCommentsByUsers(this.name).subscribe({
      next: (data) => {
        this.comments = data;
        this.commentLength = data.length;
      },
      error: (error) => throwError(() => error),
    });
  }

  ngOnInit(): void {}
}
