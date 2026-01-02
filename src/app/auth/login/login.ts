import { Component, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { Theme } from '../../services/theme';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form!: FormGroup;
  isDarkMode!:Signal<string>;

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router, private theme: Theme) {
    this.form = this.fb.group({
      email: [''],
      password: [''],
    });
    this.isDarkMode =  this.theme.theme;
  }

  login() {
    const { email, password } = this.form.value;

    if (this.auth.login(email!, password!)) {
      this.router.navigate(['/my-profile']);
    } else {
      this.form.setErrors({ invalidCredentials: true });
    }
  }
}
