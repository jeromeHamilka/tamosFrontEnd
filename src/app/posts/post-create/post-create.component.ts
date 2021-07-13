import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  post: Post;
  form: FormGroup;
  private postsSub: Subscription;
  private mode = 'create';
  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute,
    private router: Router,
    private _ngZone: NgZone,
  ) {}

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  ngOnInit(): void {
    this.postsService.getPost().subscribe((posts: Post[]) => {
      console.log(posts);
      this.posts = posts;
    });
    this.postsSub = this.postsService.postsUpdated.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      },
    );
    this.form = new FormGroup({
      content: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
    });
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    // this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(this.form.value).subscribe(
        (post: any) => {
          console.log(post);
          this.post = post;
          this.posts.push(post);
          console.log(this.posts);
          this.postsService.postsUpdated.next([...this.posts]);
        },
        (erreur) => console.log(erreur),
      );
    } /*else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.content,
      );
    }*/
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
