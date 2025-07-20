import { useRef, useEffect } from 'react';

export const useAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize audio context on user interaction
    const initAudioContext = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };

    document.addEventListener('click', initAudioContext, { once: true });
    document.addEventListener('keydown', initAudioContext, { once: true });

    return () => {
      document.removeEventListener('click', initAudioContext);
      document.removeEventListener('keydown', initAudioContext);
    };
  }, []);

  const playTone = (frequency: number, duration: number = 200, type: OscillatorType = 'sine') => {
    if (!audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration / 1000);

    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + duration / 1000);
  };

  const playSuccessSound = () => {
    playTone(523.25, 150); // C5
    setTimeout(() => playTone(659.25, 150), 100); // E5
    setTimeout(() => playTone(783.99, 300), 200); // G5
  };

  const playMatchSound = () => {
    playTone(440, 200); // A4
    setTimeout(() => playTone(554.37, 200), 150); // C#5
  };

  const playFlipSound = () => {
    playTone(330, 100); // E4
  };

  const playErrorSound = () => {
    playTone(220, 300, 'sawtooth'); // A3
  };

  return {
    playSuccessSound,
    playMatchSound,
    playFlipSound,
    playErrorSound
  };
};