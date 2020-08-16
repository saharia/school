import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../shared/auth/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registrationForm: FormGroup;
  roles: [] = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.roles = this.route.snapshot.data.data.roles;
    this.registrationForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
    });
  }

  register() {
    if (this.registrationForm.invalid) {
      return;
    }
    this.authService.register(this.registrationForm.value).subscribe(
      result => {
        this.router.navigate(['/auth/login']);
        this.registrationForm.reset();
      },
      error => {

      }
    );
  }

}
