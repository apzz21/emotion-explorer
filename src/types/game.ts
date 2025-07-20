export interface GameCard {
  id: number;
  type: 'happy' | 'sad' | 'angry' | 'surprised' | 'excited' | 'calm' | 'scared' | 'love';
  imageUrl: string;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
  description: string;
}

export interface GameState {
  cards: GameCard[];
  flippedCards: number[];
  matchedPairs: number;
  moves: number;
  gameComplete: boolean;
  level: number;
}

export interface AudioSettings {
  // Keep for compatibility but not used in UI
}