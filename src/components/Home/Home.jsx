import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { HiArrowRight, HiTruck, HiRefresh, HiShieldCheck, HiStar, HiBookOpen, HiUserGroup, HiSparkles, HiOutlineShoppingBag } from 'react-icons/hi';

export default function Home() {
  const categories = [
    { name: 'Fantasy', image: 'https://wp.penguin.co.uk/wp-content/uploads/2023/07/Article-Card-Fantasy-books-9-12-2023-Update.jpg', count: '2,450+' },
    { name: 'Mystery', image: 'https://s2982.pcdn.co/wp-content/uploads/2023/10/20-must-read-Mystery-recs-by-authors.jpg.optimal.jpg', count: '1,200+' },
    { name: 'Sci-Fi', image: 'https://images.gr-assets.com/misc/1687810621-1687810621_goodreads_misc.png', count: '890+' },
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
      image: "https://dnm.nflximg.net/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABeND-MQMp25sXQN9EaJdnX5-gBStHeYWptL5A0WEE53PWNCHgeU-iChVgEpfX1CSJJ90_2EdreqKyAFGEhS1WtDtJOCGg97kXHtY.jpg?r=43a"
    },
    {
      id: 2,
      title: "The Fragrant Flower Blooms with Dignity",
      author: "Saka Mikami",
      price: "12.99",
      rating: 5,
      image: "https://a.storyblok.com/f/178900/700x990/0ab04fa622/the-fragrant-flower-blooms-with-dignity-second-key-visual.jpg/m/filters:quality(95)format(webp)"
    },
    {
      id: 3,
      title: "A Star Brighter Than The Sun",
      author: "Mizuho Kusanagi",
      price: "14.50",
      rating: 4,
      image: "https://m.media-amazon.com/images/I/71QvRr3g59L._AC_UF1000,1000_QL80_.jpg"
    },
    {
      id: 4,
      title: "The Name of the Wind",
      author: "Patrick Rothfuss",
      price: "15.99",
      rating: 4.9,
      image: "https://m.media-amazon.com/images/I/71nVnnERNsL._UF1000,1000_QL80_.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Hero Section with Image */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/95 to-[#121212]/80 z-10" />
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1763368230669-3a2e97368032?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMHJlYWRpbmclMjBjb3p5JTIwbGlicmFyeXxlbnwxfHx8fDE3NzE5ODYzNzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Cozy library with books"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-6 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-[#FF5F1F]/10 border border-[#FF5F1F]/20 rounded-full px-4 py-2 mb-6">
                <HiSparkles className="text-[#FF5F1F]" />
                <span className="text-[#FF5F1F] text-sm font-bold">New Arrivals Weekly</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                Discover Your Next
                <span className="text-[#FF5F1F]"> Great Read</span>
              </h1>
              <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                Explore thousands of books across all genres. From bestsellers to hidden gems, find your perfect book today.
              </p>
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
                <Link to="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#1a1a1a] border border-zinc-700 text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-[#252525] transition-colors"
                  >
                    Learn More
                  </motion.button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative max-w-md ml-auto">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#FF5F1F] to-[#ff4d0a] rounded-2xl blur-2xl opacity-20" />
                <img
                  src="https://img.freepik.com/free-photo/anime-style-cozy-home-interior-with-furnishings_23-2151176471.jpg"
                  alt="Person reading book with coffee"
                  className="relative rounded-2xl shadow-2xl border border-zinc-800 w-full h-80 object-cover max-h-[400px]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="bg-[#1a1a1a] border-y border-zinc-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-black text-[#FF5F1F] mb-2">{stat.number}</div>
                <div className="text-zinc-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Trending Books Section */}
      <section className="py-20 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black text-white mb-2">
                Trending <span className="text-[#FF5F1F]">Now</span>
              </h2>
              <p className="text-zinc-400">The most talked-about reads this week.</p>
            </div>
            <Link to="/collections" className="text-[#FF5F1F] font-bold hover:underline mb-2">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingBooks.map((book) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-[#1a1a1a] rounded-2xl p-4 border border-zinc-800 group"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-4">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <button className="absolute bottom-4 right-4 bg-[#FF5F1F] text-white p-3 rounded-full shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <HiOutlineShoppingBag size={20} />
                  </button>
                </div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <HiStar key={i} className={i < book.rating ? "text-[#FF5F1F]" : "text-zinc-700"} size={14} />
                  ))}
                </div>
                <h3 className="text-white font-bold text-lg mb-1 truncate">{book.title}</h3>
                <p className="text-zinc-500 text-sm mb-3">{book.author}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-black text-white">${book.price}</span>
                  <span className="text-xs font-bold text-[#FF5F1F] bg-[#FF5F1F]/10 px-2 py-1 rounded">Best Seller</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-white mb-4">
              Why Choose <span className="text-[#FF5F1F]">LibroCart?</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              We're committed to providing the best book shopping experience
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="bg-[#1a1a1a] rounded-2xl p-8 border border-zinc-800"
            >
              <div className="bg-[#FF5F1F]/10 w-16 h-16 rounded-xl flex items-center justify-center border border-[#FF5F1F]/20 mb-6">
                <HiTruck className="text-[#FF5F1F] text-3xl" />
              </div>
              <h3 className="font-bold text-white text-xl mb-3">Free Shipping</h3>
              <p className="text-zinc-400 leading-relaxed">On orders over $50. Fast and reliable delivery to your doorstep.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-[#1a1a1a] rounded-2xl p-8 border border-zinc-800"
            >
              <div className="bg-[#FF5F1F]/10 w-16 h-16 rounded-xl flex items-center justify-center border border-[#FF5F1F]/20 mb-6">
                <HiRefresh className="text-[#FF5F1F] text-3xl" />
              </div>
              <h3 className="font-bold text-white text-xl mb-3">Easy Returns</h3>
              <p className="text-zinc-400 leading-relaxed">30-day return policy. Not satisfied? Send it back hassle-free.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="bg-[#1a1a1a] rounded-2xl p-8 border border-zinc-800"
            >
              <div className="bg-[#FF5F1F]/10 w-16 h-16 rounded-xl flex items-center justify-center border border-[#FF5F1F]/20 mb-6">
                <HiShieldCheck className="text-[#FF5F1F] text-3xl" />
              </div>
              <h3 className="font-bold text-white text-xl mb-3">Secure Payment</h3>
              <p className="text-zinc-400 leading-relaxed">100% secure transactions. Your data is safe with us.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-white mb-4">
              Explore by <span className="text-[#FF5F1F]">Category</span>
            </h2>
            <p className="text-xl text-zinc-400">
              Find your favorite genre and start reading
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Link to="/collections" className="block group">
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

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-white mb-4">
              What Our <span className="text-[#FF5F1F]">Readers Say</span>
            </h2>
            <p className="text-xl text-zinc-400">
              Join thousands of satisfied book lovers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1a1a1a] rounded-2xl p-8 border border-zinc-800"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <HiStar key={i} className="text-[#FF5F1F] text-xl" />
                  ))}
                </div>
                <p className="text-zinc-300 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="bg-[#FF5F1F] w-12 h-12 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-bold">{testimonial.name}</p>
                    <p className="text-zinc-500 text-sm">Verified Buyer</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Blocks */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#FF5F1F] to-[#ff4d0a] rounded-2xl p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
              <HiBookOpen className="text-white text-5xl mb-6 relative z-10" />
              <h3 className="text-3xl font-black text-white mb-4 relative z-10">
                Curated Collections
              </h3>
              <p className="text-white/90 text-lg mb-6 relative z-10 leading-relaxed">
                Hand-picked selections by our expert team. Discover themed collections and staff recommendations.
              </p>
              <Link to="/collections">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#FF5F1F] px-6 py-3 rounded-xl font-bold hover:bg-zinc-100 transition-colors relative z-10"
                >
                  Explore Now
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#1a1a1a] border border-zinc-800 rounded-2xl p-12 relative overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF5F1F]/5 rounded-full -ml-32 -mb-32" />
              <HiUserGroup className="text-[#FF5F1F] text-5xl mb-6 relative z-10" />
              <h3 className="text-3xl font-black text-white mb-4 relative z-10">
                Join Our Community
              </h3>
              <p className="text-zinc-400 text-lg mb-6 relative z-10 leading-relaxed">
                Connect with fellow readers, share reviews, and get personalized recommendations from our community.
              </p>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#FF5F1F] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#ff4d0a] transition-colors relative z-10"
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#FF5F1F] to-[#ff4d0a] rounded-2xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
            <div className="relative">
              <HiStar className="text-white text-5xl mx-auto mb-4" />
              <h2 className="text-4xl font-black text-white mb-4">
                Join Our Book Club
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Subscribe to receive exclusive offers, book recommendations, and early access to new releases.
              </p>
              <div className="max-w-md mx-auto flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#121212] text-white px-8 py-4 rounded-xl font-bold hover:bg-zinc-900 transition-colors"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}