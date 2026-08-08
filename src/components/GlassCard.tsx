import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  theme?: 'dark' | 'light';
  glow?: boolean;
  hoverEffect?: boolean;
  id?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  theme = 'dark',
  glow = false,
  hoverEffect = true,
  id,
}) => {
  return (
    <div
      id={id}
      className={`relative rounded-3xl transition-all duration-500 overflow-hidden ${
        theme === 'dark' ? 'glass-panel-dark text-[#F7F2EC]' : 'glass-panel-light text-[#2C1810]'
      } ${
        hoverEffect ? 'hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#D8B58A]/40' : ''
      } ${glow ? 'before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#C58B44]/20 before:to-transparent before:opacity-50 pointer-events-auto' : ''} ${className}`}
    >
      {/* Top subtle highlight reflection */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
