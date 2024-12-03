import * as React from 'react';
import { StyleSheet } from 'react-nativescript';
import { Circle, Event } from '../../types';
import { circleService } from '../../services/circle.service';

export function CircleScreen({ route, navigation }) {
  const [circle, setCircle] = React.useState<Circle>(null);
  const [events, setEvents] = React.useState<Event[]>([]);

  React.useEffect(() => {
    loadCircleData();
  }, []);

  const loadCircleData = async () => {
    try {
      const circleData = await circleService.getCircle(route.params.circleId);
      setCircle(circleData);
    } catch (error) {
      console.error('Failed to load circle:', error);
    }
  };

  return (
    <scrollView className="bg-gray-100">
      {circle && (
        <flexboxLayout style={styles.container}>
          <label className="text-2xl font-bold mb-4">{circle.name}</label>
          <label className="text-gray-600 mb-6">{circle.description}</label>

          <label className="text-xl font-semibold mb-4">Upcoming Events</label>
          <listView
            items={events}
            className="w-full"
            itemTemplate={(event: Event) => (
              <gridLayout columns="*, auto" className="p-4 bg-white rounded-lg mb-2">
                <label col="0" className="font-medium">{event.title}</label>
                <label col="1" className="text-gray-500">
                  {new Date(event.startTime).toLocaleDateString()}
                </label>
              </gridLayout>
            )}
          />

          <button
            className="btn mt-4 p-4 rounded-lg bg-blue-500 text-white"
            onTap={() => navigation.navigate('CreateEvent', { circleId: circle.id })}
          >
            Create Event
          </button>
        </flexboxLayout>
      )}
    </scrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'column'
  }
});