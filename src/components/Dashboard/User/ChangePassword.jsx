import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AllContext.jsx';
import { LocalUrl } from '../../../GlobalUrl.jsx';
import { showSuccessToast, showErrorToast } from '../../Notification/ToastNotification.jsx';

export default function ChangePassword() {
  const { user, userToken } = useAuth() || {};

  const userId = user?.id || localStorage.getItem('userId');
  const token = userToken || localStorage.getItem('userToken');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      showErrorToast("New passwords do not match!");
      return;
    }

    if (!userId || !token) {
      showErrorToast("User session expired. Please log in again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.put(
        `${LocalUrl}change_password/${userId}`,
        { oldPassword, newPassword },
        {
          headers: {
            'x-api-key': token,
          },
        }
      );

      if (response.data?.status || response.status === 200) {
        showSuccessToast(response.data?.msg || "Password changed successfully!");
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      showErrorToast(error?.response?.data?.msg || "Failed to update password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 text-white font-sans">
      <div className="border-b border-zinc-800 pb-3">
        <h2 className="text-xl font-black text-white tracking-wide">Change Password</h2>
        <p className="text-xs text-zinc-400 mt-1">Manage and update your account password</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-zinc-300 mb-2">Current Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF5F1F]"
            placeholder="Enter current password"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-300 mb-2">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF5F1F]"
            placeholder="Enter new password"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-300 mb-2">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF5F1F]"
            placeholder="Re-enter new password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#FF5F1F] hover:bg-orange-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition-all disabled:opacity-50"
        >
          {isSubmitting ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}