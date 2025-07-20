import React from 'react';
import { AudioSettings } from '../types/game';

interface GameSettingsProps {
  audioSettings: AudioSettings;
  onAudioSettingChange: (setting: keyof AudioSettings, value: boolean) => void;
  level: number;
  onLevelChange: (level: number) => void;
  onNewGame: () => void;
}

const GameSettings: React.FC<GameSettingsProps> = ({
  level,
  onLevelChange,
  onNewGame
}) => {
  const maxLevel = 6; // Maximum 6 levels
  const pairCount = Math.min(2 + (level * 2), 12);
  const cardCount = pairCount * 2;

  return (
    <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-2xl shadow-lg p-6 mb-6 border border-pink-400 animate-slideInLeft">
      <h2 className="text-xl font-bold text-center mb-4 text-yellow-300 animate-bounce">🎭 Emotion Explorer 🎭</h2>
      
      <div className="space-y-4">
        {/* Level Settings */}
        <div>
          <h3 className="text-lg font-semibold text-pink-200 mb-2">Choose Your Level</h3>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: maxLevel }, (_, i) => i + 1).map((levelNum) => (
              <button
                key={levelNum}
                onClick={() => onLevelChange(levelNum)}
                className={`
                  px-4 py-3 rounded-xl border-2 transition-all duration-300 font-bold text-center transform
                  ${level === levelNum 
                    ? 'bg-yellow-500 border-yellow-400 text-black scale-110 animate-pulse' 
                    : 'bg-gray-700 border-gray-500 text-gray-300 hover:border-gray-400 hover:scale-105'
                  }
                  focus:outline-none focus:ring-4 focus:ring-yellow-400
                  active:scale-95
                `}
                aria-pressed={level === levelNum}
                aria-label={`Set level to ${levelNum}`}
              >
                Level {levelNum}
              </button>
            ))}
          </div>
          <p className="text-sm text-pink-200 mt-2 text-center animate-fadeIn">
            Level {level}: {cardCount} cards ({pairCount} pairs)
          </p>
        </div>

        {/* New Game Button */}
        <button
          onClick={onNewGame}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 px-6 rounded-xl 
                   hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg
                   focus:outline-none focus:ring-4 focus:ring-yellow-400 active:scale-95 animate-pulse"
          aria-label="Start a new emotion matching game"
        >
          🎭 New Emotion Game
        </button>
      </div>
    </div>
  );
};

export default GameSettings;