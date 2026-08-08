import React from 'react';
import { Theme } from '../types';

interface CinematicBackgroundProps {
  theme: Theme;
  mousePos: { x: number; y: number };
}

export const CinematicBackground: React.FC<CinematicBackgroundProps> = ({ theme, mousePos }) => {
  // Calculate subtle shift for parallax effect
  const shiftX = mousePos.x * 12;
  const shiftY = mousePos.y * 8;

  return (
    <div
      id="cinematic-background-root"
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0"
    >
      {/* Base Atmospheric Color Gradient Layer */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-[#2C1810] via-[#3A2416] to-[#1A0E0A]'
            : 'bg-gradient-to-br from-[#FAF6F0] via-[#F7F2EC] to-[#E8DCCE]'
        }`}
      />

      {/* High-Resolution Full-Page Background Image (use assets/coffee-bg.jpg) */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out"
        style={{
          backgroundImage: `url('/assets/coffee-bg.jpg')`,
          transform: `translate3d(${shiftX}px, ${shiftY}px, 0) scale(1.02)`,
          filter: theme === 'dark' ? 'brightness(0.45) contrast(1.05)' : 'brightness(0.85) contrast(1)'
        }}
      />

      {/* Morning Sun Rays overlay entering from top right */}
      <div
        className="absolute top-0 right-0 w-[70vw] h-[80vh] pointer-events-none opacity-60 transition-transform duration-500 ease-out"
        style={{
          background: 'radial-gradient(ellipse at 80% 0%, rgba(255, 220, 168, 0.35) 0%, rgba(197, 139, 68, 0.15) 45%, rgba(0, 0, 0, 0) 75%)',
          transform: `translate3d(${shiftX * 0.5}px, ${shiftY * 0.5}px, 0)`,
        }}
      />

      {/* Right-side decorative image removed per user request */}

      {/* Steam Ambient Layer */}
      <div className="absolute right-[10%] bottom-[30%] w-96 h-96 bg-radial from-white/10 via-[#D8B58A]/5 to-transparent rounded-full filter blur-3xl animate-pulse-glow" />

      {/* Vignette Overlay for Luxury Cinematic Framing */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          theme === 'dark'
            ? 'bg-radial from-transparent via-[#2C1810]/40 to-[#100805]/90'
            : 'bg-radial from-transparent via-[#2C1810]/10 to-[#2C1810]/30'
        }`}
      />
    </div>
  );
};
