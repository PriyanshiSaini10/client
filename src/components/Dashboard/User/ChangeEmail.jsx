import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AllContext.jsx';
import { LocalUrl } from '../../../GlobalUrl.jsx';
import { showSuccessToast, showErrorToast } from '../../Notification/ToastNotification.jsx';

export default function ChangeEmail() {
  const { user, updateUser, userToken } = useAuth() || {};

  const userId = user?.id || localStorage.getItem('userId');
  const token = userToken || localStorage.getItem('userToken');

  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newEmail !== confirmEmail) {
      showErrorToast("New email address and confirmation email do not match!");
      return;
    }

    if (!userId || !token) {
      showErrorToast("User session expired. Please log in again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.put(
        `${LocalUrl}update_user_email/${userId}`,
        { newEmail },
        {
          headers: {
            'x-api-key': token,
          },
        }
      );

      if (response.data?.status || response.status === 200) {
        showSuccessToast(response.data?.msg || "Email updated successfully!");
        
        // Update user context state & localStorage
        if (updateUser) {
          updateUser({ email: response.data.updatedUser?.email || newEmail });
        }

        setNewEmail('');
        setConfirmEmail('');
      }
    } catch (error) {
      showErrorToast(error?.response?.data?.msg || "Failed to update email address");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 text-white font-sans">
      <div className="border-b border-zinc-800 pb-3">
        <h2 className="text-xl font-black text-white tracking-wide">Change Email Address</h2>
        <p className="text-xs text-zinc-400 mt-1">Update your primary account email address</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-zinc-300 mb-2">Current Email</label>
          <input
            type="email"
            value={user?.email || localStorage.getItem('email') || ''}
            disabled
            className="w-full bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-500 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-300 mb-2">New Email Address</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF5F1F] transition-all"
            placeholder="Enter new email address"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-300 mb-2">Confirm New Email</label>
          <input
            type="email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            className="w-full bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF5F1F] transition-all"
            placeholder="Re-enter new email address"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#FF5F1F] hover:bg-orange-600 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-lg shadow-orange-950/30 disabled:opacity-50"
        >
          {isSubmitting ? "Updating..." : "Update Email"}
        </button>
      </form>
    </div>
  );
}