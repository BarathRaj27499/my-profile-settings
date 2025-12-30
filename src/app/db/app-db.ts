import Dexie, { Table } from 'dexie';
import { ProfileDetails } from '../models/profile-details';

export class AppDB extends Dexie {
  profile!: Table<ProfileDetails, number>;

  constructor() {
    super('SettingsDB');
    this.version(1).stores({
      profile: 'id',
    });
  }
}

export const db = new AppDB();
