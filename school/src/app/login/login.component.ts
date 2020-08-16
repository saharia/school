import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../shared/auth/authentication.service';
import { Router } from '@angular/router';
import { ACTION_LOGIN } from '../shared/store/actions/appActions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe((res:any) => {
      localStorage.setItem('token', res['token']);
      /* this.authService.updateState({
        action: ACTION_LOGIN,
        payload: res.user
      });
      this.router.navigate(['/home']);
      this.loginForm.reset(); */
      window.location.href = 'home';
    });
  }

}
