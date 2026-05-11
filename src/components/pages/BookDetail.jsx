import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiShoppingCart, HiStar, HiTag } from 'react-icons/hi';
import { books } from '../data/books.js';
import { useCart } from '../context/CartContext.jsx';
import { toast } from 'sonner';

export default function BookDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Book not found</h1>
          <Link to="/collections">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-[#FF5F1F] text-white px-6 py-3 rounded-lg font-bold"
            >
              Back to Collections
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(book);
    toast.success(`Added "${book.title}" to cart`);
  };

  const handleBuyNow = () => {
    addToCart(book);
    navigate('/cart');
  };

  const discount = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : 0;

  const relatedBooks = books.filter((b) => b.category === book.category && b.id !== book.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Link to="/collections">
          <motion.button
            whileHover={{ x: -4 }}
            className="flex items-center gap-2 text-[#FF5F1F] hover:text-[#ff4d0a] mb-8 font-medium"
          >
            <HiArrowLeft size={20} />
            Back to Collections
          </motion.button>
        </Link>

        {/* Book Detail */}
        <div className="bg-[#1a1a1a] rounded-2xl border border-zinc-800 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Book Image */}
            <div className="relative aspect-[3/4] lg:h-[600px] rounded-xl overflow-hidden bg-zinc-900">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              {book.originalPrice && (
                <div className="absolute top-4 right-4 bg-[#FF5F1F] text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg">
                  <HiTag className="text-lg" />
                  <span className="font-bold">{discount}% OFF</span>
                </div>
              )}
            </div>

            {/* Book Details */}
            <div className="flex flex-col">
              <div className="mb-3">
                <span className="inline-block bg-[#FF5F1F]/10 text-[#FF5F1F] px-4 py-1.5 rounded-full text-sm font-bold border border-[#FF5F1F]/20">
                  {book.category}
                </span>
              </div>

              <h1 className="text-4xl font-black text-white mb-2">
                {book.title}
              </h1>
              
              <p className="text-xl text-zinc-400 mb-4">by {book.author}</p>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <HiStar
                      key={i}
                      className={`text-lg ${
                        i < Math.floor(book.rating)
                          ? 'text-yellow-500'
                          : 'text-zinc-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-white">{book.rating}</span>
                <span className="text-zinc-500">({book.reviews} reviews)</span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-black text-white">
                    ${book.price}
                  </span>
                  {book.originalPrice && (
                    <>
                      <span className="text-2xl text-zinc-600 line-through">
                        ${book.originalPrice}
                      </span>
                      <span className="text-lg text-green-500 font-bold">
                        Save ${(book.originalPrice - book.price).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-3">Description</h2>
                <p className="text-zinc-300 leading-relaxed">
                  {book.description}
                </p>
              </div>

              <div className="mt-auto space-y-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyNow}
                  className="w-full bg-[#FF5F1F] hover:bg-[#ff4d0a] text-white py-4 rounded-xl font-black text-lg shadow-lg shadow-orange-900/20 transition-colors"
                >
                  Buy Now
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors border border-zinc-700"
                >
                  <HiShoppingCart size={20} />
                  Add to Cart
                </motion.button>
              </div>

              <div className="mt-6 pt-6 border-t border-zinc-800">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-zinc-500 mb-1">Format</p>
                    <p className="font-bold text-white">Paperback</p>
                  </div>
                  <div>
                    <p className="text-zinc-500 mb-1">Availability</p>
                    <p className="font-bold text-green-500">In Stock</p>
                  </div>
                  <div>
                    <p className="text-zinc-500 mb-1">Shipping</p>
                    <p className="font-medium text-zinc-300">Free on orders over $50</p>
                  </div>
                  <div>
                    <p className="text-zinc-500 mb-1">Returns</p>
                    <p className="font-medium text-zinc-300">30-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-black text-white mb-6">
              More in <span className="text-[#FF5F1F]">{book.category}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedBooks.map((relatedBook) => (
                <Link
                  key={relatedBook.id}
                  to={`/book/${relatedBook.id}`}
                  className="group bg-[#1a1a1a] rounded-xl border border-zinc-800 hover:border-[#FF5F1F]/50 transition-all overflow-hidden"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
                    <img
                      src={relatedBook.image}
                      alt={relatedBook.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold line-clamp-1 mb-1 text-white group-hover:text-[#FF5F1F] transition-colors">
                      {relatedBook.title}
                    </h3>
                    <p className="text-sm text-zinc-400 mb-2">
                      {relatedBook.author}
                    </p>
                    <p className="font-bold text-white">${relatedBook.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
