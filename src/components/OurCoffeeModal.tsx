import React from 'react';
import { X, Coffee, Leaf, Sparkles, Heart } from 'lucide-react';

interface OurCoffeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OurCoffeeModal: React.FC<OurCoffeeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl animate-in fade-in duration-300">
      <div
        id="our-coffee-modal-dialog"
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel-dark border border-white/20 shadow-2xl p-6 sm:p-8 text-[#F7F2EC] custom-scrollbar"
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-3xl bg-[#C58B44]/20 border border-[#C58B44]/40 text-[#C58B44]">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">Our Coffee</h2>
              <p className="text-xs text-[#D8B58A]/80 font-light">
                A visual story of our beans, craft, and signature flavor.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            id="our-coffee-modal-close"
            className="p-2 rounded-full bg-white/10 text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="space-y-5">
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/40">
              <img
                src="/pexels-cmrcn-30226644.jpg"
                alt="Our coffee experience"
                className="w-full h-[320px] object-cover"
              />
            </div>

            <div className="space-y-4 text-sm text-[#D8B58A]/90 font-light leading-relaxed">
              <p>
                Our coffee begins with the finest hand-selected Arabica beans sourced from small farms in Ethiopia, Colombia, and Brazil. Every roast is calibrated to highlight rich caramel sweetness, delicate florals, and deep chocolate notes.
              </p>
              <p>
                We brew with precision equipment and a passion for detail, delivering a cup that is velvety, aromatic, and perfectly balanced. This is the coffee experience you deserve — luxurious, soulful, and unforgettable.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-3xl bg-white/5 border border-white/10 text-center space-y-2">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[#C58B44]/20 text-[#C58B44] mx-auto">
                  <Leaf className="w-5 h-5" />
                </span>
                <p className="font-semibold text-white text-sm">Single Origin Beans</p>
                <p className="text-[11px] text-[#D8B58A]/70">Ethically sourced from top estates.</p>
              </div>
              <div className="p-4 rounded-3xl bg-white/5 border border-white/10 text-center space-y-2">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[#C58B44]/20 text-[#C58B58] mx-auto">
                  <Sparkles className="w-5 h-5" />
                </span>
                <p className="font-semibold text-white text-sm">Expert Roasting</p>
                <p className="text-[11px] text-[#D8B58A]/70">Small batches roasted to perfection.</p>
              </div>
              <div className="p-4 rounded-3xl bg-white/5 border border-white/10 text-center space-y-2">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[#C58B44]/20 text-[#C58B44] mx-auto">
                  <Heart className="w-5 h-5" />
                </span>
                <p className="font-semibold text-white text-sm">Crafted with Care</p>
                <p className="text-[11px] text-[#D8B58A]/70">Made to delight every sip.</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[#1F1410]/80 border border-white/10 p-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="rounded-3xl bg-[#2C1810]/90 p-4 border border-[#C58B44]/10">
                <p className="text-xs text-[#D8B58A]/80 uppercase tracking-[0.22em] font-semibold">
                  The Experience
                </p>
                <h3 className="mt-3 text-xl font-bold text-white">Sip the story behind every bean.</h3>
                <p className="mt-2 text-sm text-[#D8B58A]/90 leading-relaxed">
                  From handpicked harvest to your cup, each step is designed to preserve aroma, body, and clarity.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-2xl bg-[#C58B44]/20 p-3 text-[#C58B44]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Freshly roasted daily</p>
                    <p className="text-[11px] text-[#D8B58A]/70">Always served at peak flavor.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-2xl bg-[#C58B44]/20 p-3 text-[#C58B44]">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Brewed with precision</p>
                    <p className="text-[11px] text-[#D8B58A]/70">Every cup is crafted to order.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-2xl bg-[#C58B44]/20 p-3 text-[#C58B44]">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Beloved by locals</p>
                    <p className="text-[11px] text-[#D8B58A]/70">A luxurious ritual for coffee lovers.</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-4 w-full rounded-full bg-[#C58B44] hover:bg-[#d1944a] text-white text-sm font-semibold px-5 py-3 transition-all duration-200"
            >
              Close 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
