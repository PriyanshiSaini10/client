import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AllContext.jsx';
import { LocalUrl } from '../../../GlobalUrl.jsx';
import { showSuccessToast, showErrorToast } from '../../Notification/ToastNotification.jsx';

export default function Delete() {
  const [confirmInput, setConfirmInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { logout, user, userToken } = useAuth() || {};
  const navigate = useNavigate();

  const userId = user?.id || localStorage.getItem('userId');
  const token = userToken || localStorage.getItem('userToken');

  const handleDelete = async (e) => {
    e.preventDefault();
    if (confirmInput !== 'DELETE') return;

    if (!userId || !token) {
      showErrorToast("User session expired.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.delete(
        `${LocalUrl}delete_profile/${userId}`,
        {
          headers: {
            'x-api-key': token,
          },
        }
      );

      if (response.data?.status || response.status === 200) {
        showSuccessToast(response.data?.msg || "Account deleted successfully");
        if (logout) logout();
        navigate('/');
      }
    } catch (error) {
      showErrorToast(error?.response?.data?.msg || "Failed to delete account");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 text-white font-sans">
      <div className="border-b border-zinc-800 pb-3">
        <h2 className="text-xl font-black text-red-500">Delete Account</h2>
        <p className="text-xs text-zinc-400 mt-1">Permanently remove your account and stored data</p>
      </div>

      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl space-y-1">
        <p className="text-xs font-bold text-red-400">Warning!</p>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Deleting your account is permanent. All your order details, saved books, and profile info will be permanently deleted.
        </p>
      </div>

      <form onSubmit={handleDelete} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-zinc-300 mb-2">
            Type <span className="text-red-500 font-black">DELETE</span> to confirm:
          </label>
          <input
            type="text"
            placeholder="Type DELETE"
            value={confirmInput}
            onChange={(e) => setConfirmInput(e.target.value)}
            className="w-full bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={confirmInput !== 'DELETE' || isSubmitting}
          className={`font-bold text-xs px-6 py-3 rounded-xl transition-all ${
            confirmInput === 'DELETE'
              ? 'bg-red-600 hover:bg-red-500 text-white cursor-pointer'
              : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? "Deleting..." : "Permanently Delete Account"}
        </button>
      </form>
    </div>
  );
}