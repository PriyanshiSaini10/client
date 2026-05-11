import { useState, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCamera, FaCloudUploadAlt, FaCloudUploadAlt as FaUpload } from 'react-icons/fa';
import { LocalUrl } from '../../../GlobalUrl.jsx';
import { showErrorToast, showSuccessToast } from '../../Notification/ToastNotification.jsx';
import { useAuth } from '../../../context/AllContext.jsx';

export default function ChangeImg() {
  const { profile, setProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showErrorToast("File size should be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        change_img(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const change_img = async (imgFile) => {
    const id = localStorage.getItem('userId');
    const token = localStorage.getItem('userToken');
    const formData = new FormData();
    formData.append('profileImg', imgFile);

    setIsLoading(true);
    try {
      const url = `${LocalUrl}change_profile_img/${id}`;
      const response = await axios.put(url, formData, {headers: { 'x-api-key': token }});
      
      if (response.status === 200) {
        showSuccessToast(response?.data?.msg || "Successfully Changed Image");
        setProfile({ ...profile, profileImg: response?.data?.DB?.profileImg });
        setPreviewUrl(null);
      }
    } 
    catch (err) {
      showErrorToast(err.response?.data?.msg || "Failed to change image");
      setPreviewUrl(null);
    } 
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#121212] p-4">
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-sm w-full bg-[#1a1a1a] p-8 rounded-3xl border border-zinc-800 shadow-2xl shadow-black/50 text-center"
      >
        <h3 className="text-white font-bold text-xl mb-2 flex items-center justify-center gap-2">
          <FaCamera className="text-[#FF5F1F]" /> Profile Photo
        </h3>
        <p className="text-zinc-500 text-sm mb-8">Update your avatar image</p>

        <div className="relative inline-block group">
          {/* Profile Image Circle */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-[#FF5F1F]/20 group-hover:border-[#FF5F1F] transition-all duration-500 shadow-xl shadow-[#FF5F1F]/10"
          >
            {/* Loading Spinner Overlay */}
            <AnimatePresence>
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-20 backdrop-blur-sm"
                >
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-10 h-10 border-4 border-t-[#FF5F1F] border-zinc-700 rounded-full mb-2"
                  />
                  <span className="text-[10px] text-[#FF5F1F] font-bold tracking-widest uppercase">Uploading</span>
                </motion.div>
              )}
            </AnimatePresence>

            <img
              src={previewUrl || profile?.profileImg }
              alt="Profile"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Hover Camera Icon Overlay */}
            {!isLoading && (
              <button 
                onClick={() => fileInputRef.current.click()}
                className="absolute inset-0 bg-[#FF5F1F]/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 backdrop-blur-[2px]"
              >
                <div className="bg-white/20 p-4 rounded-full backdrop-blur-md">
                  <FaUpload className="text-white text-2xl" />
                </div>
              </button>
            )}
          </motion.div>

          {/* Floating Camera Button */}
          <button 
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-2 right-2 bg-[#FF5F1F] p-3 rounded-full text-white shadow-lg hover:bg-[#ff4d0a] transition-all transform hover:scale-110 border-4 border-[#1a1a1a]"
          >
            <FaCamera size={16} />
          </button>
        </div>

        <input 
          type="file" 
          hidden 
          ref={fileInputRef} 
          onChange={handleFileChange}
          accept="image/*"
        />

        <div className="mt-8 space-y-4">
          <div className="py-2 px-4 rounded-xl bg-[#121212] border border-zinc-800 inline-block">
             <p className="text-zinc-400 text-[11px] uppercase tracking-widest font-semibold">
               Max File Size: <span className="text-white">2 MB</span>
             </p>
          </div>
          
          <button 
            disabled={isLoading}
            onClick={() => fileInputRef.current.click()}
            className="w-full py-4 bg-[#FF5F1F] hover:bg-[#ff4d0a] text-white rounded-2xl font-bold shadow-lg shadow-orange-900/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? "Please Wait..." : "Select New Image"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}