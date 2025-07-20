import React from 'react';
import { Trophy, Target, Zap, Rocket } from 'lucide-react';

interface GameStatsProps {
  matchedPairs: number;
  totalPairs: number;
  moves: number;
  gameComplete: boolean;
  level: number;
}

const GameStats: React.FC<GameStatsProps> = ({ matchedPairs, totalPairs, moves, gameComplete, level }) => {
  const progress = (matchedPairs / totalPairs) * 100;
  
  return (
    <div className="bg-gradient-to-br from-purple-900 to-blue-900 text-white rounded-2xl shadow-lg p-6 mb-6 border border-purple-400">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-yellow-300">🎭 Game Progress</h2>
        {gameComplete && (
          <div className="flex items-center gap-2 text-yellow-400">
            <Trophy size={24} />
            <span className="font-bold">Complete!</span>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-purple-200">Emotions Found</span>
            <span className="text-sm font-bold text-white">{matchedPairs} / {totalPairs}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Game completion: ${Math.round(progress)}%`}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex items-center gap-2 bg-blue-800 bg-opacity-50 rounded-lg p-3">
            <Target className="text-blue-300" size={20} />
            <div>
              <div className="text-xs text-purple-200">Level</div>
              <div className="font-bold text-white">{level}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-purple-800 bg-opacity-50 rounded-lg p-3">
            <Target className="text-purple-300" size={20} />
            <div>
              <div className="text-xs text-purple-200">Moves</div>
              <div className="font-bold text-white">{moves}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-yellow-800 bg-opacity-50 rounded-lg p-3">
            <Zap className="text-yellow-300" size={20} />
            <div>
              <div className="text-xs text-purple-200">Accuracy</div>
              <div className="font-bold text-white">
                {moves > 0 ? Math.round((matchedPairs / moves) * 100) : 0}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStats;