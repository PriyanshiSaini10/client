import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiStar, HiShoppingCart } from "react-icons/hi";
import { useCart } from "./context/CartContext.jsx";
import { toast } from "sonner";

export function BookCard({ book }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book);
    toast.success(`Added "${book.title}" to cart`);
  };

  const discount = book.originalPrice
    ? Math.round(
        ((book.originalPrice - book.price) / book.originalPrice) * 100
      )
    : 0;

  return (
    <Link to={`/book/${book.id}`} className="block h-full">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col h-[410px] bg-[#1a1a1a] rounded-xl overflow-hidden border border-zinc-800 hover:border-[#FF5F1F] shadow-lg hover:shadow-orange-900/20 transition-all"
      >
        <div className="relative h-56 bg-[#151515] p-2 flex items-center justify-center overflow-hidden">
          <img
            src={book.image}
            alt={book.title}
            className="max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-105"
          />
          {book.originalPrice && (
            <div className="absolute top-2 right-2 bg-[#FF5F1F] text-white px-2 py-0.5 rounded text-[10px] font-bold z-10">
              {discount}% OFF
            </div>
          )}
        </div>

        {/* Compact Content Section */}
        <div className="flex flex-col flex-1 p-4 justify-between">
          <div>
            <p className="text-[10px] text-[#FF5F1F] font-semibold uppercase tracking-wider mb-0.5">
              {book.category}
            </p>

            <h3 className="text-white font-medium text-sm line-clamp-2 hover:text-[#FF5F1F] transition-colors leading-snug">
              {book.title}
            </h3>

            <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">
              {book.author}
            </p>

            <div className="flex items-center gap-1 mt-1">
              <HiStar className="text-yellow-500 text-xs" />
              <span className="text-white text-xs">{book.rating}</span>
              <span className="text-zinc-500 text-[10px]">({book.reviews})</span>
            </div>
          </div>

          {/* Compact Bottom Section */}
          <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between mt-2">
            <div className="flex flex-col justify-center">
              <span className="text-base font-bold text-white leading-none">
                ${book.price}
              </span>
              {book.originalPrice && (
                <span className="text-[10px] text-zinc-500 line-through mt-0.5 leading-none">
                  ${book.originalPrice}
                </span>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="flex items-center gap-1 bg-[#FF5F1F] hover:bg-[#ff4d0a] text-white px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors"
            >
              <HiShoppingCart size={13} />
              <span>Add to Cart</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}