import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaSignInAlt } from 'react-icons/fa';
import axios from 'axios';
import { validationLoginSchema } from '../Validation/AllValidation.jsx'; 
import { showSuccessToast, showErrorToast } from '../Notification/ToastNotification.jsx';
import { LocalUrl } from '../../GlobalUrl.jsx';

export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: validationLoginSchema,
    onSubmit: async (values) => {

      setIsSubmitting(true);
      try {
        const response = await axios.post(`${LocalUrl}user_log_in`, values)
        console.log(response.data);
          if(response.status==200 || response.status==201) {
          showSuccessToast(response?.data?.msg || "Succesfully Logged in")
          localStorage.setItem("userId", response?.data?.id);
          localStorage.setItem("userToken", response?.data?.token);
          localStorage.setItem("name", response?.data?.name);
          localStorage.setItem("email", response?.data?.email);
          navigate("/");
      } 
    }
      catch (error) {
          if (error?.response?.data?.msg === "Pls verify otp") {
          localStorage.setItem("email", error?.response?.data?.email);
          navigate(`/otp/user_otp_verification/${error?.response?.data?.id}`)
          showSuccessToast("Please verify your account");
      }
       else if (error?.response?.data?.msg === "User not found") {
          navigate("/create-account");
          showErrorToast(error.response?.data?.msg);
       }
       else{
         showErrorToast(error?.response?.data?.msg || "Server error");
       }
    }
       finally {
        setIsSubmitting(false);
      }
    }
  });

  const FormFields = [
    { 
      id: 'email', 
      label: 'Email Address', 
      icon: <FaEnvelope />, 
      type: 'email', 
      placeholder: 'Enter your registered email' 
    },
    { 
      id: 'password', 
      label: 'Password', 
      icon: <FaLock />, 
      type: showPassword ? 'text' : 'password',
      placeholder: 'Enter your password', 
      showToggle: true 
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full space-y-8 bg-[#1a1a1a] p-10 rounded-2xl shadow-2xl border border-zinc-800"
      >
        <div className="text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mx-auto h-12 w-12 bg-[#FF5F1F]/10 text-[#FF5F1F] rounded-full flex items-center justify-center mb-4 border border-[#FF5F1F]/20"
          >
            <FaSignInAlt size={24} />
          </motion.div>
          <h2 className="text-3xl font-extrabold text-white">Welcome Back</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Log in to manage your <span className="text-[#FF5F1F] font-semibold">LibroCart</span> account
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={formik.handleSubmit}>
          {FormFields.map((field) => (
            <div key={field.id}>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                {field.label}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#FF5F1F] transition-colors">
                  {field.icon}
                </div>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  {...formik.getFieldProps(field.id)}
                  className="block w-full pl-10 pr-10 py-3 bg-[#121212] border border-zinc-800 rounded-xl focus:ring-2 focus:ring-[#FF5F1F] focus:border-[#FF5F1F] text-white text-sm transition-all outline-none placeholder:text-zinc-600"
                />
                
                {field.showToggle && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-[#FF5F1F]"
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                )}
              </div>
              
              <AnimatePresence>
                {formik.touched[field.id] && formik.errors[field.id] && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-500 text-xs mt-1.5 ml-1"
                  >
                    {formik.errors[field.id]}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 bg-[#121212] border-zinc-800 text-[#FF5F1F] focus:ring-[#FF5F1F] rounded" />
              <label className="ml-2 text-zinc-400">Remember me</label>
            </div>
            <Link to="/forgot-password" size="sm" className="text-[#FF5F1F] hover:underline font-medium">
              Forgot password?
            </Link>
          </div>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            type="submit"
            className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-[#FF5F1F] hover:bg-[#ff4d0a] text-white font-bold rounded-xl shadow-lg shadow-orange-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Verifying..." : (
              <>Log In <FaArrowRight size={14} /></>
            )}
          </motion.button>
        </form>

        <p className="text-center text-sm text-zinc-500 mt-6">
          New to LibroCart?{' '}
          <Link to="/create-account" className="text-[#FF5F1F] font-bold hover:text-[#ff4d0a]">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}