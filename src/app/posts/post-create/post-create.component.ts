import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Subscription } from 'rxjs';

function getPostNow() {
  this.postsService.getPost().subscribe((posts: Post[]) => {
    this.posts = posts;
  });
}

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
    getPostNow.call(this);
    this.postsSub = this.postsService.postsUpdated.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      },
    );
    this.form = new FormGroup({
      content: new FormControl(null, {
        validators: [Validators.minLength(1)],
      }),
    });
  }

  onSavePost() {
    console.log(this.form.value.content);
    console.log(this.form);
    if (this.form.value.content === '') {
      return;
    }
    getPostNow.call(this);
    // this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(this.form.value).subscribe(
        (post: any) => {
          this.post = post;
          this.posts.push(post);
          this.postsService.postsUpdated.next([...this.posts]);
        },
        (erreur) => console.log(erreur),
      );
    }
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
