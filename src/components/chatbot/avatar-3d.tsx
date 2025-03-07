'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

type Props = {
  isActive: boolean;
  mood?: 'happy' | 'neutral' | 'thinking';
}

const Avatar3D = ({ isActive, mood = 'neutral' }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  
  // Simple animation loop for the 3D effect
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  // Draw the avatar face based on mood
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set up dimensions
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 5;
    
    // Draw face
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#3b82f6';
    ctx.fill();
    
    // Add 3D effect with gradient
    const gradient = ctx.createRadialGradient(
      centerX - radius / 3, 
      centerY - radius / 3, 
      0, 
      centerX, 
      centerY, 
      radius
    );
    gradient.addColorStop(0, '#60a5fa');
    gradient.addColorStop(1, '#2563eb');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw eyes
    const eyeRadius = radius / 8;
    const eyeOffsetX = radius / 3;
    const eyeOffsetY = radius / 5;
    
    // Left eye
    ctx.beginPath();
    ctx.arc(centerX - eyeOffsetX, centerY - eyeOffsetY, eyeRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    
    // Right eye
    ctx.beginPath();
    ctx.arc(centerX + eyeOffsetX, centerY - eyeOffsetY, eyeRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    
    // Draw pupils based on mood
    const pupilRadius = eyeRadius / 2;
    
    // Pupil positions vary based on mood
    let leftPupilX = centerX - eyeOffsetX;
    let rightPupilX = centerX + eyeOffsetX;
    let pupilY = centerY - eyeOffsetY;
    
    if (mood === 'thinking') {
      leftPupilX += eyeRadius / 2;
      rightPupilX += eyeRadius / 2;
      pupilY -= eyeRadius / 3;
    }
    
    // Left pupil
    ctx.beginPath();
    ctx.arc(leftPupilX, pupilY, pupilRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
    
    // Right pupil
    ctx.beginPath();
    ctx.arc(rightPupilX, pupilY, pupilRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
    
    // Draw mouth based on mood
    ctx.beginPath();
    
    if (mood === 'happy') {
      // Happy smile
      ctx.arc(centerX, centerY + eyeOffsetY, radius / 3, 0, Math.PI);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.stroke();
    } else if (mood === 'thinking') {
      // Thinking expression - straight line with slight angle
      ctx.moveTo(centerX - radius / 3, centerY + eyeOffsetY);
      ctx.lineTo(centerX + radius / 3, centerY + eyeOffsetY + eyeRadius);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.stroke();
    } else {
      // Neutral expression
      ctx.moveTo(centerX - radius / 3, centerY + eyeOffsetY);
      ctx.lineTo(centerX + radius / 3, centerY + eyeOffsetY);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.stroke();
    }
    
  }, [mood, rotation]);
  
  return (
    <motion.div 
      className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: isActive ? 1 : 0.8, 
        opacity: isActive ? 1 : 0.7,
        rotate: rotation / 2 // Subtle rotation for 3D effect
      }}
      transition={{ duration: 0.3 }}
    >
      <canvas 
        ref={canvasRef} 
        width={100} 
        height={100} 
        className="w-full h-full"
      />
    </motion.div>
  )
}

export default Avatar3D 