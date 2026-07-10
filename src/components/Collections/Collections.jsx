import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSearch, HiX, HiShoppingCart } from 'react-icons/hi';
import { Link, useSearchParams } from 'react-router-dom'; 
import { BookCard } from '../BookCard.jsx';
import { books, categories } from '../data/books.js';
import { useCart } from '../context/CartContext.jsx';

export default function Collections() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
  const categoryParam = searchParams.get('category');
  
  if (categoryParam) {
    setSelectedCategory(categoryParam);
  } else {
    setSelectedCategory('All');
  }
 }, [searchParams]);

  const filteredBooks = books.filter((book) => {
  const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
  
  const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        book.author.toLowerCase().includes(searchQuery.toLowerCase());
                        
  return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

 const handleCategoryChange = (category) => {
  setSelectedCategory(category);
  if (category === 'All') {
    searchParams.delete('category');
  } else {
    searchParams.set('category', category); 
  }
  setSearchParams(searchParams);
 };

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-black text-white mb-2">
                Book <span className="text-[#FF5F1F]">Collections</span>
              </h1>
              <p className="text-zinc-400">Discover your next great read</p>
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSearch(!showSearch)}
                className="bg-zinc-800 hover:bg-zinc-700 text-white p-3 rounded-lg transition-colors"
              >
                {showSearch ? <HiX size={20} /> : <HiSearch size={20} />}
              </motion.button>

              <Link to="/cart">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#FF5F1F] hover:bg-[#ff4d0a] text-white p-3 rounded-lg relative transition-colors shadow-lg shadow-orange-900/20"
                >
                  <HiShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-white text-[#FF5F1F] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="relative mb-6">
                  <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-xl" />
                  <input
                    type="text"
                    placeholder="Search by title or author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:border-[#FF5F1F] transition-colors"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[#FF5F1F] text-white shadow-lg shadow-orange-900/20'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {filteredBooks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-zinc-400 text-lg">No books found matching your criteria.</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredBooks.map((book) => (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <BookCard book={book} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12"></div>
    </div>
  );
}