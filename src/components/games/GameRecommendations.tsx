import * as React from 'react';
import { StyleSheet } from 'react-nativescript';
import { Game } from '../../types';
import { recommendationService } from '../../services/recommendation.service';

export function GameRecommendations({ preferences }) {
  const [recommendations, setRecommendations] = React.useState<Game[]>([]);

  React.useEffect(() => {
    loadRecommendations();
  }, [preferences]);

  const loadRecommendations = async () => {
    try {
      const games = await recommendationService.getRecommendations(preferences);
      setRecommendations(games);
    } catch (error) {
      console.error('Failed to load recommendations:', error);
    }
  };

  return (
    <stackLayout className="p-4">
      <label className="text-xl font-bold mb-4">Recommended Games</label>
      <scrollView orientation="horizontal">
        <flexboxLayout className="space-x-4">
          {recommendations.map((game) => (
            <stackLayout
              key={game.id}
              className="w-48 bg-white rounded-lg shadow-md"
            >
              <image
                src={game.coverUrl}
                className="w-full h-32 rounded-t-lg"
                stretch="aspectFill"
              />
              <stackLayout className="p-3">
                <label className="font-semibold">{game.name}</label>
                <label className="text-sm text-gray-500">
                  Rating: {game.rating.toFixed(1)}
                </label>
              </stackLayout>
            </stackLayout>
          ))}
        </flexboxLayout>
      </scrollView>
    </stackLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});