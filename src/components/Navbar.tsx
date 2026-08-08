import React, { useState, useEffect } from 'react';
import { Coffee, ShoppingBag, Menu as MenuIcon, X, MapPin, Sparkles } from 'lucide-react';
import { Theme } from '../types';

interface NavbarProps {
  theme: Theme;
  cartCount: number;
  onOpenCart: () => void;
  onOpenOrderModal: () => void;
  onOpenMenuModal: () => void;
  onOpenOurCoffeeModal: () => void;
  onOpenLocationsModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  cartCount,
  onOpenCart,
  onOpenOrderModal,
  onOpenMenuModal,
  onOpenOurCoffeeModal,
  onOpenLocationsModal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-4 sm:px-8 lg:px-12 ${
        scrolled
          ? theme === 'dark'
            ? 'bg-[#2C1810]/85 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/40 py-3'
            : 'bg-[#F7F2EC]/85 backdrop-blur-2xl border-b border-[#2C1810]/10 shadow-xl py-3'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          id="navbar-brand-logo"
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-[#C58B44] to-[#3A2416] p-0.5 shadow-lg shadow-[#C58B44]/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#2C1810] rounded-[14px] flex items-center justify-center border border-white/20">
              <Coffee className="w-5 h-5 text-[#D8B58A] group-hover:text-[#C58B44] transition-colors" />
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#C58B44] rounded-full animate-ping" />
          </div>
          <div className="flex flex-col">
            <span
              className={`font-display text-xl sm:text-2xl font-bold tracking-tight ${
                theme === 'dark' ? 'text-[#F7F2EC]' : 'text-[#2C1810]'
              }`}
            >
              Bean <span className="text-[#C58B44] italic">&</span> Brew
            </span>
            <span className="text-[10px] tracking-widest uppercase font-mono text-[#D8B58A]/80 -mt-1">
              Luxury Coffee
            </span>
          </div>
        </a>

        {/* Desktop Navigation Center */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-4 py-2 rounded-full bg-white/5 dark:bg-white/5 border border-white/15 backdrop-blur-xl shadow-inner">
          <a
            href="#home"
            id="nav-link-home"
            className="px-4 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all text-[#F7F2EC] bg-white/10 shadow-sm"
          >
            Home
          </a>
          <button
            onClick={onOpenMenuModal}
            id="nav-link-menu"
            className="px-4 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all text-[#D8B58A] hover:text-white hover:bg-white/10"
          >
            Menu
          </button>
          <button
            onClick={onOpenOurCoffeeModal}
            id="nav-link-our-coffee"
            className="px-4 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all text-[#D8B58A] hover:text-white hover:bg-white/10"
          >
            Our Coffee
          </button>
          <button
            onClick={onOpenLocationsModal}
            id="nav-link-locations"
            className="px-4 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all text-[#D8B58A] hover:text-white hover:bg-white/10 flex items-center gap-1.5"
          >
            <MapPin className="w-3.5 h-3.5 text-[#C58B44]" />
            Locations
          </button>
        </nav>

        {/* Right Section Actions */}
        <div className="flex items-center gap-3">
          {/* Cart Icon Button */}
          <button
            onClick={onOpenCart}
            id="navbar-cart-button"
            aria-label="Shopping Cart"
            className={`relative p-2.5 rounded-full transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-white/10 text-[#F7F2EC] hover:bg-white/20 border border-white/20'
                : 'bg-[#2C1810]/10 text-[#2C1810] hover:bg-[#2C1810]/20 border border-[#2C1810]/20'
            } backdrop-blur-md hover:scale-105 active:scale-95`}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C58B44] text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#2C1810] shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenOrderModal}
            id="navbar-order-now-button"
            className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-[#C58B44] to-[#B7793E] hover:from-[#d1944a] hover:to-[#c58245] shadow-lg shadow-[#C58B44]/25 hover:shadow-xl hover:shadow-[#C58B44]/40 border border-[#D8B58A]/40 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-[#F7F2EC]" />
            <span>Order Now</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="navbar-mobile-toggle"
            aria-label="Toggle mobile menu"
            className="md:hidden p-2.5 rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-md"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Glass Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-6 rounded-3xl glass-panel-dark border border-white/20 backdrop-blur-2xl shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-medium text-[#F7F2EC] hover:text-[#C58B44] py-2 border-b border-white/10"
          >
            Home
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenMenuModal();
            }}
            className="text-left text-base font-medium text-[#D8B58A] hover:text-white py-2 border-b border-white/10"
          >
            Menu & Today's Special
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenOurCoffeeModal();
            }}
            className="text-left text-base font-medium text-[#D8B58A] hover:text-white py-2 border-b border-white/10"
          >
            Our Coffee
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenLocationsModal();
            }}
            className="text-left text-base font-medium text-[#D8B58A] hover:text-white py-2 border-b border-white/10 flex items-center justify-between"
          >
            <span>Café Locations</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#C58B44]/20 text-[#C58B44] border border-[#C58B44]/30">3 Open</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenOrderModal();
            }}
            className="w-full mt-2 py-3 rounded-full bg-gradient-to-r from-[#C58B44] to-[#B7793E] text-white font-semibold text-center shadow-lg"
          >
            Order Coffee Now
          </button>
        </div>
      )}
    </header>
  );
};
