import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, CheckCircle2, Clock, Sparkles, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (cartId: string) => void;
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderTracker, setOrderTracker] = useState('');

  if (!isOpen) return null;

  const subtotalMAD = cartItems.reduce((sum, item) => sum + item.totalPriceMAD, 0);
  const deliveryFeeMAD = subtotalMAD > 0 ? 15 : 0;
  const discountMAD = Math.round((subtotalMAD * discountPercent) / 100);
  const finalTotalMAD = Math.max(0, subtotalMAD + deliveryFeeMAD - discountMAD);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'LUXURY10') {
      setDiscountPercent(10);
      setPromoApplied(true);
      confetti({ particleCount: 30, spread: 60 });
    } else {
      alert('Invalid code! Try code "LUXURY10" for 10% off your luxury coffee order.');
    }
  };

  const handleCheckout = () => {
    if (!deliveryAddress.trim()) {
      setAddressError('Please enter your delivery address before checkout.');
      return;
    }

    setAddressError('');
    setOrderTracker(`BC-${Math.floor(10000000 + Math.random() * 90000000)}`);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#C58B44', '#B7793E', '#F7F2EC'],
    });
    setOrderPlaced(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
      <div
        id="cart-drawer-panel"
        className="w-full max-w-md h-full bg-[#2C1810]/95 backdrop-blur-2xl border-l border-white/20 shadow-2xl p-6 flex flex-col justify-between text-[#F7F2EC] overflow-y-auto"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-2xl bg-[#C58B44]/20 border border-[#C58B44]/30 text-[#C58B44]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h2 className="font-display text-xl font-bold text-white">Your Coffee Bag</h2>
            </div>
            <button
              onClick={onClose}
              id="cart-drawer-close"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* If Order Placed Success Screen */}
          {orderPlaced ? (
            <div className="py-12 text-center space-y-6 animate-in zoom-in duration-300">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#C58B44]/20 border border-[#C58B44] flex items-center justify-center text-[#C58B44]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-2xl font-bold text-white">Order Confirmed!</h3>
                <p className="text-xs text-[#D8B58A] max-w-xs mx-auto">
                  Your handcrafted coffee is being prepared by our Master Barista.
                </p>
                {orderTracker && (
                  <p className="text-xs text-[#D8B58A]/90">
                    <span className="font-semibold text-[#C58B44]">Tracker Number :</span> {orderTracker}
                  </p>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#D8B58A]">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#C58B44]" /> Estimated Arrival:</span>
                  <span className="font-bold text-white">15 Minutes</span>
                </div>
                <div className="flex items-center justify-between text-[#D8B58A]">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#C58B44]" /> Delivery Address:</span>
                  <span className="font-bold text-white truncate max-w-[180px]">
                    {deliveryAddress || 'Not provided'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#D8B58A]">
                  <span>Total Amount Paid:</span>
                  <span className="font-bold text-[#C58B44]">{finalTotalMAD} MAD</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClearCart();
                  setOrderPlaced(false);
                  setOrderTracker('');
                  onClose();
                }}
                className="w-full py-3 rounded-2xl bg-[#C58B44] text-white font-bold text-sm hover:bg-[#d1944a]"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Cart Item List */}
              {cartItems.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D8B58A]/50">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="text-sm text-[#D8B58A]/80 font-light">Your coffee bag is currently empty.</p>
                  <p className="text-xs text-[#D8B58A]/50">Customize a Caramel Latte to experience happiness.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[45vh] overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div
                      key={item.cartId}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3 relative group"
                    >
                      <img
                        src={item.coffee.image}
                        alt={item.coffee.name}
                        className="w-14 h-14 rounded-xl object-cover border border-white/15"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-sm text-white">{item.coffee.name}</h4>
                          <span className="text-xs font-mono font-bold text-[#C58B44]">
                            {item.totalPriceMAD} MAD
                          </span>
                        </div>
                        <div className="text-[11px] text-[#D8B58A]/80 mt-0.5 space-y-0.5">
                          <div>
                            {item.customization.size.label} • {item.customization.milk.label}
                          </div>
                          <div>
                            Sweetness: {item.customization.sweetness}%
                            {item.customization.extraShots > 0 && ` • +${item.customization.extraShots} Shots`}
                          </div>
                          {item.customization.notes && (
                            <div className="italic text-white/60 text-[10px]">"{item.customization.notes}"</div>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-2.5">
                          <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded-xl border border-white/10">
                            <button
                              onClick={() => onUpdateQuantity(item.cartId, -1)}
                              className="text-xs text-white hover:text-[#C58B44] px-1"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.cartId, 1)}
                              className="text-xs text-white hover:text-[#C58B44] px-1"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.cartId)}
                            className="text-white/40 hover:text-red-400 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {!orderPlaced && cartItems.length > 0 && (
          <div className="pt-4 border-t border-white/10 space-y-4">
            {/* Delivery Address Input */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#D8B58A] uppercase tracking-wider">
                Delivery Address
              </label>
              <input
                type="text"
                placeholder="Enter delivery address"
                value={deliveryAddress}
                onChange={(e) => {
                  setDeliveryAddress(e.target.value);
                  if (addressError) setAddressError('');
                }}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-[#D8B58A]/40"
              />
              {addressError ? (
                <p className="text-[11px] text-rose-300">{addressError}</p>
              ) : null}
            </div>

            {/* Promo Code Input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Promo Code (Try LUXURY10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={promoApplied}
                className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-[#D8B58A]/40 uppercase tracking-wider"
              />
              <button
                onClick={handleApplyPromo}
                disabled={promoApplied}
                className="px-4 py-2 rounded-xl bg-[#C58B44] text-white text-xs font-semibold hover:bg-[#d1944a]"
              >
                {promoApplied ? 'Applied' : 'Apply'}
              </button>
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#D8B58A]/90">
              <div className="flex justify-between">
                <span>Coffee Subtotal:</span>
                <span className="font-mono text-white">{subtotalMAD} MAD</span>
              </div>
              <div className="flex justify-between">
                <span>Express Courier Delivery:</span>
                <span className="font-mono text-white">{deliveryFeeMAD} MAD</span>
              </div>
              {discountMAD > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Promo Discount (10%):</span>
                  <span className="font-mono">-{discountMAD} MAD</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-white/10 font-bold text-base text-white">
                <span>Total Amount:</span>
                <span className="font-mono text-[#C58B44]">{finalTotalMAD} MAD</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              id="proceed-to-checkout-btn"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#C58B44] to-[#B7793E] hover:from-[#d1944a] text-white font-bold text-sm tracking-wide shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Express Checkout • {finalTotalMAD} MAD</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
