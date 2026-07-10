import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker, HiClock } from 'react-icons/hi';
import { toast } from 'sonner';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
            Get In <span className="text-[#FF5F1F]">Touch</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#1a1a1a] rounded-xl p-6 border border-zinc-800"
          >
            <div className="bg-[#FF5F1F]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 border border-[#FF5F1F]/20">
              <HiMail className="text-[#FF5F1F] text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Email Us</h3>
            <p className="text-zinc-400 mb-2">Send us an email anytime</p>
            <a href="mailto:support@librocart.com" className="text-[#FF5F1F] hover:underline">
              librocart987@gmail.com
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1a1a1a] rounded-xl p-6 border border-zinc-800"
          >
            <div className="bg-[#FF5F1F]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 border border-[#FF5F1F]/20">
              <HiPhone className="text-[#FF5F1F] text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Call Us</h3>
            <p className="text-zinc-400 mb-2">Mon-Fri from 8am to 6pm</p>
            <a href="tel:+1234567890" className="text-[#FF5F1F] hover:underline">
              +91 96754 26548
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1a1a1a] rounded-xl p-6 border border-zinc-800"
          >
            <div className="bg-[#FF5F1F]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 border border-[#FF5F1F]/20">
              <HiLocationMarker className="text-[#FF5F1F] text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Visit Us</h3>
            <p className="text-zinc-400 mb-2">Come say hello</p>
            <p className="text-white">123 Book Street, Kaithal, India</p>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-zinc-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#FF5F1F]/10 w-10 h-10 rounded-lg flex items-center justify-center border border-[#FF5F1F]/20">
                <HiMail className="text-[#FF5F1F] text-xl" />
              </div>
              <h2 className="text-2xl font-black text-white">Send us a message</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-white mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#121212] border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-white mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#121212] border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] focus:border-transparent"
                    placeholder="Enter email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-bold text-white mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#121212] border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] focus:border-transparent"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-[#121212] border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] focus:border-transparent resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-[#FF5F1F] text-white px-8 py-4 rounded-xl font-black text-lg hover:bg-[#ff4d0a] transition-colors shadow-lg shadow-orange-900/20"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Business Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-3xl mx-auto mt-8"
        >
          <div className="bg-gradient-to-br from-[#FF5F1F] to-[#ff4d0a] rounded-xl p-6 text-center">
            <HiClock className="text-white text-3xl mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">Business Hours</h3>
            <div className="text-white/90">
              <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
