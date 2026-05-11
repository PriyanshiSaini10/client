import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiStar, HiTag } from 'react-icons/hi';
import { useCart } from './context/CartContext.jsx';
import { toast } from 'sonner';

export function BookCard({ book }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(book);
    toast.success(`Added "${book.title}" to cart`);
  };

  const discount = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/book/${book.id}`}>
      <motion.div 
        whileHover={{ y: -8 }}
        className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-zinc-800 hover:border-[#FF5F1F]/50 transition-all duration-300 group"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {book.originalPrice && (
            <div className="absolute top-3 right-3 bg-[#FF5F1F] text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
              <HiTag className="text-sm" />
              <span className="text-xs font-bold">{discount}% OFF</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <p className="text-sm text-[#FF5F1F] mb-1 font-medium">{book.category}</p>
          <h3 className="font-bold text-white mb-1 line-clamp-1 group-hover:text-[#FF5F1F] transition-colors">
            {book.title}
          </h3>
          <p className="text-sm text-zinc-400 mb-3">{book.author}</p>
          
          <div className="flex items-center gap-1 mb-4">
            <HiStar className="text-yellow-500 text-sm" />
            <span className="text-sm font-medium text-white">{book.rating}</span>
            <span className="text-sm text-zinc-500">({book.reviews})</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-white">
                ${book.price}
              </span>
              {book.originalPrice && (
                <span className="text-sm text-zinc-500 line-through ml-2">
                  ${book.originalPrice}
                </span>
              )}
            </div>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="bg-[#FF5F1F] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#ff4d0a] transition-colors shadow-lg shadow-orange-900/20"
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
