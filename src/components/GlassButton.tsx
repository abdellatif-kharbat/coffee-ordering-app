import React from 'react';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm font-medium',
    lg: 'px-8 py-4 text-base font-semibold',
  };

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-[#C58B44] to-[#B7793E] text-white shadow-xl shadow-[#C58B44]/25 hover:shadow-2xl hover:shadow-[#C58B44]/40 border border-[#D8B58A]/30',
    secondary:
      'bg-white/10 dark:bg-white/10 text-white hover:bg-white/20 border border-white/25 backdrop-blur-xl shadow-lg shadow-black/20',
    ghost:
      'bg-transparent text-white/90 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/15 backdrop-blur-md',
  };

  return (
    <button
      className={`relative group inline-flex items-center justify-center rounded-full tracking-wide transition-all duration-300 transform active:scale-95 disabled:opacity-50 cursor-pointer overflow-hidden ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {/* Light sweep effect */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
      
      {icon && iconPosition === 'left' && <span className="mr-2.5 transition-transform group-hover:-translate-x-0.5">{icon}</span>}
      <span className="relative z-10 whitespace-nowrap">{children}</span>
      {icon && iconPosition === 'right' && <span className="ml-2.5 transition-transform group-hover:translate-x-1">{icon}</span>}
    </button>
  );
};
