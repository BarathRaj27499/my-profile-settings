import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
    this.form = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  login() {
    const { email, password } = this.form.value;

    if (this.auth.login(email!, password!)) {
      this.router.navigate(['/my-profile']);
    } else {
      alert('Invalid credentials');
    }
  }
}
