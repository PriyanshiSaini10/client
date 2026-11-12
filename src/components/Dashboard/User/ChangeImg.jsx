import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AllContext.jsx';
import { LocalUrl } from '../../../GlobalUrl.jsx';
import { showSuccessToast, showErrorToast } from '../../Notification/ToastNotification.jsx';
import { HiOutlineCloudUpload, HiOutlineTrash } from 'react-icons/hi';

export default function ChangeImg() {
  const { user, updateUser, userToken } = useAuth() || {};

  const userId = user?.id || localStorage.getItem('userId');
  const token = userToken || localStorage.getItem('userToken');

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(user?.avatar || user?.profileImg || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const name = user?.name || localStorage.getItem('name') || "User";
  const initial = name.charAt(0).toUpperCase();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showErrorToast("File size must be less than 2MB");
        return;
      }
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreview(user?.avatar || user?.profileImg || null);
  };

  const handleSave = async () => {
    if (!selectedFile) {
      showErrorToast("Please select an image first");
      return;
    }

    if (!userId || !token) {
      showErrorToast("User session expired. Please log in again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('avatar', selectedFile);

      // URL me userId aur Header me x-api-key sent
      const response = await axios.put(
        `${LocalUrl}change_profile_img/${userId}`,
        formData,
        {
          headers: {
            'x-api-key': token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data?.status || response.status === 200) {
        showSuccessToast(response.data?.msg || "Profile picture updated!");
        
        const newAvatarUrl = response.data?.updatedUser?.avatar || response.data?.avatar || preview;
        
        // Context state & localStorage sync
        if (updateUser) {
          updateUser({ avatar: newAvatarUrl, profileImg: newAvatarUrl });
        }
        
        setSelectedFile(null);
      }
    } catch (error) {
      showErrorToast(error?.response?.data?.msg || "Image upload failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 text-white font-sans">
      <div className="border-b border-zinc-800 pb-3">
        <h2 className="text-xl font-black text-white tracking-wide">Profile Image</h2>
        <p className="text-xs text-zinc-400 mt-1">Upload a custom profile avatar for your LibroCart account</p>
      </div>

      <div className="flex flex-col items-center justify-center p-8 bg-zinc-900/40 border border-dashed border-zinc-800 rounded-2xl space-y-4">
        
        {/* Profile Avatar / Letter Preview */}
        <div className="relative group">
          {preview ? (
            <img
              src={preview}
              alt="Avatar Preview"
              className="w-28 h-28 rounded-full object-cover border-2 border-[#FF5F1F] shadow-xl shadow-orange-950/30"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-[#FF5F1F] text-white flex items-center justify-center font-black text-4xl shadow-xl shadow-orange-950/30 border-2 border-orange-400/20">
              {initial}
            </div>
          )}
        </div>

        {/* Upload Controls */}
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 bg-[#FF5F1F] hover:bg-orange-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer transition-all shadow-lg shadow-orange-950/30 active:scale-95">
            <HiOutlineCloudUpload size={18} /> Choose Image
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>

          {selectedFile && (
            <button
              type="button"
              onClick={handleRemove}
              className="p-2.5 bg-zinc-800/80 hover:bg-red-500/10 hover:text-red-400 text-zinc-400 rounded-xl transition-colors"
              title="Remove selected image"
            >
              <HiOutlineTrash size={18} />
            </button>
          )}
        </div>

        <p className="text-[11px] text-zinc-500">Supports JPG, PNG or WEBP (Max 2MB)</p>
      </div>

      {selectedFile && (
        <button
          onClick={handleSave}
          disabled={isSubmitting}
          className="w-full bg-[#FF5F1F] hover:bg-orange-600 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-lg shadow-orange-950/30 disabled:opacity-50"
        >
          {isSubmitting ? "Uploading..." : "Confirm & Upload Avatar"}
        </button>
      )}
    </div>
  );
}