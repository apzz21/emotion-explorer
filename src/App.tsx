import React, { useState, useEffect, useCallback } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import GameCard from './components/GameCard';
import GameSettings from './components/GameSettings';
import GameStats from './components/GameStats';
import { GameState, AudioSettings } from './types/game';
import { generateCards, checkForMatch } from './utils/gameUtils';
import { useAudio } from './hooks/useAudio';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    cards: generateCards(1),
    flippedCards: [],
    matchedPairs: 0,
    moves: 0,
    gameComplete: false,
    level: 1
  });

  const [audioSettings, setAudioSettings] = useState<AudioSettings>({
    // Keep for compatibility but not used
  });

  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(-1);

  const { 
    playSuccessSound, 
    playMatchSound, 
    playFlipSound, 
    playErrorSound
  } = useAudio();

  const handleCardClick = useCallback((cardId: number) => {
    if (gameState.flippedCards.length >= 2) return;
    
    const card = gameState.cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    playFlipSound();

    const newFlippedCards = [...gameState.flippedCards, cardId];
    
    setGameState(prev => ({
      ...prev,
      cards: prev.cards.map(c => 
        c.id === cardId ? { ...c, isFlipped: true } : c
      ),
      flippedCards: newFlippedCards,
      moves: newFlippedCards.length === 1 ? prev.moves : prev.moves + 1
    }));

    // Check for match when two cards are flipped
    if (newFlippedCards.length === 2) {
      const isMatch = checkForMatch(gameState.cards, newFlippedCards);
      
      setTimeout(() => {
        if (isMatch) {
          // Match found
          playMatchSound();
          
          setGameState(prev => {
            const newMatchedPairs = prev.matchedPairs + 1;
            const totalPairs = Math.floor(prev.cards.length / 2);
            const isGameComplete = newMatchedPairs === totalPairs;
            
            if (isGameComplete) {
              setTimeout(() => playSuccessSound(), 500);
            }
            
            return {
              ...prev,
              cards: prev.cards.map(c => 
                newFlippedCards.includes(c.id) 
                  ? { ...c, isMatched: true, isFlipped: false }
                  : c
              ),
              flippedCards: [],
              matchedPairs: newMatchedPairs,
              gameComplete: isGameComplete
            };
          });
        } else {
          // No match
          playErrorSound();
          
          setGameState(prev => ({
            ...prev,
            cards: prev.cards.map(c => 
              newFlippedCards.includes(c.id) 
                ? { ...c, isFlipped: false }
                : c
            ),
            flippedCards: []
          }));
        }
      }, 1500);
    }
  }, [gameState.cards, gameState.flippedCards, playFlipSound, playMatchSound, playErrorSound, playSuccessSound]);

  const handleCardKeyDown = (e: React.KeyboardEvent, cardId: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(cardId);
    }
  };

  const handleNewGame = () => {
    const newCards = generateCards(gameState.level);
    setGameState({
      cards: newCards,
      flippedCards: [],
      matchedPairs: 0,
      moves: 0,
      gameComplete: false,
      level: gameState.level
    });
  };

  const handleLevelChange = (level: number) => {
    const newCards = generateCards(level);
    setGameState({
      cards: newCards,
      flippedCards: [],
      matchedPairs: 0,
      moves: 0,
      gameComplete: false,
      level
    });
  };

  const handleAudioSettingChange = (setting: keyof AudioSettings, value: boolean) => {
    setAudioSettings(prev => ({ ...prev, [setting]: value }));
  };

  const totalPairs = Math.floor(gameState.cards.length / 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Heart className="text-pink-300" size={32} />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Emotion Memory Game
            </h1>
            <Sparkles className="text-pink-300" size={32} />
          </div>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Welcome to the Emotion Memory Game! Find matching pairs to learn about different feelings and emotions. 
            Designed for children of all abilities to play, learn, and have fun together.
          </p>
        </header>

        {/* Game Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Settings and Stats */}
          <div className="lg:col-span-1">
            <GameSettings
              audioSettings={{}}
              onAudioSettingChange={() => {}}
              level={gameState.level}
              onLevelChange={handleLevelChange}
              onNewGame={handleNewGame}
            />
            
            <GameStats
              matchedPairs={gameState.matchedPairs}
              totalPairs={totalPairs}
              moves={gameState.moves}
              gameComplete={gameState.gameComplete}
              level={gameState.level}
            />
          </div>

          {/* Game Board */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-white to-pink-100 rounded-2xl shadow-xl p-6 border border-pink-300">
              <div className="mb-4 text-center">
                <h2 className="text-2xl font-bold text-purple-600 mb-2">
                  🎭 Find the Matching Emotions 🎭
                </h2>
                <p className="text-gray-700" id="game-instructions">
                  Click or press Enter on cards to reveal them. Find matching pairs of emotions!
                </p>
              </div>
              
              <div 
                className={`
                  grid gap-4 justify-items-center
                  ${gameState.cards.length <= 8 ? 'grid-cols-4' : 
                    gameState.cards.length <= 16 ? 'grid-cols-4' : 'grid-cols-6'}
                `}
                role="grid"
                aria-label="Memory game cards"
                aria-describedby="game-instructions"
              >
                {gameState.cards.map((card, index) => (
                  <GameCard
                    key={card.id}
                    card={card}
                    onClick={handleCardClick}
                    onKeyDown={handleCardKeyDown}
                    isSelected={selectedCardIndex === index}
                  />
                ))}
              </div>
              
              {gameState.gameComplete && (
                <div className="mt-6 text-center animate-bounceIn">
                  <div className="bg-gradient-to-r from-yellow-400 to-pink-400 rounded-2xl p-6 border-4 border-yellow-300">
                    <div className="text-4xl mb-2 animate-spin">🎉🎭💖</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Great Job!</h3>
                    <p className="text-white text-lg font-semibold">
                      Amazing work! You completed Level {gameState.level} in {gameState.moves} moves with {Math.round((gameState.matchedPairs / gameState.moves) * 100)}% accuracy!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer with Accessibility Information */}
        <footer className="mt-8 text-center text-white">
          <p className="mb-2">
            💙 Built with love for children of all abilities 💙
          </p>
          <div className="text-sm space-y-1">
            <p>🎹 Use keyboard navigation • 🔊 Sound effects • 👀 High contrast colors</p>
            <p>Screen reader compatible • Large buttons • Progressive difficulty levels</p>
          </div>
        </footer>
      </div>

    </div>
  );
}

export default App;