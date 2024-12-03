import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-database';
import { User } from '../types';

export class ProfileService {
  private db = firebase.database();

  async createProfile(userId: string, profile: Omit<User, 'id'>): Promise<void> {
    try {
      await this.db.ref(`users/${userId}`).set(profile);
    } catch (error) {
      throw new Error(`Failed to create profile: ${error.message}`);
    }
  }

  async getProfile(userId: string): Promise<User> {
    try {
      const snapshot = await this.db.ref(`users/${userId}`).once('value');
      return { id: userId, ...snapshot.val() };
    } catch (error) {
      throw new Error(`Failed to fetch profile: ${error.message}`);
    }
  }

  async updateProfile(userId: string, updates: Partial<User>): Promise<void> {
    try {
      await this.db.ref(`users/${userId}`).update(updates);
    } catch (error) {
      throw new Error(`Failed to update profile: ${error.message}`);
    }
  }
}

export const profileService = new ProfileService();