import * as React from 'react';
import { StyleSheet } from 'react-nativescript';
import { circleService } from '../../services/circle.service';
import { notificationService } from '../../services/notification.service';
import { format } from 'date-fns';

export function CreateEventScreen({ route, navigation }) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const { circleId } = route.params;

  const handleCreateEvent = async () => {
    try {
      const event = {
        circleId,
        title,
        description,
        startTime: date,
        participants: [],
      };

      const eventId = await circleService.createEvent(event);
      const circle = await circleService.getCircle(circleId);
      
      // Send notifications to circle members
      await notificationService.sendEventNotification(
        circle.members,
        { title, startTime: date }
      );

      navigation.goBack();
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  return (
    <scrollView className="bg-gray-100">
      <stackLayout className="p-4">
        <label className="text-lg font-semibold mb-2">Event Title</label>
        <textField
          className="p-4 mb-4 bg-white rounded-lg"
          hint="Enter event title"
          text={title}
          onTextChange={(args) => setTitle(args.value)}
        />

        <label className="text-lg font-semibold mb-2">Description</label>
        <textView
          className="p-4 mb-4 bg-white rounded-lg h-32"
          hint="Enter event description"
          text={description}
          onTextChange={(args) => setDescription(args.value)}
        />

        <label className="text-lg font-semibold mb-2">Date & Time</label>
        <datePicker
          className="mb-4"
          date={date}
          onDateChange={(args) => setDate(args.value)}
        />

        <button
          className="p-4 rounded-lg bg-blue-500 text-white"
          text="Create Event"
          onTap={handleCreateEvent}
        />
      </stackLayout>
    </scrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});