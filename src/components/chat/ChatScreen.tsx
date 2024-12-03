import * as React from 'react';
import { StyleSheet } from 'react-nativescript';
import { Message, chatService } from '../../services/chat.service';
import { firebase } from '@nativescript/firebase-core';

export function ChatScreen({ route }) {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [newMessage, setNewMessage] = React.useState('');
  const { circleId } = route.params;

  React.useEffect(() => {
    const unsubscribe = chatService.subscribeToMessages(circleId, (updatedMessages) => {
      setMessages(updatedMessages);
    });
    return () => unsubscribe();
  }, [circleId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const currentUser = firebase.auth().currentUser;
      await chatService.sendMessage({
        circleId,
        userId: currentUser.uid,
        content: newMessage,
        type: 'text',
        timestamp: Date.now(),
      });
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <gridLayout rows="*, auto" className="bg-gray-100">
      <listView
        row="0"
        items={messages}
        className="p-4"
        itemTemplate={(message: Message) => (
          <stackLayout className="mb-2">
            <label className="text-sm text-gray-500">{message.userId}</label>
            <label className="p-2 bg-white rounded-lg">{message.content}</label>
          </stackLayout>
        )}
      />
      
      <gridLayout row="1" columns="*, auto" className="p-4 bg-white border-t border-gray-200">
        <textField
          col="0"
          className="p-2 rounded-lg bg-gray-100"
          hint="Type a message..."
          text={newMessage}
          onTextChange={(args) => setNewMessage(args.value)}
        />
        <button
          col="1"
          className="ml-2 p-2 rounded-lg bg-blue-500 text-white"
          text="Send"
          onTap={handleSendMessage}
        />
      </gridLayout>
    </gridLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});