import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { CgProfile, CgLogOut, CgHeart, CgShoppingCart } from "react-icons/cg";
import { SiGmail } from "react-icons/si";
import { FiSettings } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AllContext';

export default function Profile() {
    const { setLogin, profile } = useAuth() || {};

    const name = localStorage.getItem("name") || profile?.name || "Guest User";
    const email = localStorage.getItem("email") || profile?.email || "guest@librocart.com";
    
    const firstLetter = name.trim().charAt(0).toUpperCase();

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userToken");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        if (setLogin) setLogin(false);
        
        window.location.reload(); 
    };

    const menuLinks = [
        { name: "My Profile", href: "/profile", icon: CgProfile },
        { name: "My Cart", href: "/cart", icon: CgShoppingCart },
        { name: "Wishlist", href: "/wishlist", icon: CgHeart },
        { name: "Settings", href: "/dashBoard", icon: FiSettings },
        { name: "Sign out", href: '#', icon: CgLogOut, action: handleLogout },
    ]

    return (
        <div>
            <Menu as="div" className="relative ml-3">
                <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5F1F] hover:ring-2 hover:ring-[#FF5F1F]/50 transition-all">
                    {profile?.profileImg ? (
                        <img
                            alt="Profile"
                            src={profile.profileImg}
                            className="size-10 rounded-full bg-gray-800 ring-2 ring-[#FF5F1F]/30 hover:ring-[#FF5F1F]/70 transition-all duration-300 object-cover"
                        />
                    ) : (
                        <div className="size-10 rounded-full bg-[#FF5F1F] text-white flex items-center justify-center font-bold text-lg ring-2 ring-[#FF5F1F]/30 hover:ring-[#FF5F1F]/70 transition-all duration-300 shadow-md">
                            {firstLetter}
                        </div>
                    )}       
                </MenuButton>

                <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-3 w-64 origin-top-right rounded-xl bg-white dark:bg-[#1a1a1a] py-2 shadow-2xl border border-gray-200 dark:border-zinc-800 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-zinc-800">
                        <div className='flex gap-3 items-center mb-2'>
                            <div className="p-2 rounded-lg bg-orange-50 dark:bg-[#FF5F1F]/10">
                                <CgProfile className="text-[#FF5F1F] text-lg" />
                            </div>
                            <div className="overflow-hidden">
                                <h1 className="font-semibold text-gray-900 dark:text-white truncate">{name}</h1>
                            </div>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/10">
                                <SiGmail className="text-blue-600 dark:text-blue-400 text-lg" />
                            </div>
                            <div className="overflow-hidden">
                                <h1 className="text-xs text-gray-700 dark:text-zinc-300 truncate">{email}</h1>
                            </div>
                        </div>
                    </div>

                    <div className="py-1">
                        {menuLinks.map((item, index) => (
                            <MenuItem key={index}>
                                {({ active }) => (
                                    item.action ? (
                                        <button
                                            onClick={item.action}
                                            className={`flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors ${active
                                                ? 'bg-orange-50 dark:bg-zinc-800 text-[#FF5F1F]'
                                                : 'text-gray-700 dark:text-zinc-300'
                                                } ${item.name === "Sign out" ? 'text-red-500 dark:text-red-400' : ''}`}
                                        >
                                            <item.icon className="text-lg" />
                                            <span className="font-medium">{item.name}</span>
                                        </button>
                                    ) : (
                                        <Link
                                            to={item.href}
                                            className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${active
                                                ? 'bg-orange-50 dark:bg-zinc-800 text-[#FF5F1F]'
                                                : 'text-gray-700 dark:text-zinc-300'
                                                }`}
                                        >
                                            <item.icon className="text-lg" />
                                            <span className="font-medium">{item.name}</span>
                                        </Link>
                                    )
                                )}
                            </MenuItem>
                        ))}
                    </div>
                </MenuItems>
            </Menu>
        </div>
    )
}