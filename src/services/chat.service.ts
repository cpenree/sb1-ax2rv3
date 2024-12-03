import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-database';

export interface Message {
  id: string;
  circleId: string;
  userId: string;
  content: string;
  timestamp: number;
  type: 'text' | 'image' | 'link';
}

export class ChatService {
  private db = firebase.database();

  async sendMessage(message: Omit<Message, 'id'>): Promise<string> {
    try {
      const newMessageRef = this.db
        .ref(`circles/${message.circleId}/messages`)
        .push();
      await newMessageRef.set({
        ...message,
        timestamp: Date.now(),
      });
      return newMessageRef.key;
    } catch (error) {
      throw new Error(`Failed to send message: ${error.message}`);
    }
  }

  subscribeToMessages(circleId: string, callback: (messages: Message[]) => void) {
    const messagesRef = this.db.ref(`circles/${circleId}/messages`);
    messagesRef.on('value', (snapshot) => {
      const messages = [];
      snapshot.forEach((child) => {
        messages.push({ id: child.key, ...child.val() });
      });
      callback(messages);
    });
    return () => messagesRef.off();
  }
}

export const chatService = new ChatService();