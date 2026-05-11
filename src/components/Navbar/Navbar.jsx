import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineHome, HiOutlineInformationCircle, HiOutlineCollection, HiOutlineMail, HiMenu, HiX, HiOutlineBookOpen } from 'react-icons/hi';
import Profile from './Profile.jsx';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AllContext.jsx';

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const MenuData = [
    { name: "Home", icons: <HiOutlineHome />, link: "/" },
    { name: "About", icons: <HiOutlineInformationCircle />, link: "/about" },
    { name: "Collections", icons: <HiOutlineCollection />, link: "/collections" },
    { name: "Contact Us", icons: <HiOutlineMail />, link: "/contact-us" },
  ];

  const Auth = [
    { name: "LogIn", link: "/user-login", css: "text-zinc-300 hover:text-white font-bold" },
    { name: "SignUp", link: "/create-account", css: "bg-[#FF5F1F] text-white px-5 py-2 rounded-lg font-bold shadow-lg shadow-orange-900/20" },
  ];

  return (
    <nav className="bg-[#121212] border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ rotate: 10 }}
            className="bg-[#FF5F1F] p-2 rounded-lg text-white"
          >
            <HiOutlineBookOpen size={24} />
          </motion.div>
          <h1 className="text-2xl font-black text-white tracking-tighter">
            Libro<span className="text-[#FF5F1F]">Cart</span>
          </h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-35">
          <ul className="flex items-center gap-6">
            {MenuData.map(({ name, icons, link }, index) => (
              <motion.li key={index} whileHover={{ y: -2 }}>
                <Link 
                  to={link} 
                  className="flex items-center gap-2 text-zinc-400 hover:text-[#FF5F1F] transition-colors font-medium"
                >
                  <span className="text-xl">{icons}</span>
                  {name}
                </Link>
              </motion.li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            {Auth.map(({ name, link, css }, index) => (
              <Link to={link} key={index}>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className={css}
                >
                  {name}
                </motion.button>
              </Link>
            ))}
            <Profile />
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <Profile />
          <button 
            onClick={() => setShowMenu(!showMenu)} 
            className="text-[#FF5F1F] text-3xl"
          >
            {showMenu ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Animation */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#121212] border-t border-zinc-800 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-5">
              {MenuData.map(({ name, icons, link }, index) => (
                <Link 
                  key={index} 
                  to={link} 
                  onClick={() => setShowMenu(false)}
                  className="flex items-center gap-4 text-zinc-300 text-lg font-bold"
                >
                  <span className="text-[#FF5F1F] text-2xl">{icons}</span>
                  {name}
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-4 mt-4">
                {Auth.map(({ name, link, css }, index) => (
                  <Link to={link} key={index} onClick={() => setShowMenu(false)}>
                    <button className={`${css} w-full py-3 text-center rounded-xl`}>
                      {name}
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}