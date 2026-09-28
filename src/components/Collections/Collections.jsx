import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSearch, HiX, HiShoppingCart, HiStar, HiAdjustments, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { Link, useSearchParams } from 'react-router-dom'; 
import { BookCard } from '../BookCard.jsx';
import { books, categories } from '../data/books.js'; 
import { useCart } from '../context/CartContext.jsx';

const ITEMS_PER_PAGE = 8; // Number of books per page

export default function Collections() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Sync state with URL search params on load & parameter change
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const sortParam = searchParams.get('sort');
    const pageParam = parseInt(searchParams.get('page') || '1', 10);

    setSelectedCategory(categoryParam || 'All');
    setSortBy(sortParam || 'default');
    setCurrentPage(isNaN(pageParam) ? 1 : pageParam);
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Helper to update URL search params while preserving existing ones
  const updateUrlParams = (key, value) => {
    const updatedParams = new URLSearchParams(searchParams);
    if (!value || value === 'All' || value === 'default' || value === 1) {
      updatedParams.delete(key);
    } else {
      updatedParams.set(key, value);
    }
    // Always reset to page 1 when changing filters/sorting
    if (key !== 'page') {
      updatedParams.delete('page');
    }
    setSearchParams(updatedParams);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    updateUrlParams('category', category);
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
    updateUrlParams('sort', sortOption);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateUrlParams('page', page);
  };

  // 2. Filter Logic
  const filteredBooks = books.filter((book) => {
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFeatured = !showFeaturedOnly || book.featured === true;

    return matchesCategory && matchesSearch && matchesFeatured;
  });

  // 3. Sort Logic
  const sortedAndFilteredBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  // 4. Pagination Slice
  const totalPages = Math.ceil(sortedAndFilteredBooks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBooks = sortedAndFilteredBooks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      handlePageChange(1);
                    }}
                    className="w-full bg-zinc-800 border border-zinc-700 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:border-[#FF5F1F] transition-colors"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryChange(category)} 
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-[#FF5F1F] text-white shadow-lg shadow-orange-900/20'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Sorting & Featured Toggle */}
            <div className="flex items-center gap-3 self-end md:self-auto">
              <button
                onClick={() => {
                  setShowFeaturedOnly(!showFeaturedOnly);
                  handlePageChange(1);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors border ${
                  showFeaturedOnly
                    ? 'bg-[#FF5F1F]/10 text-[#FF5F1F] border-[#FF5F1F]'
                    : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white'
                }`}
              >
                <HiStar className={showFeaturedOnly ? 'text-[#FF5F1F]' : 'text-zinc-500'} />
                Featured Only
              </button>

              <div className="relative flex items-center">
                <HiAdjustments className="absolute left-3 text-zinc-400 text-sm pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-medium pl-8 pr-4 py-2 rounded-lg focus:outline-none focus:border-[#FF5F1F] transition-colors appearance-none cursor-pointer"
                >
                  <option value="default">Sort By: Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {paginatedBooks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-zinc-400 text-lg">No books found matching your criteria.</p>
          </div>
        ) : (
          <>
            <motion.div 
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 justify-center min-h-[500px]"
            >
              {paginatedBooks.map((book) => (
                <motion.div
                  key={book.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <BookCard book={book} />
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="p-2.5 rounded-lg bg-zinc-800 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors"
                >
                  <HiChevronLeft size={18} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${
                      currentPage === page
                        ? 'bg-[#FF5F1F] text-white shadow-md shadow-orange-900/30'
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="p-2.5 rounded-lg bg-zinc-800 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors"
                >
                  <HiChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>    
    </div>
  );
}