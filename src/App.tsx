import React, { useState, useEffect, useCallback } from 'react';
import { Theme, CartItem, CoffeeItem } from './types';
import { COFFEE_MENU } from './data/coffeeData';
import { Navbar } from './components/Navbar';
import { CinematicBackground } from './components/CinematicBackground';
import { HeroContent } from './components/HeroContent';
import { FloatingGlassCards } from './components/FloatingGlassCards';
import { CoffeeCustomizerModal } from './components/CoffeeCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { MenuPreviewModal } from './components/MenuPreviewModal';
import { LocationsModal } from './components/LocationsModal';
import { OurCoffeeModal } from './components/OurCoffeeModal';

export default function App() {
  // Dark mode is permanent
  const theme: Theme = 'dark';

  // Mouse Parallax Position State (-1 to 1 normalized coordinates)
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Shopping Cart State with localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('bean_brew_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // Modals Visibility
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState<CoffeeItem | undefined>(COFFEE_MENU[0]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);
  const [isOurCoffeeOpen, setIsOurCoffeeOpen] = useState(false);

  // Set dark mode on page load
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#2C1810';
    document.body.style.color = '#F7F2EC';
  }, []);

  // Synchronize Cart to localStorage
  useEffect(() => {
    localStorage.setItem('bean_brew_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Track Mouse Movement for Parallax Depth
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const normX = (clientX / innerWidth) * 2 - 1;
    const normY = (clientY / innerHeight) * 2 - 1;
    setMousePos({ x: normX, y: normY });
  }, []);



  // Cart Operations
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleUpdateCartQuantity = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPriceMAD: item.unitPriceMAD * newQty,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenCustomizerForCoffee = (item?: CoffeeItem) => {
    setSelectedCoffee(item || COFFEE_MENU[0]);
    setIsCustomizerOpen(true);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`relative w-full min-h-screen h-screen overflow-x-hidden select-none transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#2C1810] text-[#F7F2EC]' : 'bg-[#FAF6F0] text-[#2C1810]'
      }`}
    >
      {/* 1. Cinematic Background Layer */}
      <CinematicBackground theme={theme} mousePos={mousePos} />

      {/* 2. Interactive 3D Canvas Layer removed (3D cup) */}

      {/* 3. Navigation Bar */}
      <Navbar
        theme={theme}
        cartCount={cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrderModal={() => handleOpenCustomizerForCoffee(COFFEE_MENU[0])}
        onOpenMenuModal={() => setIsMenuOpen(true)}
        onOpenOurCoffeeModal={() => setIsOurCoffeeOpen(true)}
        onOpenLocationsModal={() => setIsLocationsOpen(true)}
      />

      {/* 4. Hero Viewport Container */}
      <main className="relative z-20 w-full h-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between pointer-events-none">
        {/* Left Side: Typography & Primary CTAs */}
        <HeroContent
          theme={theme}
          mousePos={mousePos}
          onOpenOrderModal={() => handleOpenCustomizerForCoffee(COFFEE_MENU[0])}
          onOpenMenuModal={() => setIsMenuOpen(true)}
        />

        {/* Right Side: Floating Glass Specialty Cards */}
        <FloatingGlassCards
          theme={theme}
          mousePos={mousePos}
          onOpenOrderModal={() => handleOpenCustomizerForCoffee(COFFEE_MENU[0])}
        />
      </main>

      {/* 5. Customizer Modal */}
      <CoffeeCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onAddToCart={handleAddToCart}
        preselectedItem={selectedCoffee}
      />

      {/* 6. Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onClearCart={handleClearCart}
      />

      {/* 7. Reserve Menu Preview Modal */}
      <MenuPreviewModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectCoffeeToCustomize={(coffee) => handleOpenCustomizerForCoffee(coffee)}
      />

      {/* 8. Our Coffee Modal */}
      <OurCoffeeModal isOpen={isOurCoffeeOpen} onClose={() => setIsOurCoffeeOpen(false)} />

      {/* 9. Locations Modal */}
      <LocationsModal isOpen={isLocationsOpen} onClose={() => setIsLocationsOpen(false)} />
    </div>
  );
}
