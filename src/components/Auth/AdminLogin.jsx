import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { FaLock, FaEnvelope, FaShieldAlt, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import { LocalUrl } from '../../GlobalUrl.jsx';
import { useAuth } from '../context/AllContext.jsx';
import { showSuccessToast, showErrorToast } from '../Notification/ToastNotification.jsx';

export default function AdminLogin() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth() || {};

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const response = await axios.post(`${LocalUrl}admin_log_in`, values);

        if (response.data?.status || response.status === 200) {
          showSuccessToast(response.data?.msg || "Admin Logged in successfully");
          
          // Context aur LocalStorage sync
          if (login) {
            login({
              id: response.data.id,
              token: response.data.token,
              name: response.data.name,
              email: response.data.email,
              role: response.data.role || 'admin'
            });
          }

          // Admin Dashboard par redirect
          navigate("/admin/dashboard");
        }
      } catch (error) {
        showErrorToast(error?.response?.data?.msg || "Admin login failed");
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full space-y-8 bg-[#1a1a1a] p-10 rounded-2xl shadow-2xl border border-zinc-800"
      >
        <div className="text-center">
          <div className="mx-auto h-14 w-14 bg-[#FF5F1F]/10 text-[#FF5F1F] rounded-full flex items-center justify-center mb-4 border border-[#FF5F1F]/20">
            <FaShieldAlt size={26} />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Admin Portal</h2>
          <p className="mt-2 text-xs text-zinc-400">
            Authorized admin login for <span className="text-[#FF5F1F] font-bold">LibroCart</span>
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={formik.handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-2">Admin Email</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#FF5F1F]">
                <FaEnvelope />
              </div>
              <input
                type="email"
                placeholder="admin@librocart.com"
                {...formik.getFieldProps('email')}
                className="block w-full pl-10 pr-4 py-3 bg-[#121212] border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#FF5F1F] transition-all placeholder:text-zinc-600"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-2">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#FF5F1F]">
                <FaLock />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                {...formik.getFieldProps('password')}
                className="block w-full pl-10 pr-4 py-3 bg-[#121212] border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#FF5F1F] transition-all placeholder:text-zinc-600"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-[#FF5F1F] hover:bg-orange-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-950/40 transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Verifying Admin..." : (
              <>Login to Admin Panel <FaArrowRight size={14} /></>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}