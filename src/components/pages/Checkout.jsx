import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiCreditCard, HiLockClosed } from 'react-icons/hi';
import { useCart } from '../context/CartContext.jsx';
import { toast } from 'sonner';

export default function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    clearCart();
    toast.success('Order placed successfully!');
    navigate('/');
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-black text-white mb-8">
          Check<span className="text-[#FF5F1F]">out</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Information */}
              <div className="bg-[#1a1a1a] rounded-xl p-6 border border-zinc-800">
                <h2 className="text-2xl font-black text-white mb-6">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FF5F1F] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FF5F1F] transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FF5F1F] transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FF5F1F] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FF5F1F] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FF5F1F] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FF5F1F] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      defaultValue="United States"
                      required
                      className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FF5F1F] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-[#1a1a1a] rounded-xl p-6 border border-zinc-800">
                <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
                  <HiCreditCard className="text-[#FF5F1F]" />
                  Payment Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      required
                      className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FF5F1F] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                      className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FF5F1F] transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        required
                        className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FF5F1F] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        maxLength={4}
                        required
                        className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FF5F1F] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-[#FF5F1F]/10 rounded-lg flex items-start gap-3 border border-[#FF5F1F]/20">
                  <HiLockClosed className="text-[#FF5F1F] text-xl flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-zinc-300">
                    Your payment information is encrypted and secure. We never store your card details.
                  </p>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#FF5F1F] hover:bg-[#ff4d0a] text-white py-4 rounded-xl font-black text-lg shadow-lg shadow-orange-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
              </motion.button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a1a1a] rounded-xl p-6 border border-zinc-800 sticky top-8">
              <h2 className="text-2xl font-black text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 text-sm">
                    <div className="w-12 h-16 rounded-lg bg-zinc-900 flex-shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white line-clamp-1">{item.title}</p>
                      <p className="text-zinc-400">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-800 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Subtotal</span>
                  <span className="font-bold text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Shipping</span>
                  <span className="font-bold">
                    {shipping === 0 ? (
                      <span className="text-green-500">FREE</span>
                    ) : (
                      <span className="text-white">${shipping.toFixed(2)}</span>
                    )}
                  </span>
                </div>
                <div className="border-t border-zinc-800 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">Total</span>
                    <span className="text-3xl font-black text-white">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
