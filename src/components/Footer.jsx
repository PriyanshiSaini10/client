import { Link } from 'react-router';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#FF5F1F] w-8 h-8 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-lg">L</span>
              </div>
              <h3 className="text-xl font-black text-white">LibroCart</h3>
            </div>
            <p className="text-zinc-400 text-sm mb-4">
              Your trusted destination for discovering and purchasing books from around the world.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a1a1a] w-10 h-10 rounded-lg flex items-center justify-center border border-zinc-800 hover:border-[#FF5F1F] hover:bg-[#FF5F1F]/10 transition-colors"
              >
                <FaFacebook className="text-zinc-400 hover:text-[#FF5F1F] transition-colors" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a1a1a] w-10 h-10 rounded-lg flex items-center justify-center border border-zinc-800 hover:border-[#FF5F1F] hover:bg-[#FF5F1F]/10 transition-colors"
              >
                <FaTwitter className="text-zinc-400 hover:text-[#FF5F1F] transition-colors" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a1a1a] w-10 h-10 rounded-lg flex items-center justify-center border border-zinc-800 hover:border-[#FF5F1F] hover:bg-[#FF5F1F]/10 transition-colors"
              >
                <FaInstagram className="text-zinc-400 hover:text-[#FF5F1F] transition-colors" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a1a1a] w-10 h-10 rounded-lg flex items-center justify-center border border-zinc-800 hover:border-[#FF5F1F] hover:bg-[#FF5F1F]/10 transition-colors"
              >
                <FaLinkedin className="text-zinc-400 hover:text-[#FF5F1F] transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-zinc-400 hover:text-[#FF5F1F] transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-zinc-400 hover:text-[#FF5F1F] transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-zinc-400 hover:text-[#FF5F1F] transition-colors text-sm">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-zinc-400 hover:text-[#FF5F1F] transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-zinc-400 hover:text-[#FF5F1F] transition-colors text-sm">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-white mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-zinc-400 hover:text-[#FF5F1F] transition-colors text-sm">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-[#FF5F1F] transition-colors text-sm">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-[#FF5F1F] transition-colors text-sm">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-[#FF5F1F] transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-[#FF5F1F] transition-colors text-sm">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-white mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <HiLocationMarker className="text-[#FF5F1F] text-lg mt-0.5 flex-shrink-0" />
                <span className="text-zinc-400 text-sm">
                  123 Book Street<br />New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <HiPhone className="text-[#FF5F1F] text-lg flex-shrink-0" />
                <a href="tel:+1234567890" className="text-zinc-400 hover:text-[#FF5F1F] transition-colors text-sm">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <HiMail className="text-[#FF5F1F] text-lg flex-shrink-0" />
                <a href="mailto:support@librocart.com" className="text-zinc-400 hover:text-[#FF5F1F] transition-colors text-sm">
                  support@librocart.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-zinc-800 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-white mb-1">Subscribe to our Newsletter</h4>
              <p className="text-zinc-400 text-sm">Get the latest updates on new releases and special offers.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 bg-[#121212] border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] focus:border-transparent text-sm"
              />
              <button className="bg-[#FF5F1F] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#ff4d0a] transition-colors whitespace-nowrap text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-zinc-400 text-sm text-center md:text-left">
              © {currentYear} LibroCart. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-zinc-400 hover:text-[#FF5F1F] transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-zinc-400 hover:text-[#FF5F1F] transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-zinc-400 hover:text-[#FF5F1F] transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
