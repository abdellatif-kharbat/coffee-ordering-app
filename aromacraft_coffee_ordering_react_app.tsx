import React, { useState, useEffect, createContext, useContext } from 'react';

// Color Palette Definition:
// Dark Coffee: #3E2723
// Coffee Brown: #6F4E37
// Light Coffee: #A67B5B
// Cream: #F5E6D3
// Beige: #FFF8F0
// Dark Mode Background: #1E1714

const ThemeContext = createContext();
const CartContext = createContext();

export const useTheme = () => useContext(ThemeContext);
export const useCart = () => useContext(CartContext);

const COFFEE_DATA = [
  {
    id: 1,
    name: "Espresso",
    category: "Espresso",
    price: 15,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Rich, intense single shot of 100% Arabica roasted beans.",
    description: "Extracted under high pressure for a dark, velvety brew topped with a thick golden-brown crema layer.",
    ingredients: ["Arabica Coffee Beans", "Filtered Water"],
    popular: true
  },
  {
    id: 2,
    name: "Cappuccino",
    category: "Cappuccino",
    price: 25,
    rating: 4.9,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Balanced espresso layered with steamed milk and airy milk foam.",
    description: "A timeless Italian favorite crafted with equal parts espresso, silky steamed milk, and dense microfoam dusted with cocoa powder.",
    ingredients: ["Espresso", "Steamed Whole Milk", "Cocoa Powder"],
    popular: true
  },
  {
    id: 3,
    name: "Caffè Latte",
    category: "Latte",
    price: 28,
    rating: 4.7,
    reviews: 185,
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Smooth espresso blended with velvety steamed milk and light foam.",
    description: "Mellow and comforting coffee drink with a subtle coffee bite wrapped in rich warm milk.",
    ingredients: ["Double Shot Espresso", "Steamed Milk", "Light Foam"],
    popular: true
  },
  {
    id: 4,
    name: "Americano",
    category: "Americano",
    price: 20,
    rating: 4.6,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Espresso shots diluted with hot water for a crisp, clean cup.",
    description: "Retains the full flavor profile of premium espresso while offering a lighter body and smooth finish.",
    ingredients: ["Espresso Shots", "Hot Water"],
    popular: false
  },
  {
    id: 5,
    name: "Mocha Delight",
    category: "Mocha",
    price: 30,
    rating: 4.9,
    reviews: 162,
    image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Decadent dark chocolate mocha with espresso and whipped cream.",
    description: "Indulgent blend of rich cocoa fudge, bold espresso, and microfoam topped with vanilla whipped cream.",
    ingredients: ["Espresso", "Belgian Dark Chocolate", "Steamed Milk", "Whipped Cream"],
    popular: true
  },
  {
    id: 6,
    name: "Iced Coffee",
    category: "Cold Coffee",
    price: 25,
    rating: 4.8,
    reviews: 140,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Chilled fresh brew served over crystal ice cubes with cane sugar.",
    description: "Slow-brewed chilled espresso poured over ice for ultimate refreshment during sunny afternoons.",
    ingredients: ["Chilled Espresso", "Ice", "Liquid Sugar"],
    popular: false
  },
  {
    id: 7,
    name: "Caramel Macchiato",
    category: "Latte",
    price: 32,
    rating: 4.9,
    reviews: 245,
    image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Vanilla-infused milk marked with espresso and buttery caramel drizzle.",
    description: "Layered bliss featuring sweet vanilla syrup, creamy milk, intense espresso, and hand-drizzled artisanal caramel.",
    ingredients: ["Vanilla Syrup", "Steamed Milk", "Espresso", "Caramel Drizzle"],
    popular: true
  },
  {
    id: 8,
    name: "Matcha Green Tea",
    category: "Tea",
    price: 28,
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Japanese ceremonial matcha whisked with warm oat milk.",
    description: "Organic, antioxidant-rich ceremonial matcha green tea smooth blended for an uplifting energy boost.",
    ingredients: ["Ceremonial Matcha", "Oat Milk", "Wildflower Honey"],
    popular: false
  },
  {
    id: 9,
    name: "Artisanal Chocolate Cake",
    category: "Desserts",
    price: 25,
    rating: 4.9,
    reviews: 115,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Moist dark chocolate sponge layered with rich ganache.",
    description: "Baked daily in our bakery kitchen using 70% dark Belgian chocolate and roasted coffee glaze.",
    ingredients: ["Dark Chocolate", "Espresso Glaze", "Flour", "Butter", "Organic Eggs"],
    popular: true
  }
];

const CATEGORIES = ["All", "Espresso", "Cappuccino", "Latte", "Americano", "Mocha", "Cold Coffee", "Tea", "Desserts"];

