import React from 'react';
import { X, MapPin, Clock, Phone, Navigation } from 'lucide-react';
import { CAFES_LOCATIONS } from '../data/coffeeData';

interface LocationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationsModal: React.FC<LocationsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl animate-in fade-in duration-300">
      <div
        id="locations-modal-dialog"
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl glass-panel-dark border border-white/20 shadow-2xl p-6 sm:p-8 text-[#F7F2EC] custom-scrollbar"
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#C58B44]/20 border border-[#C58B44]/40 text-[#C58B44]">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-white">Café Sanctuaries</h2>
              <p className="text-xs text-[#D8B58A]/80 font-light">
                Visit our architecturally designed luxury coffee lounges
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            id="locations-modal-close"
            className="p-2 rounded-full bg-white/10 text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CAFES_LOCATIONS.map((location) => (
            <div
              key={location.id}
              className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-[#C58B44]/40 transition-all flex flex-col justify-between"
            >
              <img
                src={location.image}
                alt={location.name}
                className="w-full h-36 object-cover"
              />
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-base text-white">{location.name}</h3>
                  <div className="text-xs text-[#D8B58A]/80 mt-1 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C58B44] shrink-0 mt-0.5" />
                    <span>{location.address}</span>
                  </div>
                  <div className="text-xs text-[#D8B58A]/80 mt-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C58B44] shrink-0" />
                    <span>{location.hours}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-end">
                  <button
                    onClick={() => alert(`Directions sent to Google Maps for ${location.name}`)}
                    className="px-3 py-1 rounded-full bg-white/10 hover:bg-[#C58B44] text-white text-[11px] font-semibold flex items-center gap-1"
                  >
                    <Navigation className="w-3 h-3" /> Get Directions
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
