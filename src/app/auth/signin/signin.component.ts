import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  message = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    this.authService.login(loginForm.value).subscribe(
      (reponse) => {
        localStorage.setItem('token', reponse.access_token);
        this.message = '';
        this.router.navigate(['']);
      },
      (erreur) => (this.message = 'Veuillez vérifier vos credantials'),
    );
  }

  onReset() {
/*    this.submitted = false;
    this.registerForm.reset();*/
    console.log('reset');
  }
}
