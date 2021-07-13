import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getPost().subscribe((posts: Post[]) => {
      // console.log(posts);
      this.posts = posts;
    });
    this.postsSub = this.postsService.postsUpdated.subscribe((posts: Post[]) => {
      this.posts = posts;
    })
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
