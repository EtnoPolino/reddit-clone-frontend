import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from '../post-model';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css'],
})
export class PostTileComponent implements OnInit {
  faComments = faComments;

  @Input() posts!: PostModel[];

  constructor(private postService: PostService, private router: Router) {
    // this.postService.getAllPost().subscribe((post) => {
    //   this.posts$ = post;
    // });
  }

  ngOnInit(): void {}

  goToPost(id: number) {
    this.router.navigateByUrl('/view-post/' + id);
  }
}
