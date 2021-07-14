import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const API_LINK = 'http://localhost:3000/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  posts: Post[] = [];
  public postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPost(): Observable<Post[]> {
    return this.http.get<Post[]>(API_LINK);
  }

  addPost(post: Post) {
    return this.http.post<Post[]>(API_LINK, post);
  }

  deletePost(id): Observable<any> {
    return this.http.delete(API_LINK + '/' + id);
  }
  /*  getPost() {
    this.http
      .get<{ posts: any }>('http://localhost:3000/post')
      .pipe(
        map((postData) => {
          console.log('postData: ', postData);
          console.log('postData: ', postData[0].content);
          console.log('postData: ', Object.keys(postData).length);
          return {
            posts: postData.posts.map((post) => {
              return {
                id: post.id,
                content: post.content,
              };
            }),
          };
        }),
      )
      .subscribe((transformedPostData) => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }*/

  getPostUpdateListener(): Observable<Post[]> {
    return this.postsUpdated.asObservable();
  }

  getPostNow() {
    this.getPost().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  /*  addPost(content: string) {
    const post: Post = { id: null, content: content };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }*/
}
