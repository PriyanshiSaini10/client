import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AllContext.jsx';
import { LocalUrl } from '../../../GlobalUrl.jsx';
import { showSuccessToast, showErrorToast } from '../../Notification/ToastNotification.jsx';

export default function ChangeInfo() {
  const { user, updateUser, userToken } = useAuth() || {};

  const userId = user?.id || localStorage.getItem('userId');
  const token = userToken || localStorage.getItem('userToken');

  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setBio(user.bio || '');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !token) {
      showErrorToast("User authentication missing! Please log in again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.put(
        `${LocalUrl}change_info/${userId}`,
        { name, bio },
        {
          headers: {
            'x-api-key': token,
          },
        }
      );

      if (response.data?.status || response.status === 200) {
        showSuccessToast(response.data?.msg || "Profile updated!");
        
        // Context/LocalStorage State Update
        if (updateUser) {
          updateUser({ 
            name: response.data.updatedUser.name, 
            bio: response.data.updatedUser.bio 
          });
        }
      }
    } catch (error) {
      showErrorToast(error?.response?.data?.msg || "Update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 text-white font-sans">
      <div className="border-b border-zinc-800 pb-3">
        <h2 className="text-xl font-black text-white tracking-wide">Edit Info</h2>
        <p className="text-xs text-zinc-400 mt-1">Update display name and book reader bio</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-zinc-300 mb-2">Display Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF5F1F]"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-300 mb-2">Book Reader Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="3"
            maxLength="160"
            className="w-full bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF5F1F] resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#FF5F1F] hover:bg-orange-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition-all disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}