import { useAuth } from '../../context/AllContext.jsx';
import { HiOutlineMail, HiOutlineUser, HiOutlineCheckCircle, HiOutlineBookOpen } from 'react-icons/hi';

export default function MyProfile() {
  const { user } = useAuth() || {};

  const name = user?.name || user?.fullName || "Priyanshi Saini";
  const email = user?.email || "priyanshisaini436@gmail.com";
  const bio = user?.bio;
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="space-y-6 text-white font-sans">
      
      {/* User Profile Card */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-black border border-zinc-800 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF5F1F]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          {user?.avatar || user?.profileImg ? (
            <img
              src={user.avatar || user.profileImg}
              alt="Profile Avatar"
              className="w-24 h-24 rounded-full object-cover border-2 border-[#FF5F1F] shadow-lg shadow-orange-950/40"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-[#FF5F1F] text-white flex items-center justify-center font-black text-3xl shadow-xl shadow-orange-950/40 border-2 border-orange-400/20">
              {initial}
            </div>
          )}

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h1 className="text-2xl font-black tracking-tight text-white">{name}</h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#FF5F1F]/10 text-[#FF5F1F] border border-[#FF5F1F]/20 px-2.5 py-0.5 rounded-full">
                <HiOutlineCheckCircle /> Active Reader
              </span>
            </div>

            <p className="text-xs text-zinc-400 flex items-center justify-center sm:justify-start gap-2">
              <HiOutlineMail className="text-[#FF5F1F]" /> {email}
            </p>

            {/* Book-related Bio */}
            <p className="text-xs text-zinc-300 italic pt-1 border-t border-zinc-800/80 max-w-lg">
              {bio}
            </p>
          </div>
        </div>
      </div>

      {/* Account Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-zinc-900/50 border border-zinc-800/80 p-5 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-[#FF5F1F] font-bold text-xs uppercase tracking-wider">
            <HiOutlineUser size={16} /> User Details
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-zinc-800/60">
              <span className="text-zinc-500">Name</span>
              <span className="font-medium text-zinc-200">{name}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-zinc-500">Email</span>
              <span className="font-medium text-zinc-200">{email}</span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800/80 p-5 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-[#FF5F1F] font-bold text-xs uppercase tracking-wider">
            <HiOutlineBookOpen size={16} /> Reader Profile
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-zinc-800/60">
              <span className="text-zinc-500">Member Status</span>
              <span className="font-medium text-orange-400">Book Lover</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-zinc-500">Account Status</span>
              <span className="font-medium text-emerald-400">Verified</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}