const Icons = {
  Coffee: () => (
    <svg className="w-6 h-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 8g1 0 011 1v3a4 4 0 01-4 4h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
    </svg>
  ),
  Cart: ({ count }) => (
    <div className="relative inline-block">
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#6F4E37] text-[#FFF8F0] font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow">
          {count}
        </span>
      )}
    </div>
  ),
  Sun: () => (
    <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Moon: () => (
    <svg className="w-5 h-5 text-amber-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ),
  Star: () => (
    <svg className="w-4 h-4 fill-amber-400 text-amber-400 inline" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-5 h-5 text-emerald-500 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Menu: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Close: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
};

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('aromacraft_theme') || 'light');
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('aromacraft_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    localStorage.setItem('aromacraft_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('aromacraft_cart', JSON.stringify(cart));
  }, [cart]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const addToCart = (item) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(ci => 
        ci.id === item.id && 
        ci.size === item.size && 
        JSON.stringify(ci.options) === JSON.stringify(item.options)
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });
    showToast(`Added ${item.name} (${item.quantity}) to your cart!`);
  };

  const updateCartQuantity = (cartItemId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    showToast("Item removed from cart");
  };

  const clearCart = () => setCart([]);

  const navigateTo = (page, coffeeData = null) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (coffeeData) setSelectedCoffee(coffeeData);
    setCurrentPage(page);
  };

  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      <CartContext.Provider value={{ cart, addToCart, updateCartQuantity, removeFromCart, clearCart }}>
        <div className={`min-h-screen font-sans transition-colors duration-300 flex flex-col ${
          isDark ? 'bg-[#1E1714] text-[#F5E6D3]' : 'bg-[#FFF8F0] text-[#3E2723]'
        }`}>
          
          {/* TOAST NOTIFICATION */}
          {toastMessage && (
            <div className="fixed bottom-5 right-5 z-50 bg-[#6F4E37] text-[#FFF8F0] px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border border-[#A67B5B] animate-bounce">
              <Icons.Check />
              <span className="font-semibold text-sm">{toastMessage}</span>
            </div>
          )}

          {/* NAVBAR */}
          <Navbar currentPage={currentPage} navigateTo={navigateTo} />

          {/* PAGE CONTENT ROUTER */}
          <main className="flex-grow">
            {currentPage === 'home' && <HomePage navigateTo={navigateTo} />}
            {currentPage === 'menu' && <MenuPage navigateTo={navigateTo} />}
            {currentPage === 'details' && <CoffeeDetailsPage coffee={selectedCoffee} navigateTo={navigateTo} />}
            {currentPage === 'cart' && <CartPage navigateTo={navigateTo} />}
            {currentPage === 'checkout' && <CheckoutPage navigateTo={navigateTo} setLastOrder={setLastOrder} />}
            {currentPage === 'confirmation' && <OrderConfirmationPage lastOrder={lastOrder} navigateTo={navigateTo} />}
            {currentPage === 'about' && <AboutPage navigateTo={navigateTo} />}
            {currentPage === 'contact' && <ContactPage navigateTo={navigateTo} />}
          </main>

          {/* FOOTER */}
          <Footer navigateTo={navigateTo} />
        </div>
      </CartContext.Provider>
    </ThemeContext.Provider>
  );
}

