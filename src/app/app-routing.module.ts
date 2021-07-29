import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { SigninComponent } from './auth/signin/signin.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: '', component: PostCreateComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: SigninComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
