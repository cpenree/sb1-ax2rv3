import { gameService } from './game.service';
import { Game } from '../types';

export class RecommendationService {
  async getRecommendations(userPreferences: string[]): Promise<Game[]> {
    try {
      const recommendations: Game[] = [];
      
      for (const preference of userPreferences) {
        const games = await gameService.searchGames(preference);
        recommendations.push(...games.slice(0, 3));
      }

      return recommendations
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 10);
    } catch (error) {
      throw new Error(`Failed to get recommendations: ${error.message}`);
    }
  }

  async getCircleRecommendations(memberPreferences: string[][]): Promise<Game[]> {
    try {
      const commonPreferences = this.findCommonPreferences(memberPreferences);
      return this.getRecommendations(commonPreferences);
    } catch (error) {
      throw new Error(`Failed to get circle recommendations: ${error.message}`);
    }
  }

  private findCommonPreferences(preferences: string[][]): string[] {
    return preferences.reduce((common, current) => 
      common.filter(pref => current.includes(pref))
    );
  }
}

export const recommendationService = new RecommendationService();