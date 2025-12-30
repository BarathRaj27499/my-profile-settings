import { Component, effect, signal } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Profile } from '../../services/profile';
import { ProfileDetails } from '../../models/profile-details';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfilePicUpdate } from '../../shared/profile-pic-update/profile-pic-update';
import { TranslatePipe } from '@ngx-translate/core';
import { FeatureFlag } from '../../services/feature-flag';

@Component({
  selector: 'app-my-profile',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './my-profile.html',
  styleUrl: './my-profile.css',
})
export class MyProfile {
  imagePreview = signal<string | null>(null);
  form!: FormGroup;
  fullName!:string;

  constructor(private fb: FormBuilder, private profileService: Profile, public modalService: NgbModal, public flagsService: FeatureFlag) {
    this.initForm();
    this.syncFormWithProfile();
  }

  private initForm(): void {
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [{ value: '', disabled: true }],
      permanentAddress: [''],
      temporaryAddress: [''],
      avatar: ['']
    });
  }

  private syncFormWithProfile(): void {
    effect(() => {
      debugger
      const profile = this.profileService.profile();
      this.form.patchValue(profile, { emitEvent: false });
      this.imagePreview.set(profile.avatar);
    });
  }

  async onBlur(field: keyof ProfileDetails): Promise<void> {
    debugger;
    const control = this.form.get(field);
    if (!control) return;

    const currentValue = control.value;
    const originalValue = this.profileService.profile()[field];

    if (currentValue !== originalValue) {
      await this.profileService.updateProfile({
        [field]: currentValue,
      });

      alert('Successfully changed');
    }
  }

  removePic() {
    this.imagePreview.set(null);
    this.form.patchValue({ avatar: null });
    this.profileService.updateProfilePic('');
  }

  openUpdateModal() {
    const modalRef = this.modalService.open(ProfilePicUpdate, {
      centered: true,
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.photoSelected.subscribe((photo: string) => {
      modalRef.close();
      this.imagePreview.set(photo);
      this.form.patchValue({ avatar: photo });
      this.profileService.updateProfilePic(photo);
    });
  }
}
