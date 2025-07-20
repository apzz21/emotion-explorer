import { GameCard } from '../types/game';

const emotionCards = [
  {
    type: 'happy' as const,
    name: 'Happy',
    emoji: '😊',
    description: 'A joyful, smiling face showing happiness'
  },
  {
    type: 'sad' as const,
    name: 'Sad',
    emoji: '😢',
    description: 'A person looking sad with tears'
  },
  {
    type: 'angry' as const,
    name: 'Angry',
    emoji: '😠',
    description: 'An angry expression with furrowed brows'
  },
  {
    type: 'surprised' as const,
    name: 'Surprised',
    emoji: '😲',
    description: 'A surprised face with wide eyes'
  },
  {
    type: 'excited' as const,
    name: 'Excited',
    emoji: '🤩',
    description: 'An excited, energetic expression'
  },
  {
    type: 'calm' as const,
    name: 'Calm',
    emoji: '😌',
    description: 'A peaceful, relaxed expression'
  },
  {
    type: 'scared' as const,
    name: 'Scared',
    emoji: '😨',
    description: 'A frightened expression showing fear'
  },
  {
    type: 'love' as const,
    name: 'Love',
    emoji: '🥰',
    description: 'A loving, affectionate expression'
  },
  {
    type: 'confused' as const,
    name: 'Confused',
    emoji: '😕',
    description: 'A confused, puzzled expression'
  },
  {
    type: 'proud' as const,
    name: 'Proud',
    emoji: '😎',
    description: 'A proud, confident expression'
  },
  {
    type: 'sleepy' as const,
    name: 'Sleepy',
    emoji: '😴',
    description: 'A tired, sleepy expression'
  },
  {
    type: 'laughing' as const,
    name: 'Laughing',
    emoji: '😂',
    description: 'A person laughing with joy'
  },
  {
    type: 'thinking' as const,
    name: 'Thinking',
    emoji: '🤔',
    description: 'A thoughtful, contemplative expression'
  },
  {
    type: 'silly' as const,
    name: 'Silly',
    emoji: '🤪',
    description: 'A silly, playful expression'
  },
  {
    type: 'worried' as const,
    name: 'Worried',
    emoji: '😟',
    description: 'A worried, concerned expression'
  },
  {
    type: 'cool' as const,
    name: 'Cool',
    emoji: '😎',
    description: 'A cool, confident expression'
  }
];

export const generateCards = (level: number): GameCard[] => {
  // Progressive difficulty: Level 1 = 4 pairs, Level 2 = 6 pairs, etc.
  const pairCount = Math.min(2 + (level * 2), 12); // Max 12 pairs (24 cards)
  const cards: GameCard[] = [];
  let id = 0;
  
  // Shuffle the emotion cards to get random selection
  const shuffledEmotionCards = shuffleArray([...emotionCards]);
  
  // Generate pairs of cards
  for (let i = 0; i < pairCount; i++) {
    const cardData = shuffledEmotionCards[i % shuffledEmotionCards.length];
    
    // Create two matching cards
    for (let j = 0; j < 2; j++) {
      cards.push({
        id: id++,
        type: cardData.type,
        imageUrl: '', // Not used anymore
        name: cardData.name,
        emoji: cardData.emoji,
        isFlipped: false,
        isMatched: false,
        description: cardData.description
      });
    }
  }
  
  // Shuffle the cards
  return shuffleArray(cards);
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const checkForMatch = (cards: GameCard[], cardIds: number[]): boolean => {
  if (cardIds.length !== 2) return false;
  
  const [card1, card2] = cardIds.map(id => cards.find(card => card.id === id));
  return card1 && card2 && card1.name === card2.name;
};