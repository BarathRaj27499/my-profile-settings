import { Injectable, signal } from '@angular/core';
import { ProfileDetails } from '../models/profile-details';
import { db } from '../db/app-db';

@Injectable({
  providedIn: 'root',
})
export class Profile {
  defaultProfile: ProfileDetails = {
    id: 1,
    firstName: 'Rakesh',
    lastName: 'Singh',
    email: 'rakehs.singh@example.com',
    permanentAddress: 'No. 12, Anna Nagar West, Chennai, Tamil Nadu - 600040',
    temporaryAddress: 'No. 45, T. Nagar, Chennai, Tamil Nadu - 600017',
    avatar: '',
  };

  private readonly _profile = signal<any>('');

  readonly profile = this._profile.asReadonly();

  constructor() {
    this.loadProfile();
  }

  async updateProfile(partial: Partial<ProfileDetails>): Promise<void> {
    const updated = { ...this._profile(), ...partial };

    await db.profile.put(updated);
    this._profile.set(updated);
  }

  async updateProfilePic(base64: string): Promise<void> {
    debugger
    await this.updateProfile({ avatar: base64 });
  }

  async resetProfile(): Promise<void> {
    await db.profile.clear();
    this._profile.set(this.defaultProfile);
  }

  private async loadProfile(): Promise<void> {
    const stored = await db.profile.get(1);
    if (stored?.email && stored.email.trim().length > 0) {
      this._profile.set(stored);
    } else {
      await db.profile.put(this.defaultProfile);
      this._profile.set(this.defaultProfile);
    }
  }
}
