import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Login submitted:', email, password);
      this.router.navigate(['dashboard']);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
