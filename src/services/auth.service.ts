import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-auth';

export class AuthService {
  async signInWithEmail(email: string, password: string) {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(`Authentication failed: ${error.message}`);
    }
  }

  async signUp(email: string, password: string) {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(`Sign up failed: ${error.message}`);
    }
  }

  async signOut() {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      throw new Error(`Sign out failed: ${error.message}`);
    }
  }
}

export const authService = new AuthService();