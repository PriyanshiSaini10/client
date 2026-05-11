import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiShoppingBag, HiMinus, HiPlus, HiTrash } from 'react-icons/hi';
import { useCart } from '../context/CartContext.jsx';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#121212]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-[#1a1a1a] rounded-2xl p-12 border border-zinc-800">
              <HiShoppingBag className="h-24 w-24 text-zinc-700 mx-auto mb-6" />
              <h1 className="text-3xl font-black text-white mb-3">
                Your cart is empty
              </h1>
              <p className="text-zinc-400 mb-8">
                Add some books to get started!
              </p>
              <Link to="/collections">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#FF5F1F] text-white px-8 py-4 rounded-xl font-black shadow-lg shadow-orange-900/20"
                >
                  Browse Books
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-black text-white mb-8">
          Shopping <span className="text-[#FF5F1F]">Cart</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-[#1a1a1a] rounded-xl p-4 border border-zinc-800"
              >
                <div className="flex gap-4">
                  <Link to={`/book/${item.id}`} className="flex-shrink-0">
                    <div className="w-24 h-32 rounded-lg overflow-hidden bg-zinc-900">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link to={`/book/${item.id}`}>
                      <h3 className="font-bold text-white hover:text-[#FF5F1F] line-clamp-1 transition-colors">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-zinc-400 mb-1">{item.author}</p>
                    <p className="text-xs text-zinc-500 mb-3">{item.category}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-lg transition-colors"
                        >
                          <HiMinus className="text-sm" />
                        </motion.button>
                        <span className="w-12 text-center font-bold text-white">
                          {item.quantity}
                        </span>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-lg transition-colors"
                        >
                          <HiPlus className="text-sm" />
                        </motion.button>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          {item.originalPrice && (
                            <p className="text-xs text-zinc-500 line-through">
                              ${(item.originalPrice * item.quantity).toFixed(2)}
                            </p>
                          )}
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-400 p-2 transition-colors"
                        >
                          <HiTrash className="text-lg" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a1a1a] rounded-xl p-6 border border-zinc-800 sticky top-8">
              <h2 className="text-2xl font-black text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Subtotal</span>
                  <span className="font-bold text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Shipping</span>
                  <span className="font-bold">
                    {shipping === 0 ? (
                      <span className="text-green-500">FREE</span>
                    ) : (
                      <span className="text-white">${shipping.toFixed(2)}</span>
                    )}
                  </span>
                </div>
                {subtotal < 50 && (
                  <p className="text-sm text-zinc-500 bg-zinc-900 p-3 rounded-lg">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
                <div className="border-t border-zinc-800 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-white">Total</span>
                    <span className="text-3xl font-black text-white">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/checkout')}
                className="w-full bg-[#FF5F1F] hover:bg-[#ff4d0a] text-white py-4 rounded-xl font-black mb-3 shadow-lg shadow-orange-900/20 transition-colors"
              >
                Proceed to Checkout
              </motion.button>

              <Link to="/collections">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl font-bold transition-colors border border-zinc-700"
                >
                  Continue Shopping
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