function Navbar({ currentPage, navigateTo }) {
  const { isDark, toggleTheme } = useTheme();
  const { cart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
      isDark ? 'bg-[#1E1714]/90 border-[#3E2723]' : 'bg-[#FFF8F0]/90 border-[#F5E6D3]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <button onClick={() => navigateTo('home')} className="flex items-center space-x-3 text-left group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#3E2723] to-[#6F4E37] p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#3E2723] rounded-[14px] flex items-center justify-center text-[#F5E6D3]">
              <Icons.Coffee />
            </div>
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-tight block text-[#6F4E37] dark:text-[#A67B5B]">AromaCraft</span>
            <span className="text-[10px] uppercase tracking-widest block text-[#A67B5B]">Artisanal Coffee</span>
          </div>
        </button>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center space-x-8 font-medium text-sm">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => navigateTo(link.id)}
              className={`transition-colors py-1 ${
                currentPage === link.id
                  ? 'text-[#6F4E37] dark:text-[#A67B5B] font-bold border-b-2 border-[#6F4E37] dark:border-[#A67B5B]'
                  : 'hover:text-[#6F4E37] dark:hover:text-[#A67B5B]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* RIGHT CONTROLS */}
        <div className="flex items-center space-x-4">
          
          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl border transition-all ${
              isDark ? 'bg-[#3E2723] border-[#6F4E37] hover:bg-[#6F4E37]' : 'bg-[#F5E6D3] border-[#A67B5B]/30 hover:bg-[#A67B5B]/20'
            }`}
            title="Toggle Light/Dark Theme"
          >
            {isDark ? <Icons.Sun /> : <Icons.Moon />}
          </button>

          {/* CART BUTTON */}
          <button
            onClick={() => navigateTo('cart')}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#6F4E37] text-[#FFF8F0] font-semibold text-sm hover:bg-[#3E2723] transition-all shadow-md"
          >
            <Icons.Cart count={cartItemCount} />
            <span className="hidden sm:inline">Cart</span>
          </button>

          {/* MOBILE HAMBURGER TOGGLE */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl text-[#3E2723] dark:text-[#F5E6D3]"
          >
            {mobileOpen ? <Icons.Close /> : <Icons.Menu />}
          </button>

        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="md:hidden border-b border-[#A67B5B]/20 px-6 py-4 space-y-3 bg-[#FFF8F0] dark:bg-[#1E1714] shadow-xl">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => {
                setMobileOpen(false);
                navigateTo(link.id);
              }}
              className="block w-full text-left py-2 font-semibold text-base border-b border-[#F5E6D3] dark:border-[#3E2723]"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

function HomePage({ navigateTo }) {
  const { isDark } = useTheme();
  const popularChoices = COFFEE_DATA.filter(c => c.popular).slice(0, 4);

  return (
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16">
        <div className={`rounded-3xl p-8 sm:p-14 border shadow-2xl relative overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-10 items-center ${
          isDark ? 'bg-[#3E2723]/40 border-[#6F4E37]' : 'bg-[#F5E6D3]/60 border-[#A67B5B]/30'
        }`}>
          
          {/* TEXT CONTENT */}
          <div className="md:col-span-7 space-y-6 z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#6F4E37] text-[#FFF8F0] text-xs font-bold uppercase tracking-wider">
              ✨ Freshly Brewed Daily
            </span>

            <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#3E2723] dark:text-[#F5E6D3] leading-tight">
              Your Perfect Coffee, <br />
              <span className="text-[#6F4E37] dark:text-[#A67B5B]">Just a Click Away</span>
            </h1>

            <p className="text-base sm:text-lg text-[#6F4E37] dark:text-[#A67B5B] max-w-xl leading-relaxed">
              Discover your favorite coffee, customize your order, and enjoy every single sip delivered hot and fresh to your doorstep.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => navigateTo('menu')}
                className="px-8 py-4 rounded-2xl bg-[#6F4E37] text-[#FFF8F0] font-bold text-base hover:bg-[#3E2723] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Explore Menu
              </button>
              <button
                onClick={() => navigateTo('menu')}
                className={`px-8 py-4 rounded-2xl border-2 font-bold text-base transition-all ${
                  isDark
                    ? 'border-[#A67B5B] text-[#F5E6D3] hover:bg-[#A67B5B]/20'
                    : 'border-[#6F4E37] text-[#3E2723] hover:bg-[#6F4E37]/10'
                }`}
              >
                Order Now
              </button>
            </div>
          </div>

          {/* VISUAL IMAGE */}
          <div className="md:col-span-5 relative flex justify-center">
            <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFF8F0] dark:border-[#3E2723] transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80"
                alt="Artisanal Latte Art"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className={`p-8 rounded-3xl border transition-all hover:-translate-y-1 shadow-lg ${
            isDark ? 'bg-[#3E2723]/30 border-[#6F4E37]' : 'bg-white border-[#F5E6D3]'
          }`}>
            <div className="w-14 h-14 rounded-2xl bg-[#6F4E37] text-[#FFF8F0] flex items-center justify-center mb-6 shadow">
              <Icons.Coffee />
            </div>
            <h3 className="font-serif font-bold text-xl mb-2 text-[#3E2723] dark:text-[#F5E6D3]">Freshly Brewed</h3>
            <p className="text-sm text-[#A67B5B] leading-relaxed">
              100% single-origin roasted Arabica beans ground on demand for every individual order.
            </p>
          </div>

          <div className={`p-8 rounded-3xl border transition-all hover:-translate-y-1 shadow-lg ${
            isDark ? 'bg-[#3E2723]/30 border-[#6F4E37]' : 'bg-white border-[#F5E6D3]'
          }`}>
            <div className="w-14 h-14 rounded-2xl bg-[#6F4E37] text-[#FFF8F0] flex items-center justify-center mb-6 shadow">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-serif font-bold text-xl mb-2 text-[#3E2723] dark:text-[#F5E6D3]">Fast Delivery</h3>
            <p className="text-sm text-[#A67B5B] leading-relaxed">
              Thermal insulated eco-packaging keeps your coffee piping hot and crema preserved in 20 mins.
            </p>
          </div>

          <div className={`p-8 rounded-3xl border transition-all hover:-translate-y-1 shadow-lg ${
            isDark ? 'bg-[#3E2723]/30 border-[#6F4E37]' : 'bg-white border-[#F5E6D3]'
          }`}>
            <div className="w-14 h-14 rounded-2xl bg-[#6F4E37] text-[#FFF8F0] flex items-center justify-center mb-6 shadow">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="font-serif font-bold text-xl mb-2 text-[#3E2723] dark:text-[#F5E6D3]">Easy Ordering</h3>
            <p className="text-sm text-[#A67B5B] leading-relaxed">
              Tailor size, extra espresso shots, milk alternatives, and syrup levels seamlessly.
            </p>
          </div>

        </div>
      </section>

      {/* POPULAR CHOICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6F4E37] dark:text-[#A67B5B]">Curated Selection</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#3E2723] dark:text-[#F5E6D3]">Popular Choices</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularChoices.map(coffee => (
            <CoffeeCard key={coffee.id} coffee={coffee} navigateTo={navigateTo} />
          ))}
        </div>
      </section>

    </div>
  );
}

function MenuPage({ navigateTo }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCoffees = selectedCategory === "All"
    ? COFFEE_DATA
    : COFFEE_DATA.filter(c => c.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* HEADER */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl font-extrabold text-[#3E2723] dark:text-[#F5E6D3]">Our Coffee Menu</h1>
        <p className="text-sm text-[#A67B5B]">
          Explore our handcrafted beverages and bakery desserts. Select any drink to customize milk, syrups, and espresso strength.
        </p>
      </div>

      {/* CATEGORY FILTERS */}
      <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 no-scrollbar">
        {CATEGORIES.map(cat => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap shadow-sm ${
                active
                  ? 'bg-[#6F4E37] text-[#FFF8F0]'
                  : 'bg-[#F5E6D3] dark:bg-[#3E2723] text-[#3E2723] dark:text-[#F5E6D3] hover:bg-[#A67B5B]/30'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCoffees.map(coffee => (
          <CoffeeCard key={coffee.id} coffee={coffee} navigateTo={navigateTo} />
        ))}
      </div>

    </div>
  );
}

function CoffeeCard({ coffee, navigateTo }) {
  const { isDark } = useTheme();

  return (
    <div className={`rounded-3xl overflow-hidden border shadow-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${
      isDark ? 'bg-[#3E2723]/30 border-[#6F4E37]' : 'bg-white border-[#F5E6D3]'
    }`}>
      
      <div>
        {/* IMAGE & RATING BADGE */}
        <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => navigateTo('details', coffee)}>
          <img
            src={coffee.image}
            alt={coffee.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-3 right-3 bg-[#3E2723]/80 backdrop-blur-md text-[#FFF8F0] px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
            <Icons.Star />
            <span>{coffee.rating}</span>
          </div>
        </div>

        {/* DETAILS */}
        <div className="p-5 space-y-2">
          <div className="flex justify-between items-start">
            <h3
              onClick={() => navigateTo('details', coffee)}
              className="font-serif font-bold text-lg cursor-pointer hover:text-[#6F4E37] dark:hover:text-[#A67B5B] text-[#3E2723] dark:text-[#F5E6D3]"
            >
              {coffee.name}
            </h3>
            <span className="font-extrabold text-[#6F4E37] dark:text-[#A67B5B] text-base whitespace-nowrap">
              {coffee.price} MAD
            </span>
          </div>

          <p className="text-xs text-[#A67B5B] line-clamp-2 leading-relaxed">
            {coffee.shortDesc}
          </p>
        </div>
      </div>

      {/* FOOTER BUTTON */}
      <div className="p-5 pt-0">
        <button
          onClick={() => navigateTo('details', coffee)}
          className="w-full py-2.5 rounded-xl bg-[#6F4E37] text-[#FFF8F0] font-bold text-xs hover:bg-[#3E2723] transition-colors shadow"
        >
          Customize & Add
        </button>
      </div>

    </div>
  );
}

function CoffeeDetailsPage({ coffee, navigateTo }) {
  const { isDark } = useTheme();
  const { addToCart } = useCart();

  if (!coffee) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">No coffee selected</h2>
        <button onClick={() => navigateTo('menu')} className="px-6 py-2 bg-[#6F4E37] text-white rounded-xl">
          Back to Menu
        </button>
      </div>
    );
  }

  const [size, setSize] = useState('Medium');
  const [quantity, setQuantity] = useState(1);
  const [options, setOptions] = useState({
    extraShot: false,
    extraMilk: false,
    vanillaSyrup: false,
    caramelSyrup: false,
    whippedCream: false
  });

  // Price Calculation Logic
  const sizeSurcharge = size === 'Small' ? 0 : size === 'Medium' ? 4 : 8;
  const optionsSurcharge = 
    (options.extraShot ? 5 : 0) +
    (options.extraMilk ? 3 : 0) +
    (options.vanillaSyrup ? 4 : 0) +
    (options.caramelSyrup ? 4 : 0) +
    (options.whippedCream ? 4 : 0);

  const unitPrice = coffee.price + sizeSurcharge + optionsSurcharge;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    const cartItem = {
      cartItemId: `${coffee.id}-${size}-${Date.now()}`,
      id: coffee.id,
      name: coffee.name,
      image: coffee.image,
      size,
      options,
      quantity,
      unitPrice,
      totalPrice
    };
    addToCart(cartItem);
    navigateTo('cart');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* BACK BUTTON */}
      <button
        onClick={() => navigateTo('menu')}
        className="text-xs font-bold text-[#6F4E37] dark:text-[#A67B5B] flex items-center space-x-2 hover:underline"
      >
        <span>← Back to Coffee Menu</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* IMAGE DISPLAY */}
        <div className="md:col-span-5">
          <div className="rounded-3xl overflow-hidden border shadow-2xl h-80 sm:h-96">
            <img src={coffee.image} alt={coffee.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* CUSTOMIZATION CONTROLS */}
        <div className="md:col-span-7 space-y-6">
          <div>
            <div className="flex justify-between items-center">
              <h1 className="font-serif text-3xl font-extrabold text-[#3E2723] dark:text-[#F5E6D3]">{coffee.name}</h1>
              <span className="text-xl font-black text-[#6F4E37] dark:text-[#A67B5B]">{coffee.price} MAD base</span>
            </div>
            <div className="flex items-center space-x-2 mt-1 text-xs text-[#A67B5B]">
              <Icons.Star />
              <span className="font-bold text-[#3E2723] dark:text-[#F5E6D3]">{coffee.rating}</span>
              <span>({coffee.reviews} reviews)</span>
            </div>
            <p className="text-sm text-[#A67B5B] mt-3 leading-relaxed">{coffee.description}</p>
          </div>

          {/* INGREDIENTS */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3E2723] dark:text-[#F5E6D3]">Ingredients</span>
            <div className="flex flex-wrap gap-2">
              {coffee.ingredients.map(ing => (
                <span key={ing} className="px-3 py-1 rounded-xl bg-[#F5E6D3] dark:bg-[#3E2723] text-xs font-medium text-[#3E2723] dark:text-[#F5E6D3]">
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* SIZE SELECTION */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3E2723] dark:text-[#F5E6D3]">Select Cup Size</span>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'Small', extra: '+0 MAD' },
                { name: 'Medium', extra: '+4 MAD' },
                { name: 'Large', extra: '+8 MAD' }
              ].map(s => (
                <button
                  key={s.name}
                  onClick={() => setSize(s.name)}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    size === s.name
                      ? 'bg-[#6F4E37] text-[#FFF8F0] border-[#6F4E37] font-bold shadow'
                      : 'border-[#A67B5B]/30 hover:border-[#6F4E37]'
                  }`}
                >
                  <span className="block text-xs font-bold">{s.name}</span>
                  <span className="block text-[10px] opacity-80">{s.extra}</span>
                </button>
              ))}
            </div>
          </div>

          {/* CUSTOMIZATIONS */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3E2723] dark:text-[#F5E6D3]">Customize Options</span>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                { key: 'extraShot', label: 'Extra Espresso Shot (+5 MAD)' },
                { key: 'extraMilk', label: 'Extra Steamed Milk (+3 MAD)' },
                { key: 'vanillaSyrup', label: 'Vanilla Syrup (+4 MAD)' },
                { key: 'caramelSyrup', label: 'Caramel Syrup (+4 MAD)' },
                { key: 'whippedCream', label: 'Whipped Cream (+4 MAD)' }
              ].map(opt => (
                <label
                  key={opt.key}
                  className={`p-3 rounded-2xl border flex items-center space-x-3 cursor-pointer transition-all ${
                    options[opt.key]
                      ? 'bg-[#6F4E37]/10 border-[#6F4E37] font-bold'
                      : 'border-[#A67B5B]/30 hover:border-[#6F4E37]'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={options[opt.key]}
                    onChange={(e) => setOptions({ ...options, [opt.key]: e.target.checked })}
                    className="accent-[#6F4E37] w-4 h-4 rounded"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* QUANTITY & ADD TO CART */}
          <div className="pt-4 border-t border-[#A67B5B]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center space-x-3 border border-[#A67B5B]/30 rounded-2xl p-1.5">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-xl bg-[#F5E6D3] dark:bg-[#3E2723] font-extrabold text-base flex items-center justify-center"
              >
                -
              </button>
              <span className="font-extrabold text-base px-3">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-xl bg-[#F5E6D3] dark:bg-[#3E2723] font-extrabold text-base flex items-center justify-center"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full sm:flex-grow py-4 px-8 rounded-2xl bg-[#6F4E37] text-[#FFF8F0] font-extrabold text-sm hover:bg-[#3E2723] transition-all shadow-xl flex items-center justify-between"
            >
              <span>Add to Cart</span>
              <span>{totalPrice} MAD</span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

function CartPage({ navigateTo }) {
  const { isDark } = useTheme();
  const { cart, updateCartQuantity, removeFromCart } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = subtotal > 0 ? (subtotal > 100 ? 0 : 12) : 0;
  const discount = subtotal > 150 ? 15 : 0;
  const total = Math.max(0, subtotal + deliveryFee - discount);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-[#F5E6D3] dark:bg-[#3E2723] flex items-center justify-center mx-auto text-[#6F4E37]">
          <Icons.Coffee />
        </div>
        <h2 className="font-serif text-3xl font-extrabold text-[#3E2723] dark:text-[#F5E6D3]">Your cart is empty</h2>
        <p className="text-sm text-[#A67B5B]">Looks like you haven't added any artisanal coffees yet.</p>
        <button
          onClick={() => navigateTo('menu')}
          className="px-8 py-3.5 rounded-2xl bg-[#6F4E37] text-[#FFF8F0] font-bold text-sm hover:bg-[#3E2723] transition-all shadow-lg"
        >
          Explore Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <h1 className="font-serif text-3xl font-extrabold text-[#3E2723] dark:text-[#F5E6D3]">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* CART ITEM LIST */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map(item => (
            <div
              key={item.cartItemId}
              className={`p-4 sm:p-6 rounded-3xl border shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 ${
                isDark ? 'bg-[#3E2723]/30 border-[#6F4E37]' : 'bg-white border-[#F5E6D3]'
              }`}
            >
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-2xl object-cover" />
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-[#3E2723] dark:text-[#F5E6D3]">{item.name}</h3>
                  <p className="text-xs text-[#A67B5B]">Size: <strong>{item.size}</strong></p>
                  
                  {/* Selected options breakdown */}
                  <div className="text-[10px] text-[#A67B5B] flex flex-wrap gap-1">
                    {Object.entries(item.options).filter(([, v]) => v).map(([k]) => (
                      <span key={k} className="px-1.5 py-0.5 rounded bg-[#F5E6D3] dark:bg-[#3E2723]">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                {/* QUANTITY CONTROLS */}
                <div className="flex items-center space-x-2 border border-[#A67B5B]/30 rounded-xl p-1">
                  <button
                    onClick={() => updateCartQuantity(item.cartItemId, -1)}
                    className="w-7 h-7 rounded-lg bg-[#F5E6D3] dark:bg-[#3E2723] font-extrabold text-xs flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-extrabold text-xs px-2">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.cartItemId, 1)}
                    className="w-7 h-7 rounded-lg bg-[#F5E6D3] dark:bg-[#3E2723] font-extrabold text-xs flex items-center justify-center"
                  >
                    +
                  </button>
                </div>

                <span className="font-extrabold text-base text-[#6F4E37] dark:text-[#A67B5B]">
                  {item.totalPrice} MAD
                </span>

                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="text-rose-500 hover:text-rose-700 p-2 text-xs font-bold"
                  title="Remove item"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ORDER SUMMARY */}
        <div className={`lg:col-span-4 p-6 rounded-3xl border shadow-xl space-y-6 ${
          isDark ? 'bg-[#3E2723]/40 border-[#6F4E37]' : 'bg-white border-[#F5E6D3]'
        }`}>
          <h2 className="font-serif font-bold text-xl text-[#3E2723] dark:text-[#F5E6D3]">Order Summary</h2>

          <div className="space-y-3 text-sm text-[#A67B5B]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-[#3E2723] dark:text-[#F5E6D3]">{subtotal} MAD</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-bold text-[#3E2723] dark:text-[#F5E6D3]">
                {deliveryFee === 0 ? 'FREE' : `${deliveryFee} MAD`}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Special Discount</span>
                <span>-{discount} MAD</span>
              </div>
            )}
            <div className="pt-3 border-t border-[#A67B5B]/20 flex justify-between font-extrabold text-base text-[#3E2723] dark:text-[#F5E6D3]">
              <span>Total Amount</span>
              <span className="text-[#6F4E37] dark:text-[#A67B5B] text-xl">{total} MAD</span>
            </div>
          </div>

          <button
            onClick={() => navigateTo('checkout')}
            className="w-full py-4 rounded-2xl bg-[#6F4E37] text-[#FFF8F0] font-extrabold text-sm hover:bg-[#3E2723] transition-all shadow-lg"
          >
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  );
}

function CheckoutPage({ navigateTo, setLastOrder }) {
  const { isDark } = useTheme();
  const { cart, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    deliveryMethod: 'home', // 'home' | 'pickup'
    paymentMethod: 'cash', // 'cash' | 'card'
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = formData.deliveryMethod === 'pickup' ? 0 : (subtotal > 100 ? 0 : 12);
  const total = subtotal + deliveryFee;

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = "Full Name is required";
    if (!formData.phone.trim()) errs.phone = "Phone Number is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    if (formData.deliveryMethod === 'home' && !formData.address.trim()) errs.address = "Address is required";

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) errs.cardNumber = "Card number required";
      if (!formData.cardHolder.trim()) errs.cardHolder = "Name on card required";
      if (!formData.expiry.trim()) errs.expiry = "Expiry required";
      if (!formData.cvv.trim()) errs.cvv = "CVV required";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const order = {
      orderNumber: `MAD-${Math.floor(100000 + Math.random() * 900000)}`,
      items: cart,
      total,
      deliveryMethod: formData.deliveryMethod,
      estimatedTime: formData.deliveryMethod === 'home' ? '20 - 30 mins' : '10 - 15 mins',
      customer: formData
    };

    setLastOrder(order);
    clearCart();
    navigateTo('confirmation');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <h1 className="font-serif text-3xl font-extrabold text-[#3E2723] dark:text-[#F5E6D3]">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* FORM STEPS */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* STEP 1: CUSTOMER INFORMATION */}
          <div className={`p-6 rounded-3xl border shadow-md space-y-4 ${
            isDark ? 'bg-[#3E2723]/30 border-[#6F4E37]' : 'bg-white border-[#F5E6D3]'
          }`}>
            <h2 className="font-serif font-bold text-lg text-[#3E2723] dark:text-[#F5E6D3]">
              Step 1 — Customer Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Amina Mansouri"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full p-3 rounded-xl border bg-transparent focus:outline-none focus:border-[#6F4E37]"
                />
                {errors.fullName && <p className="text-rose-500 text-[10px] mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block font-bold mb-1">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="+212 600-000000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 rounded-xl border bg-transparent focus:outline-none focus:border-[#6F4E37]"
                />
                {errors.phone && <p className="text-rose-500 text-[10px] mt-1">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold mb-1">Email Address *</label>
                <input
                  type="email"
                  placeholder="amina@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 rounded-xl border bg-transparent focus:outline-none focus:border-[#6F4E37]"
                />
                {errors.email && <p className="text-rose-500 text-[10px] mt-1">{errors.email}</p>}
              </div>

              {formData.deliveryMethod === 'home' && (
                <div className="sm:col-span-2">
                  <label className="block font-bold mb-1">Delivery Address *</label>
                  <input
                    type="text"
                    placeholder="Street, Building / Apartment number"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-3 rounded-xl border bg-transparent focus:outline-none focus:border-[#6F4E37]"
                  />
                  {errors.address && <p className="text-rose-500 text-[10px] mt-1">{errors.address}</p>}
                </div>
              )}
            </div>
          </div>

          {/* STEP 2: DELIVERY METHOD */}
          <div className={`p-6 rounded-3xl border shadow-md space-y-4 ${
            isDark ? 'bg-[#3E2723]/30 border-[#6F4E37]' : 'bg-white border-[#F5E6D3]'
          }`}>
            <h2 className="font-serif font-bold text-lg text-[#3E2723] dark:text-[#F5E6D3]">
              Step 2 — Delivery Method
            </h2>

            <div className="grid grid-cols-2 gap-4 text-xs">
              {[
                { id: 'home', label: '🚀 Home Express Delivery', sub: '20-30 Mins' },
                { id: 'pickup', label: '🏪 Store Pickup', sub: 'Ready in 10 Mins' }
              ].map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, deliveryMethod: m.id })}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    formData.deliveryMethod === m.id
                      ? 'bg-[#6F4E37] text-[#FFF8F0] border-[#6F4E37] font-bold shadow'
                      : 'border-[#A67B5B]/30 hover:border-[#6F4E37]'
                  }`}
                >
                  <span className="block font-bold">{m.label}</span>
                  <span className="block text-[10px] opacity-80">{m.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 3: PAYMENT METHOD */}
          <div className={`p-6 rounded-3xl border shadow-md space-y-4 ${
            isDark ? 'bg-[#3E2723]/30 border-[#6F4E37]' : 'bg-white border-[#F5E6D3]'
          }`}>
            <h2 className="font-serif font-bold text-lg text-[#3E2723] dark:text-[#F5E6D3]">
              Step 3 — Payment Method
            </h2>

            <div className="grid grid-cols-2 gap-4 text-xs mb-4">
              {[
                { id: 'cash', label: '💵 Cash on Delivery' },
                { id: 'card', label: '💳 Credit / Debit Card' }
              ].map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: p.id })}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    formData.paymentMethod === p.id
                      ? 'bg-[#6F4E37] text-[#FFF8F0] border-[#6F4E37] font-bold shadow'
                      : 'border-[#A67B5B]/30 hover:border-[#6F4E37]'
                  }`}
                >
                  <span className="block font-bold">{p.label}</span>
                </button>
              ))}
            </div>

            {formData.paymentMethod === 'card' && (
              <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-[#A67B5B]/20">
                <div className="col-span-2">
                  <label className="block font-bold mb-1">Card Number</label>
                  <input
                    type="text"
                    placeholder="4000 1234 5678 9010"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full p-3 rounded-xl border bg-transparent"
                  />
                  {errors.cardNumber && <p className="text-rose-500 text-[10px] mt-1">{errors.cardNumber}</p>}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block font-bold mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="Amina Mansouri"
                    value={formData.cardHolder}
                    onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
                    className="w-full p-3 rounded-xl border bg-transparent"
                  />
                  {errors.cardHolder && <p className="text-rose-500 text-[10px] mt-1">{errors.cardHolder}</p>}
                </div>
                <div>
                  <label className="block font-bold mb-1">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                    className="w-full p-3 rounded-xl border bg-transparent"
                  />
                  {errors.expiry && <p className="text-rose-500 text-[10px] mt-1">{errors.expiry}</p>}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* ORDER SUMMARY RIGHT BAR */}
        <div className={`lg:col-span-4 p-6 rounded-3xl border shadow-xl space-y-6 ${
          isDark ? 'bg-[#3E2723]/40 border-[#6F4E37]' : 'bg-white border-[#F5E6D3]'
        }`}>
          <h2 className="font-serif font-bold text-xl text-[#3E2723] dark:text-[#F5E6D3]">Order Summary</h2>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1 text-xs">
            {cart.map(item => (
              <div key={item.cartItemId} className="flex justify-between items-center py-1 border-b border-[#A67B5B]/10">
                <div>
                  <span className="font-bold block">{item.quantity}x {item.name}</span>
                  <span className="text-[10px] text-[#A67B5B]">{item.size}</span>
                </div>
                <span className="font-bold">{item.totalPrice} MAD</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#A67B5B]/20 space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold">{subtotal} MAD</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-bold">{deliveryFee} MAD</span>
            </div>
            <div className="flex justify-between text-base font-extrabold pt-2 border-t border-[#A67B5B]/20">
              <span>Total</span>
              <span className="text-[#6F4E37] dark:text-[#A67B5B]">{total} MAD</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-[#6F4E37] text-[#FFF8F0] font-extrabold text-sm hover:bg-[#3E2723] transition-all shadow-xl"
          >
            Place Order
          </button>
        </div>

      </form>
    </div>
  );
}

function OrderConfirmationPage({ lastOrder, navigateTo }) {
  if (!lastOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">No active order details</h2>
        <button onClick={() => navigateTo('menu')} className="px-6 py-2 bg-[#6F4E37] text-white rounded-xl">
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8">
      
      <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 flex items-center justify-center mx-auto text-4xl animate-bounce">
        ✓
      </div>

      <div className="space-y-2">
        <h1 className="font-serif text-4xl font-extrabold text-[#3E2723] dark:text-[#F5E6D3]">Order Confirmed!</h1>
        <p className="text-sm text-[#A67B5B]">
          Thank you for your order, <strong>{lastOrder.customer.fullName}</strong>. Your artisanal coffee is being prepared by our baristas!
        </p>
      </div>

      <div className="p-6 rounded-3xl border bg-white dark:bg-[#3E2723]/30 border-[#F5E6D3] dark:border-[#6F4E37] text-left max-w-md mx-auto space-y-3 text-xs">
        <div className="flex justify-between py-1 border-b border-[#A67B5B]/10">
          <span className="text-[#A67B5B]">Order Number:</span>
          <span className="font-extrabold text-[#3E2723] dark:text-[#F5E6D3]">{lastOrder.orderNumber}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-[#A67B5B]/10">
          <span className="text-[#A67B5B]">Estimated Delivery Time:</span>
          <span className="font-bold text-emerald-600">{lastOrder.estimatedTime}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-[#A67B5B]/10">
          <span className="text-[#A67B5B]">Total Amount:</span>
          <span className="font-extrabold text-[#6F4E37] dark:text-[#A67B5B]">{lastOrder.total} MAD</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => alert(`Tracking ${lastOrder.orderNumber}: Barista is steaming milk...`)}
          className="px-8 py-3.5 rounded-2xl bg-[#6F4E37] text-[#FFF8F0] font-bold text-sm hover:bg-[#3E2723] shadow-lg"
        >
          Track Order
        </button>
        <button
          onClick={() => navigateTo('menu')}
          className="px-8 py-3.5 rounded-2xl border-2 border-[#6F4E37] text-[#3E2723] dark:text-[#F5E6D3] font-bold text-sm"
        >
          Back to Menu
        </button>
      </div>

    </div>
  );
}

function AboutPage({ navigateTo }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8 text-center">
      <h1 className="font-serif text-4xl font-extrabold text-[#3E2723] dark:text-[#F5E6D3]">About AromaCraft</h1>
      <p className="text-sm text-[#A67B5B] max-w-2xl mx-auto leading-relaxed">
        Founded in Morocco, AromaCraft connects passionate coffee lovers with ethically sourced, micro-roasted single-origin beans. From golden pour-overs to velvety cold foams, we treat every single cup as an artwork.
      </p>
      <button onClick={() => navigateTo('menu')} className="px-8 py-3 bg-[#6F4E37] text-white rounded-2xl font-bold text-sm">
        Explore Our Roasts
      </button>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-6 text-center">
      <h1 className="font-serif text-4xl font-extrabold text-[#3E2723] dark:text-[#F5E6D3]">Contact Us</h1>
      <p className="text-sm text-[#A67B5B]">📍 124 Boulevard Mohammed V, Casablanca, Morocco</p>
      <p className="text-sm text-[#A67B5B]">📞 +212 522-000111 | ✉️ contact@aromacraft.ma</p>
    </div>
  );
}

function Footer({ navigateTo }) {
  return (
    <footer className="border-t border-[#A67B5B]/20 py-10 bg-[#3E2723] text-[#F5E6D3] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-3">
          <Icons.Coffee />
          <span className="font-serif font-bold text-base">AromaCraft Coffee</span>
        </div>
        <div className="flex space-x-6 text-[#A67B5B]">
          <button onClick={() => navigateTo('home')}>Home</button>
          <button onClick={() => navigateTo('menu')}>Menu</button>
          <button onClick={() => navigateTo('about')}>About</button>
          <button onClick={() => navigateTo('contact')}>Contact</button>
        </div>
        <span className="text-[#A67B5B]">© 2026 AromaCraft. All rights reserved.</span>
      </div>
    </footer>
  );
}