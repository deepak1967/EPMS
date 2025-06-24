import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(this.loginForm.value).subscribe((res: any) => {
        localStorage.setItem("token", res?.token)
        this.router.navigate(['dashboard']);
      })
      console.log('Login submitted:', email, password);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }


  // "email": "eve.holt@reqres.in"
  // "password": "cityslicka"


}
