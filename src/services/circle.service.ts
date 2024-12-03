import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-database';
import { Circle, Event } from '../types';

export class CircleService {
  private db = firebase.database();

  async createCircle(circle: Omit<Circle, 'id'>): Promise<string> {
    try {
      const newCircleRef = this.db.ref('circles').push();
      await newCircleRef.set(circle);
      return newCircleRef.key;
    } catch (error) {
      throw new Error(`Failed to create circle: ${error.message}`);
    }
  }

  async getCircle(circleId: string): Promise<Circle> {
    try {
      const snapshot = await this.db.ref(`circles/${circleId}`).once('value');
      return { id: circleId, ...snapshot.val() };
    } catch (error) {
      throw new Error(`Failed to fetch circle: ${error.message}`);
    }
  }

  async addMember(circleId: string, userId: string): Promise<void> {
    try {
      await this.db.ref(`circles/${circleId}/members`).update({ [userId]: true });
    } catch (error) {
      throw new Error(`Failed to add member: ${error.message}`);
    }
  }

  async createEvent(event: Omit<Event, 'id'>): Promise<string> {
    try {
      const newEventRef = this.db.ref(`circles/${event.circleId}/events`).push();
      await newEventRef.set(event);
      return newEventRef.key;
    } catch (error) {
      throw new Error(`Failed to create event: ${error.message}`);
    }
  }
}

export const circleService = new CircleService();