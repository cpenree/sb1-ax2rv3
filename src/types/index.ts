export interface User {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  gamingPreferences: string[];
  circles: string[];
}

export interface Circle {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  members: string[];
  games: Game[];
  events: Event[];
}

export interface Game {
  id: number;
  name: string;
  coverUrl: string;
  rating: number;
  platforms: string[];
}

export interface Event {
  id: string;
  circleId: string;
  title: string;
  description: string;
  gameId?: number;
  startTime: Date;
  participants: string[];
}