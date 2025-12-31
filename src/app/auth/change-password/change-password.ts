import { Component, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Theme } from '../../services/theme';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {
  form!: FormGroup;
  isDarkMode!:Signal<string>;
  constructor(private fb: FormBuilder, private auth: Auth, private modalService: NgbModal, private theme:Theme) {
    this.form = this.fb.group({
      currentPassword: [''],
      newPassword: [''],
      confirmPassword: [''],
    });
    this.isDarkMode =  this.theme.theme;
  }

  changePassword() {
    const { currentPassword, newPassword, confirmPassword } = this.form.value;
    const user = this.auth.getStoredUser();

    if (!user || user.password !== currentPassword) {
      alert('Current password is incorrect');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.auth.saveUser({ ...user, password: newPassword! });
    this.closeModal();
    alert('Password changed successfully');
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
