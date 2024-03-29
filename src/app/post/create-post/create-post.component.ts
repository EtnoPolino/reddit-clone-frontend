import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubredditModel } from 'src/app/subreddit/subreddit-response';
import { CreatePostPayload } from './create-post.payload';
import { PostService } from 'src/app/shared/post.service';
import { Router } from '@angular/router';
import { SubredditService } from 'src/app/subreddit/subreddit.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  createPostForm!: FormGroup;
  subreddits: Array<SubredditModel> = [];
  postPayload!: CreatePostPayload;

  constructor(
    private router: Router,
    private postService: PostService,
    private subredditService: SubredditService
  ) {
    this.postPayload = {
      postName: '',
      url: '',
      description: '',
      subredditName: '',
    };
  }

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
    });
    this.subredditService.getAllSubreddit().subscribe({
      next: (subreddit) => {
        this.subreddits = subreddit;
      },
      error: (error) => {
        throwError(() => error);
      },
    });
  }

  createPost() {
    this.postPayload.postName = this.createPostForm.get('postName')?.value;
    this.postPayload.url = this.createPostForm.get('url')?.value;
    this.postPayload.description =
      this.createPostForm.get('description')?.value;
    this.postPayload.subredditName =
      this.createPostForm.get('subredditName')?.value;

    this.postService.createPost(this.postPayload).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        throwError(() => error);
      },
    });
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }
}
