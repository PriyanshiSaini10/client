import { useState } from 'react';
import { motion } from 'framer-motion';
import {HiOutlineUser,HiOutlinePencilAlt,HiOutlineMail,HiOutlineKey,HiOutlinePhotograph,HiOutlineTrash} from 'react-icons/hi';

import Profile from './MyProfile';
import ChangeInfo from './ChangeInfo';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import ChangeImg from './ChangeImg';
import Delete from './Delete';

export default function HomeDashboard() {
  const [activeComponent, setActiveComponent] = useState("profile");

  const menuItems = [
    { id: "profile", label: "Profile", icon: <HiOutlineUser size={20} />, component: <Profile /> },
    { id: "changeInfo", label: "Change Info", icon: <HiOutlinePencilAlt size={20} />, component: <ChangeInfo /> },
    { id: "changeEmail", label: "Change Email", icon: <HiOutlineMail size={20} />, component: <ChangeEmail /> },
    { id: "changePassword", label: "Change Password", icon: <HiOutlineKey size={20} />, component: <ChangePassword /> },
    { id: "changeImg", label: "Change Image", icon: <HiOutlinePhotograph size={20} />, component: <ChangeImg /> },
    { id: "delete", label: "Delete Account", icon: <HiOutlineTrash size={20} />, component: <Delete />, isDanger: true },
  ];

  const activeItem = menuItems.find((item) => item.id === activeComponent);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#121212] text-white flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#121212] border-r border-zinc-800 p-4 shrink-0">
        <div className="mb-6 px-3 py-2 border-b border-zinc-800">
          <h2 className="text-xl font-black tracking-tight text-white">
            User <span className="text-[#FF5F1F]">Dashboard</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1">Manage your account settings</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = activeComponent === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveComponent(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-bold transition-colors ${
                  isActive
                    ? "bg-[#FF5F1F] text-white shadow-lg shadow-orange-900/20"
                    : item.isDanger
                    ? "text-red-500 hover:bg-red-500/10 hover:text-red-400"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </motion.button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content View */}
      <main className="flex-1 p-6 md:p-10 bg-[#121212] overflow-y-auto">
        <div className="max-w-3xl mx-auto bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-xl">
          {activeItem?.component}
        </div>
      </main>

    </div>
  );
}