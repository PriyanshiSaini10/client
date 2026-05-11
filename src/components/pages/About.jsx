import { motion } from 'framer-motion';
import { HiOutlineUserGroup, HiOutlineLightBulb, HiOutlineHeart } from 'react-icons/hi';

export default function About() {
  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-black text-white mb-4">
            About <span className="text-[#FF5F1F]">LibroCart</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Your trusted destination for discovering and purchasing books from around the world.
          </p>
        </motion.div>

        {/* Mission */}
        <div className="bg-[#1a1a1a] rounded-2xl p-8 mb-8 border border-zinc-800">
          <h2 className="text-3xl font-black text-white mb-4">Our Mission</h2>
          <p className="text-zinc-300 text-lg leading-relaxed">
            At LibroCart, we believe that every book has the power to change lives. Our mission is to make 
            quality literature accessible to everyone, connecting readers with their next favorite story. 
            Whether you're looking for the latest bestseller or a timeless classic, we're here to help you 
            discover books that inspire, educate, and entertain.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#1a1a1a] rounded-xl p-6 border border-zinc-800"
          >
            <div className="bg-[#FF5F1F]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 border border-[#FF5F1F]/20">
              <HiOutlineUserGroup className="text-[#FF5F1F] text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Community First</h3>
            <p className="text-zinc-400">
              We're building a community of passionate readers who share their love for books.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#1a1a1a] rounded-xl p-6 border border-zinc-800"
          >
            <div className="bg-[#FF5F1F]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 border border-[#FF5F1F]/20">
              <HiOutlineLightBulb className="text-[#FF5F1F] text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Quality Selection</h3>
            <p className="text-zinc-400">
              Carefully curated collections spanning all genres and interests.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#1a1a1a] rounded-xl p-6 border border-zinc-800"
          >
            <div className="bg-[#FF5F1F]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 border border-[#FF5F1F]/20">
              <HiOutlineHeart className="text-[#FF5F1F] text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Customer Care</h3>
            <p className="text-zinc-400">
              Dedicated support to ensure you have the best shopping experience.
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-br from-[#FF5F1F] to-[#ff4d0a] rounded-2xl p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-white mb-2">10K+</div>
              <div className="text-white/80">Books Available</div>
            </div>
            <div>
              <div className="text-4xl font-black text-white mb-2">50K+</div>
              <div className="text-white/80">Happy Readers</div>
            </div>
            <div>
              <div className="text-4xl font-black text-white mb-2">4.9★</div>
              <div className="text-white/80">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-black text-white mb-2">24/7</div>
              <div className="text-white/80">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
