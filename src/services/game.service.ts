import axios from 'axios';

const RAWG_API_KEY = 'YOUR_RAWG_API_KEY';
const BASE_URL = 'https://api.rawg.io/api';

export class GameService {
  async searchGames(query: string) {
    try {
      const response = await axios.get(`${BASE_URL}/games`, {
        params: {
          key: RAWG_API_KEY,
          search: query
        }
      });
      return response.data.results;
    } catch (error) {
      throw new Error(`Game search failed: ${error.message}`);
    }
  }

  async getGameDetails(gameId: number) {
    try {
      const response = await axios.get(`${BASE_URL}/games/${gameId}`, {
        params: {
          key: RAWG_API_KEY
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch game details: ${error.message}`);
    }
  }
}

export const gameService = new GameService();