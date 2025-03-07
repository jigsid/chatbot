'use client'

import React, { useEffect, useState } from 'react'

type Props = {
  text: string;
  speed?: number;
  onComplete?: () => void;
  textColor?: string;
}

const TypingEffect = ({ text, speed = 30, onComplete, textColor = 'inherit' }: Props) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, isComplete, onComplete]);

  return (
    <span style={{ color: textColor }}>
      {displayedText}
      {currentIndex < text.length && (
        <span className="animate-pulse" style={{ color: textColor }}>|</span>
      )}
    </span>
  );
};

export default TypingEffect; 