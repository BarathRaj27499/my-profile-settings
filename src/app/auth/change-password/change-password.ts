import { Component, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Theme } from '../../services/theme';
import { TranslatePipe } from '@ngx-translate/core';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {
  form!: FormGroup;
  isDarkMode!:Signal<string>;
  constructor(private fb: FormBuilder, private toastService: ToastService, private auth: Auth, private modalService: NgbModal, private theme:Theme) {
    this.form = this.fb.group({
      currentPassword: [''],
      newPassword: ['',[Validators.required]],
      confirmPassword: [''],
    });
    this.isDarkMode =  this.theme.theme;
  }

  changePassword() {
    const { currentPassword, newPassword, confirmPassword } = this.form.value;
    const user = this.auth.getStoredUser();

    if (!user || user.password !== currentPassword) {
      this.form.setErrors({ passwordIncorrrect: true });
      return;
    }

    if (newPassword !== confirmPassword) {
      this.form.setErrors({ passwordMismatch: true });
      return;
    }
    this.auth.saveUser({ ...user, password: newPassword! });
    this.closeModal();
    this.toastService.show('Password changed successfully!');
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
