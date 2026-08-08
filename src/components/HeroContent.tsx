import React from 'react';
import { Sparkles, ArrowRight, Star, Clock, ShieldCheck, Heart } from 'lucide-react';
import { GlassButton } from './GlassButton';
import { Theme } from '../types';

interface HeroContentProps {
  theme: Theme;
  onOpenOrderModal: () => void;
  onOpenMenuModal: () => void;
  mousePos: { x: number; y: number };
}

export const HeroContent: React.FC<HeroContentProps> = ({
  theme,
  onOpenOrderModal,
  onOpenMenuModal,
  mousePos,
}) => {
  // Parallax subtle text movement
  const textShiftX = mousePos.x * -8;
  const textShiftY = mousePos.y * -5;

  return (
    <div
      id="hero-content-root"
      className="relative z-20 max-w-2xl flex flex-col justify-center pt-24 pb-12 lg:py-0 min-h-[calc(100vh-80px)] pointer-events-none"
      style={{
        transform: `translate3d(${textShiftX}px, ${textShiftY}px, 0)`,
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div className="pointer-events-auto space-y-6 sm:space-y-8">
        {/* Luxury Badge Header */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-[#D8B58A]/30 text-xs sm:text-sm font-medium tracking-wide text-[#D8B58A] shadow-xl w-fit">
          <Sparkles className="w-4 h-4 text-[#C58B44] animate-spin" style={{ animationDuration: '6s' }} />
          <span>Handcrafted Artisan Coffee</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C58B44]" />
          <span className="text-[#F7F2EC] font-semibold">Casablanca & Rabat</span>
        </div>

        {/* Main Title Heading */}
        <div className="space-y-3">
          <h1
            className={`font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] ${
              theme === 'dark' ? 'text-[#F7F2EC]' : 'text-[#2C1810]'
            }`}
          >
            Brew <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C58B44] via-[#D8B58A] to-[#B7793E]">Happiness</span>
            <br />
            In Every Cup
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-[#D8B58A]/90 dark:text-[#D8B58A]/90 font-light leading-relaxed max-w-xl">
            Experience handcrafted coffee made from premium beans, customized exactly the way you love it and delivered to your door in minutes.
          </p>
        </div>

        {/* Primary and Secondary Hero Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <GlassButton
            id="hero-order-coffee-btn"
            variant="primary"
            size="lg"
            icon={<Sparkles className="w-5 h-5 text-white" />}
            onClick={onOpenOrderModal}
            className="shadow-2xl shadow-[#C58B44]/30"
          >
            Order Coffee
          </GlassButton>

          <GlassButton
            id="hero-explore-menu-btn"
            variant="secondary"
            size="lg"
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
            onClick={onOpenMenuModal}
          >
            Explore Menu
          </GlassButton>
        </div>

        {/* Social Proof & Value Proposition Badges */}
        <div className="pt-6 grid grid-cols-3 gap-3 sm:gap-6 border-t border-white/10 dark:border-white/10 max-w-lg">
          {/* Stat 1 */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-[#C58B44]">
              <Star className="w-4 h-4 fill-[#C58B44]" />
              <span className="font-bold text-sm sm:text-base text-white">4.95</span>
            </div>
            <span className="text-[11px] sm:text-xs text-[#D8B58A]/80 font-light">2,400+ Reviews</span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-[#C58B44]">
              <Clock className="w-4 h-4" />
              <span className="font-bold text-sm sm:text-base text-white">15 Mins</span>
            </div>
            <span className="text-[11px] sm:text-xs text-[#D8B58A]/80 font-light">Express Delivery</span>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-[#C58B44]">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-bold text-sm sm:text-base text-white">100%</span>
            </div>
            <span className="text-[11px] sm:text-xs text-[#D8B58A]/80 font-light">Organic Arabica</span>
          </div>
        </div>

        {/* Customer testimonial quote pill */}
        <div className="inline-flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-xs text-[#D8B58A]">
          <div className="flex -space-x-2 overflow-hidden">
            <img className="inline-block h-7 w-7 rounded-full ring-2 ring-[#C58B44]" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Customer avatar" />
            <img className="inline-block h-7 w-7 rounded-full ring-2 ring-[#C58B44]" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Customer avatar" />
            <img className="inline-block h-7 w-7 rounded-full ring-2 ring-[#C58B44]" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Customer avatar" />
          </div>
          <div>
            <span className="font-semibold text-white">"Best Caramel Latte in town!"</span>
            <div className="flex items-center gap-1 text-[10px] text-[#C58B44]">
              <Heart className="w-3 h-3 fill-[#C58B44]" /> Loved by 10,000+ coffee enthusiasts
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
