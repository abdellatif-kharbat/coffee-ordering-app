import React, { useState } from 'react';
import { X, Star, Coffee, Sparkles, Filter } from 'lucide-react';
import { CoffeeItem } from '../types';
import { COFFEE_MENU } from '../data/coffeeData';

interface MenuPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCoffeeToCustomize: (item: CoffeeItem) => void;
}

export const MenuPreviewModal: React.FC<MenuPreviewModalProps> = ({
  isOpen,
  onClose,
  onSelectCoffeeToCustomize,
}) => {
  const [filterRoast, setFilterRoast] = useState<string>('All');

  if (!isOpen) return null;

  const filteredItems =
    filterRoast === 'All'
      ? COFFEE_MENU
      : COFFEE_MENU.filter((item) => item.roastLevel === filterRoast);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl animate-in fade-in duration-300">
      <div
        id="menu-modal-dialog"
        className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl glass-panel-dark border border-white/20 shadow-2xl p-6 sm:p-8 text-[#F7F2EC] custom-scrollbar"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#C58B44]/20 border border-[#C58B44]/40 text-[#C58B44]">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-white">
                Our Reserve Coffee Menu
              </h2>
              <p className="text-xs text-[#D8B58A]/80 font-light">
                Handcrafted from 100% Specialty Arabica Beans
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            id="menu-modal-close"
            className="p-2 rounded-full bg-white/10 text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Roast Level Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
          <span className="text-xs text-[#D8B58A] flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5" /> Roast:
          </span>
          {['All', 'Light', 'Medium', 'Dark'].map((roast) => (
            <button
              key={roast}
              onClick={() => setFilterRoast(roast)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filterRoast === roast
                  ? 'bg-[#C58B44] text-white shadow-lg shadow-[#C58B44]/30'
                  : 'bg-white/5 border border-white/10 text-[#D8B58A] hover:bg-white/10'
              }`}
            >
              {roast} Roast
            </button>
          ))}
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((coffee) => (
            <div
              key={coffee.id}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C58B44]/40 transition-all flex gap-4 group"
            >
              <img
                src={coffee.image}
                alt={coffee.name}
                className="w-24 h-24 rounded-2xl object-cover border border-white/15 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-base text-white">{coffee.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-[#C58B44]">
                      <Star className="w-3.5 h-3.5 fill-[#C58B44]" />
                      <span className="font-bold">{coffee.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#D8B58A]/80 font-light mt-1 line-clamp-2">
                    {coffee.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {coffee.notes.map((note) => (
                      <span
                        key={note}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-[#D8B58A] border border-white/10"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
                  <span className="font-mono font-bold text-sm text-[#C58B44]">
                    {coffee.basePriceMAD} MAD
                  </span>
                  <button
                    onClick={() => {
                      onSelectCoffeeToCustomize(coffee);
                      onClose();
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-[#C58B44] hover:bg-[#d1944a] text-white text-xs font-semibold flex items-center gap-1 shadow-md"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Customize & Order</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
