import React from 'react';
import { GameCard as GameCardType } from '../types/game';

interface GameCardProps {
  card: GameCardType;
  onClick: (cardId: number) => void;
  onKeyDown: (e: React.KeyboardEvent, cardId: number) => void;
  isSelected: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ card, onClick, onKeyDown, isSelected }) => {
  return (
    <button
      className={`
        relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-2xl border-4 transition-all duration-500 transform
        focus:outline-none focus:ring-4 focus:ring-pink-400 focus:ring-opacity-75
        ${card.isFlipped || card.isMatched 
          ? 'bg-white border-pink-400 shadow-xl animate-pulse' 
          : 'bg-gradient-to-br from-purple-500 to-pink-500 border-gray-300 hover:border-pink-400 hover:shadow-lg hover:rotate-3'
        }
        ${isSelected ? 'ring-4 ring-blue-400 ring-opacity-75' : ''}
        ${card.isMatched ? 'scale-110 border-yellow-400 animate-bounce' : 'hover:scale-105'}
        disabled:cursor-not-allowed overflow-hidden
        active:scale-95
      `}
      onClick={() => onClick(card.id)}
      onKeyDown={(e) => onKeyDown(e, card.id)}
      disabled={card.isMatched || card.isFlipped}
      aria-label={
        card.isFlipped || card.isMatched 
          ? `${card.name}: ${card.description}`
          : "Hidden emotion card. Press Enter or Space to reveal."
      }
      aria-pressed={card.isFlipped}
      role="button"
      tabIndex={0}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {(card.isFlipped || card.isMatched) ? (
          <div className="w-full h-full relative animate-fadeIn">
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl">
              <div className="text-4xl md:text-5xl lg:text-6xl mb-1 animate-bounce">
                {card.emoji}
              </div>
              <div className="text-xs md:text-sm font-bold text-gray-700 text-center px-1">
                {card.name}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center animate-pulse">
            <div className="text-4xl md:text-5xl opacity-60">❓</div>
          </div>
        )}
      </div>
      
      {card.isMatched && (
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-spin">
          <span className="text-sm font-bold text-yellow-900">✨</span>
        </div>
      )}
      
      {card.isFlipped && !card.isMatched && (
        <div className="absolute inset-0 bg-pink-100 bg-opacity-30 rounded-xl border-2 border-pink-300 animate-pulse"></div>
      )}
    </button>
  );
};

export default GameCard;