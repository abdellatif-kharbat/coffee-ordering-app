import React, { useState } from 'react';
import { X, Sparkles, Check, Plus, Minus, Coffee, Flame, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CoffeeItem, CoffeeSize, MilkOption, CartItem } from '../types';
import { COFFEE_MENU, SIZES, MILK_OPTIONS } from '../data/coffeeData';

interface CoffeeCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  preselectedItem?: CoffeeItem;
}

export const CoffeeCustomizerModal: React.FC<CoffeeCustomizerModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  preselectedItem,
}) => {
  const [selectedCoffee, setSelectedCoffee] = useState<CoffeeItem>(
    preselectedItem || COFFEE_MENU[0]
  );
  const [selectedSize, setSelectedSize] = useState<CoffeeSize>(SIZES[0]);
  const [selectedMilk, setSelectedMilk] = useState<MilkOption>(MILK_OPTIONS[0]);
  const [sweetness, setSweetness] = useState<number>(50);
  const [extraShots, setExtraShots] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  if (!isOpen) return null;

  // Calculate unit and total prices in MAD
  const shotPriceMAD = 6;
  const unitPriceMAD =
    selectedCoffee.basePriceMAD +
    selectedSize.priceOffset +
    selectedMilk.priceOffset +
    extraShots * shotPriceMAD;
  const totalPriceMAD = unitPriceMAD * quantity;

  const handleAdd = () => {
    // Fire Confetti explosion
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C58B44', '#B7793E', '#F7F2EC', '#D8B58A'],
    });

    const newCartItem: CartItem = {
      cartId: `${selectedCoffee.id}-${Date.now()}`,
      coffee: selectedCoffee,
      customization: {
        size: selectedSize,
        milk: selectedMilk,
        sweetness,
        extraShots,
        notes: specialInstructions,
      },
      quantity,
      unitPriceMAD,
      totalPriceMAD,
    };

    onAddToCart(newCartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl animate-in fade-in duration-300">
      <div
        id="coffee-customizer-dialog"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel-dark border border-white/20 shadow-2xl p-6 sm:p-8 text-[#F7F2EC] custom-scrollbar"
      >
        {/* Top Header bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#C58B44]/20 border border-[#C58B44]/40 text-[#C58B44]">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
                Customize Your Brew
              </h2>
              <p className="text-xs text-[#D8B58A]/80 font-light">
                Tailored by Bean & Brew Baristas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            id="customizer-close-btn"
            className="p-2 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Coffee Selection Switcher */}
          <div>
            <label className="block text-xs font-semibold text-[#D8B58A] uppercase tracking-wider mb-2.5">
              Select Coffee Variant
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {COFFEE_MENU.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedCoffee(item)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedCoffee.id === item.id
                      ? 'bg-[#C58B44]/20 border-[#C58B44] text-white shadow-lg shadow-[#C58B44]/20'
                      : 'bg-white/5 border-white/10 text-[#D8B58A] hover:bg-white/10'
                  }`}
                >
                  <div className="font-semibold text-xs sm:text-sm line-clamp-1">{item.name}</div>
                  <div className="text-[11px] font-mono text-[#C58B44] mt-0.5">
                    {item.basePriceMAD} MAD
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Coffee Brief Overview */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
            <img
              src={selectedCoffee.image}
              alt={selectedCoffee.name}
              className="w-16 h-16 rounded-xl object-cover border border-white/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-base text-white">{selectedCoffee.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C58B44]/20 text-[#D8B58A] border border-[#C58B44]/30">
                  {selectedCoffee.roastLevel} Roast
                </span>
              </div>
              <p className="text-xs text-[#D8B58A]/80 font-light mt-1">
                {selectedCoffee.description}
              </p>
            </div>
          </div>

          {/* 1. Cup Size Selection */}
          <div>
            <label className="block text-xs font-semibold text-[#D8B58A] uppercase tracking-wider mb-2.5">
              1. Choose Size
            </label>
            <div className="grid grid-cols-3 gap-3">
              {SIZES.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size)}
                  className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center transition-all ${
                    selectedSize.id === size.id
                      ? 'bg-gradient-to-b from-[#C58B44]/30 to-[#B7793E]/30 border-[#C58B44] text-white shadow-lg'
                      : 'bg-white/5 border-white/10 text-[#D8B58A] hover:bg-white/10'
                  }`}
                >
                  <span className="font-bold text-sm">{size.label}</span>
                  <span className="text-[10px] text-white/70 font-mono mt-0.5">{size.volume}</span>
                  {size.priceOffset > 0 && (
                    <span className="text-[10px] text-[#C58B44] font-semibold mt-1">
                      +{size.priceOffset} MAD
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Milk Type Selection */}
          <div>
            <label className="block text-xs font-semibold text-[#D8B58A] uppercase tracking-wider mb-2.5">
              2. Milk Choice
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {MILK_OPTIONS.map((milk) => (
                <button
                  key={milk.id}
                  onClick={() => setSelectedMilk(milk)}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    selectedMilk.id === milk.id
                      ? 'bg-[#C58B44]/25 border-[#C58B44] text-white font-semibold'
                      : 'bg-white/5 border-white/10 text-[#D8B58A] hover:bg-white/10'
                  }`}
                >
                  <div className="text-xs">{milk.label}</div>
                  <div className="text-[10px] text-[#C58B44] mt-0.5">
                    {milk.priceOffset > 0 ? `+${milk.priceOffset} MAD` : 'Included'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Sweetness & Extra Shots */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Sweetness */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-[#D8B58A] uppercase tracking-wider">
                  Sweetness Level
                </label>
                <span className="text-xs font-bold text-[#C58B44]">{sweetness}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="25"
                value={sweetness}
                onChange={(e) => setSweetness(Number(e.target.value))}
                className="w-full accent-[#C58B44] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#D8B58A]/70 font-mono mt-1">
                <span>0% Unsweet</span>
                <span>50% Standard</span>
                <span>100% Full</span>
              </div>
            </div>

            {/* Extra Shots */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <label className="block text-xs font-semibold text-[#D8B58A] uppercase tracking-wider">
                  Extra Espresso Shots
                </label>
                <span className="text-[11px] text-[#D8B58A]/70 font-mono">
                  +{shotPriceMAD} MAD per shot
                </span>
              </div>
              <div className="flex items-center gap-3 bg-black/40 p-1.5 rounded-2xl border border-white/10">
                <button
                  onClick={() => setExtraShots(Math.max(0, extraShots - 1))}
                  className="w-7 h-7 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 text-white"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-bold text-sm w-4 text-center">{extraShots}</span>
                <button
                  onClick={() => setExtraShots(Math.min(3, extraShots + 1))}
                  className="w-7 h-7 rounded-xl bg-[#C58B44] flex items-center justify-center hover:bg-[#d1944a] text-white"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Notes Input */}
          <div>
            <label className="block text-xs font-semibold text-[#D8B58A] uppercase tracking-wider mb-2">
              Barista Instructions (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Extra hot, double cup, cinnamon sprinkle..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-sm text-white placeholder-[#D8B58A]/40 focus:outline-none focus:border-[#C58B44]"
            />
          </div>

          {/* Quantity and Final Add to Order CTA */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#D8B58A] font-semibold uppercase">Quantity:</span>
              <div className="flex items-center gap-3 bg-black/40 px-3 py-1.5 rounded-2xl border border-white/15">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-base w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-xl bg-[#C58B44] flex items-center justify-center text-white hover:bg-[#d1944a]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              id="confirm-add-to-cart-btn"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#C58B44] to-[#B7793E] hover:from-[#d1944a] hover:to-[#c58245] text-white font-bold text-sm tracking-wide shadow-xl shadow-[#C58B44]/30 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Add to Order • {totalPriceMAD} MAD</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
