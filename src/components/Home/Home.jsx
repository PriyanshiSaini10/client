import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiTruck, HiRefresh, HiShieldCheck, HiStar, HiBookOpen, HiUserGroup, HiSparkles, HiOutlineShoppingBag, HiX, HiSearch, HiClock, HiLightningBolt } from 'react-icons/hi';

export default function Home() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // ⏱️ LIVE COUNTDOWN TIMER STATE
  const [timeLeft, setTimeLeft] = useState(4 * 3600 + 12 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}h : ${m}m : ${s}s`;
  };

  const categories = [
    { name: 'Fantasy', image: 'https://wp.penguin.co.uk/wp-content/uploads/2023/07/Article-Card-Fantasy-books-9-12-2023-Update.jpg', count: '2,450+', slug: 'Fantasy' },
    { name: 'Mystery and Thriller', image: 'https://s2982.pcdn.co/wp-content/uploads/2023/10/20-must-read-Mystery-recs-by-authors.jpg.optimal.jpg', count: '1,200+', slug: 'Mystery and Thriller' },
    { name: 'Science Fiction', image: 'https://images.gr-assets.com/misc/1687810621-1687810621_goodreads_misc.png', count: '890+', slug: 'Science Fiction' },
  ];

  const testimonials = [
    { name: 'Sarah Johnson', rating: 5, text: 'Amazing selection and fast delivery! Found books I couldn\'t find anywhere else.' },
    { name: 'Michael Chen', rating: 5, text: 'The best online bookstore. Great prices and excellent customer service.' },
    { name: 'Emma Williams', rating: 5, text: 'Love the recommendations feature. Discovered so many great reads!' },
  ];

  const stats = [
    { number: '50K+', label: 'Books Available' },
    { number: '25K+', label: 'Happy Readers' },
    { number: '4.9/5', label: 'Average Rating' },
    { number: '100+', label: 'Countries' },
  ];

  const trendingBooks = [
    {
      id: 1,
      title: "From Me to You",
      author: "Karuho Shiina",
      price: "11.99",
      rating: 5,
      image: "https://dnm.nflximg.net/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABeND-MQMp25sXQN9EaJdnX5-gBStHeYWptL5A0WEE53PWNCHgeU-iChVgEpfX1CSJJ90_2EdreqKyAFGEhS1WtDtJOCGg97kXHtY.jpg?r=43a",
      desc: "A sweet and touching romance about misunderstanding, growth, and pure high school feelings."
    },
    {
      id: 2,
      title: "The Fragrant Flower Blooms with Dignity",
      author: "Saka Mikami",
      price: "12.99",
      rating: 5,
      image: "https://a.storyblok.com/f/178900/700x990/0ab04fa622/the-fragrant-flower-blooms-with-dignity-second-key-visual.jpg/m/filters:quality(95)format(webp)",
      desc: "An emotional story bridging the gap between two contrasting worlds and schools."
    },
    {
      id: 3,
      title: "A Star Brighter Than The Sun",
      author: "Mizuho Kusanagi",
      price: "14.50",
      rating: 4,
      image: "https://m.media-amazon.com/images/I/71QvRr3g59L._AC_UF1000,1000_QL80_.jpg",
      desc: "A mesmerizing fantasy journey filled with vivid lore and unforgettable companions."
    },
    {
      id: 4,
      title: "The Name of the Wind",
      author: "Patrick Rothfuss",
      price: "15.99",
      rating: 4.9,
      image: "https://m.media-amazon.com/images/I/71nVnnERNsL._UF1000,1000_QL80_.jpg",
      desc: "Told from Kvothe's perspective, this classic fantasy tracks the life of a magically gifted hero."
    }
  ];

  const bestSellers = [
    {
      id: 101,
      title: "Demon Slayer: Vol 1",
      author: "Koyoharu Gotouge",
      price: "9.99",
      rating: 5,
      sales: "4.8k sold",
      image: "https://m.media-amazon.com/images/I/81ZNkhqRvVL._AC_UF1000,1000_QL80_.jpg",
      desc: "Tanjiro sets out on a dangerous journey to find a cure for his sister and avenge his family."
    },
    {
      id: 102,
      title: "Atomic Habits",
      author: "James Clear",
      price: "16.20",
      rating: 5,
      sales: "3.9k sold",
      image: "https://cdn.shopify.com/s/files/1/0194/2855/files/atomic-habits_600x600.jpg?v=1624825894",
      desc: "An easy and proven way to build good habits and break bad ones with tiny lifestyle changes."
    },
    {
      id: 103,
      title: "Jujutsu Kaisen: Vol 0",
      author: "Gege Akutami",
      price: "10.50",
      rating: 4,
      sales: "3.5k sold",
      image: "https://m.media-amazon.com/images/I/81jxwTCbzTL._UF1000,1000_QL80_.jpg",
      desc: "Yuta Okkotsu gains control of an extremely powerful cursed spirit and enters Jujutsu High."
    },
    {
      id: 104,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      price: "14.00",
      rating: 5,
      sales: "2.8k sold",
      image: "https://m.media-amazon.com/images/I/91lslnZ-btL._AC_UF350,350_QL50_.jpg",
      desc: "A shocking psychological thriller about a woman's act of violence against her husband."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[75vh] flex items-center py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/95 to-[#121212]/80 z-10" />
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1763368230669-3a2e97368032?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMHJlYWRpbmclMjBjb3p5JTIwbGlicmFyeXxlbnwxfHx8fDE3NzE5ODYzNzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Library background"
            className="w-full h-full object-cover opacity-25"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-[#FF5F1F]/10 border border-[#FF5F1F]/20 rounded-full px-4 py-2 mb-6">
                <HiSparkles className="text-[#FF5F1F]" />
                <span className="text-[#FF5F1F] text-sm font-bold uppercase tracking-wider">New Arrivals Weekly</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                Discover Your Next
                <span className="text-[#FF5F1F]"> Great Read</span>
              </h1>
              <p className="text-lg text-zinc-400 mb-8 max-w-xl">
                Explore thousands of books across all genres. From bestsellers to hidden gems, find your perfect book today.
              </p>

              {/* Integrated Search Bar */}
              <div className="relative max-w-md mb-6">
                <input 
                  type="text" 
                  placeholder="Search books, authors, genres..." 
                  className="w-full bg-[#1a1a1a] border border-zinc-800 text-white pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-[#FF5F1F] transition-all text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to="/collections">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#FF5F1F] text-white px-8 py-3 rounded-xl font-black text-lg flex items-center gap-2 shadow-lg shadow-orange-900/30"
                  >
                    Browse Collection
                    <HiArrowRight size={20} />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
            
            {/* Hero Side Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-md mx-auto lg:ml-auto"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#FF5F1F] to-[#ff4d0a] rounded-2xl blur-2xl opacity-20" />
                <img
                  src="https://img.freepik.com/free-photo/anime-style-cozy-home-interior-with-furnishings_23-2151176471.jpg"
                  alt="Person reading book"
                  className="relative rounded-2xl shadow-2xl border border-zinc-800 w-full h-72 sm:h-80 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="bg-[#1a1a1a] border-y border-zinc-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl lg:text-4xl font-black text-[#FF5F1F] mb-2">{stat.number}</div>
                <div className="text-zinc-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING NOW */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-end mb-8 sm:mb-12">
            <div>
              <h2 className="text-2xl sm:text-4xl font-black text-white mb-1 sm:mb-2">
                Trending <span className="text-[#FF5F1F]">Now</span>
              </h2>
              <p className="text-zinc-400 text-xs sm:text-base">The most talked-about reads this week.</p>
            </div>
            <Link to="/collections" className="text-[#FF5F1F] text-sm font-bold hover:underline">
              View All
            </Link>
          </div>

          {/* Mobile pe grid-cols-2 aur padding thodi kam kar di hai taaki cards chote dikhein */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {trendingBooks.map((book) => (
              <motion.div
                key={book.id}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedBook(book)}
                className="bg-[#1a1a1a] rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-zinc-800 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg sm:rounded-xl mb-3">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button 
                      onClick={(e) => e.stopPropagation()} 
                      className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-[#FF5F1F] text-white p-2 sm:p-3 rounded-full shadow-xl transition-all"
                    >
                      <HiOutlineShoppingBag className="text-sm sm:text-lg" />
                    </button>
                  </div>
                  <div className="flex gap-0.5 mb-1 sm:mb-2">
                    {[...Array(5)].map((_, i) => (
                      <HiStar key={i} className={i < book.rating ? "text-[#FF5F1F]" : "text-zinc-800"} className="text-[10px] sm:text-sm" />
                    ))}
                  </div>
                  <h3 className="text-white font-bold text-sm sm:text-lg mb-0.5 sm:mb-1 truncate">{book.title}</h3>
                  <p className="text-zinc-500 text-xs mb-2 sm:mb-3 truncate">{book.author}</p>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-zinc-800/50">
                  <span className="text-sm sm:text-xl font-black text-white">${book.price}</span>
                  <span className="text-[9px] sm:text-xs font-bold text-[#FF5F1F] bg-[#FF5F1F]/10 px-1.5 py-0.5 rounded">Best Seller</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ⚡ LIVE DEAL OF THE DAY FLASH BANNER */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="bg-gradient-to-r from-orange-600 to-[#FF5F1F] rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-4 rounded-xl text-white">
              <HiLightningBolt size={32} className="animate-pulse" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white">Flash Sale: Weekend Specials!</h3>
              <p className="text-white/80 text-sm">Get flat 25% off on your first order this weekend.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-black/40 border border-white/10 px-4 py-2.5 rounded-xl text-sm font-mono tracking-wider font-bold text-white min-w-[140px] justify-center">
              <HiClock size={16} className="text-orange-300" /> 
              <span>{formatTime(timeLeft)}</span>
            </div>
            <Link to="/collections">
              <button className="bg-white text-[#FF5F1F] text-sm font-black px-6 py-3 rounded-xl hover:bg-zinc-100 transition-colors shadow-md">
                Claim Offer
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/*BEST SELLERS SECTION*/}
      <section className="py-12 sm:py-16 bg-[#161616] border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 bg-[#FF5F1F]/10 border border-[#FF5F1F]/20 rounded-full px-3 py-1 mb-3">
              <HiSparkles className="text-[#FF5F1F]" size={14} />
              <span className="text-[#FF5F1F] text-[11px] font-black tracking-wide uppercase">Top Chart</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Our <span className="text-[#FF5F1F]">Best Sellers</span>
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-2">The highest-selling books across our store this month.</p>
          </div>

          {/* Best Sellers Grid (Matching 2 columns layout on mobile) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {bestSellers.map((book, idx) => (
              <motion.div 
                key={book.id} 
                whileHover={{ y: -6 }}
                onClick={() => setSelectedBook(book)} // Popup modal activated here
                className="bg-[#1a1a1a] p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-zinc-800/60 relative group flex flex-col justify-between cursor-pointer"
              >
                {/* Rank Badge - Color Matched to Theme */}
                <div className="absolute top-2 left-2 bg-black/70 text-[#FF5F1F] border border-[#FF5F1F]/30 text-[10px] sm:text-xs font-black w-5 sm:h-6 sm:w-6 h-5 flex items-center justify-center rounded-full z-10">
                  #{idx + 1}
                </div>
                
                <div>
                  <div className="aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden mb-3 bg-zinc-900 relative">
                    <img 
                      src={book.image} 
                      alt={book.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <button 
                      onClick={(e) => e.stopPropagation()} 
                      className="absolute bottom-2 right-2 bg-[#FF5F1F] text-white p-2 rounded-full shadow-lg"
                    >
                      <HiOutlineShoppingBag className="text-xs sm:text-sm" />
                    </button>
                  </div>
                  <div className="flex gap-0.5 mb-1 sm:mb-2">
                    {[...Array(5)].map((_, i) => (
                      <HiStar key={i} className={i < book.rating ? "text-[#FF5F1F]" : "text-zinc-800"} size={12} />
                    ))}
                  </div>
                  <h3 className="text-white font-bold text-sm sm:text-base truncate mb-0.5">{book.title}</h3>
                  <p className="text-zinc-500 text-xs truncate mb-2">{book.author}</p>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-zinc-800/80 mt-2">
                  <span className="text-white font-black text-sm sm:text-base">${book.price}</span>
                  <span className="text-[9px] sm:text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded-full">
                    {book.sales}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE BY CATEGORY */}
      <section className="py-20 bg-[#0a0a0a] border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">
              Explore by <span className="text-[#FF5F1F]">Category</span>
            </h2>
            <p className="text-xl text-zinc-400">Find your favorite genre and start reading</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div key={index} whileHover={{ y: -8 }}>
                <Link to={`/collections?category=${category.slug}`} className="block group">
                  <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#1a1a1a]">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-black text-white mb-1">{category.name}</h3>
                      <p className="text-[#FF5F1F] font-bold">{category.count} Books</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">
              Why Choose <span className="text-[#FF5F1F]">Us</span>
            </h2>
            <p className="text-xl text-zinc-400">We provide the best book shopping experience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-zinc-800">
              <HiTruck className="text-[#FF5F1F] text-3xl mb-6" />
              <h3 className="font-bold text-white text-xl mb-3">Free Shipping</h3>
              <p className="text-zinc-400 leading-relaxed">On orders over $50. Fast and reliable delivery to your doorstep.</p>
            </div>
            <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-zinc-800">
              <HiRefresh className="text-[#FF5F1F] text-3xl mb-6" />
              <h3 className="font-bold text-white text-xl mb-3">Easy Returns</h3>
              <p className="text-zinc-400 leading-relaxed">30-day return policy. Not satisfied? Send it back hassle-free.</p>
            </div>
            <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-zinc-800">
              <HiShieldCheck className="text-[#FF5F1F] text-3xl mb-6" />
              <h3 className="font-bold text-white text-xl mb-3">Secure Payment</h3>
              <p className="text-zinc-400 leading-relaxed">100% secure transactions. Your data is safe with us.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT OUR READERS SAY (Testimonials) */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">
              What Our <span className="text-[#FF5F1F]">Readers Say</span>
            </h2>
            <p className="text-xl text-zinc-400">Real feedback from actual book lovers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-[#1a1a1a] rounded-2xl p-8 border border-zinc-800">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => <HiStar key={i} className="text-[#FF5F1F] text-xl" />)}
                </div>
                <p className="text-zinc-300 mb-6 leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="bg-[#FF5F1F] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg">{t.name.charAt(0)}</div>
                  <div>
                    <p className="text-white font-bold">{t.name}</p>
                    <p className="text-zinc-500 text-sm">Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INFO BLOCKS */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-[#FF5F1F] to-[#ff4d0a] rounded-2xl p-12 relative overflow-hidden">
              <HiBookOpen className="text-white text-5xl mb-6" />
              <h3 className="text-3xl font-black text-white mb-4">Curated Collections</h3>
              <p className="text-white/90 text-lg mb-6 leading-relaxed">Hand-picked selections by our expert team. Discover themed collections.</p>
              <Link to="/collections">
                <button className="bg-white text-[#FF5F1F] px-6 py-3 rounded-xl font-bold">Explore Now</button>
              </Link>
            </div>
            <div className="bg-[#1a1a1a] border border-zinc-800 rounded-2xl p-12 relative overflow-hidden">
              <HiUserGroup className="text-[#FF5F1F] text-5xl mb-6" />
              <h3 className="text-3xl font-black text-white mb-4">Join Our Community</h3>
              <p className="text-zinc-400 text-lg mb-6 leading-relaxed">Connect with fellow readers, share reviews, and get recommendations.</p>
              <Link to="/about">
                <button className="bg-[#FF5F1F] text-white px-6 py-3 rounded-xl font-bold">Learn More</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* POPUP INFORMATION MODAL */}
      <AnimatePresence>
        {selectedBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1a1a1a] border border-zinc-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative"
            >
              <button onClick={() => setSelectedBook(null)} className="absolute top-4 right-4 text-zinc-400 hover:text-white bg-black/40 p-2 rounded-full z-10">
                <HiX size={18} />
              </button>
              <div className="p-6 flex flex-col gap-4">
                <div className="w-36 aspect-[3/4] rounded-xl overflow-hidden mx-auto shadow-xl">
                  <img src={selectedBook.image} alt={selectedBook.title} className="w-full h-full object-cover" />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-black text-white">{selectedBook.title}</h2>
                  <p className="text-zinc-500 text-sm mt-0.5">By {selectedBook.author}</p>
                  <p className="text-zinc-400 text-sm mt-3 leading-relaxed px-2">{selectedBook.desc}</p>
                </div>
                <div className="flex items-center justify-between border-t border-zinc-800 pt-4 mt-2">
                  <span className="text-2xl font-black text-white">${selectedBook.price}</span>
                  <button className="bg-[#FF5F1F] text-white text-sm font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#ff4d0a] transition-colors">
                    Add To Cart <HiOutlineShoppingBag size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}