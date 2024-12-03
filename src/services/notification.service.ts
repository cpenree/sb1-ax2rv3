import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-messaging';

export class NotificationService {
  async requestPermission() {
    try {
      const messaging = firebase.messaging();
      const token = await messaging.requestPermission();
      return token;
    } catch (error) {
      throw new Error(`Failed to request notification permission: ${error.message}`);
    }
  }

  async sendEventNotification(userIds: string[], event: { title: string; startTime: Date }) {
    try {
      const messaging = firebase.messaging();
      await messaging.send({
        data: {
          type: 'event',
          eventTitle: event.title,
          eventTime: event.startTime.toISOString(),
        },
        notification: {
          title: 'New Gaming Event',
          body: `Join us for ${event.title}!`,
        },
        tokens: userIds,
      });
    } catch (error) {
      throw new Error(`Failed to send notification: ${error.message}`);
    }
  }
}

export const notificationService = new NotificationService();