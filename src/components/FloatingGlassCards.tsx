import React from 'react';
import { Star, ShoppingBag, Flame, Sparkles } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Theme } from '../types';

interface FloatingGlassCardsProps {
  theme: Theme;
  onOpenOrderModal: () => void;
  mousePos: { x: number; y: number };
}

export const FloatingGlassCards: React.FC<FloatingGlassCardsProps> = ({
  theme,
  onOpenOrderModal,
  mousePos,
}) => {
  // Parallax shifts for floating depth
  const cardShiftX = mousePos.x * 18;
  const cardShiftY = mousePos.y * 12;

  return (
    <>
      {/* Primary Floating Special Coffee Card removed per request */}

      {/* Secondary Floating Feature Pill (Top Right) */}
      <div
        id="floating-badge-top-right"
        className="hidden lg:block absolute right-16 top-28 z-30 animate-float pointer-events-auto"
        style={{
          animationDelay: '2s',
          transform: `translate3d(${cardShiftX * -0.6}px, ${cardShiftY * -0.6}px, 0)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        <div className="glass-panel p-3.5 px-5 rounded-3xl flex items-center gap-3 border border-white/20 shadow-xl backdrop-blur-xl">
          <div className="w-9 h-9 rounded-2xl bg-[#C58B44]/20 border border-[#C58B44]/40 flex items-center justify-center text-[#C58B44]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">100% Single Origin</div>
            <div className="text-[10px] text-[#D8B58A]/80 font-mono">Ethiopia & Colombia</div>
          </div>
        </div>
      </div>
    </>
  );
};
