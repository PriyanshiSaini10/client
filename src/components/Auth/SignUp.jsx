import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, 
  FaVenusMars, FaArrowRight, FaCheckCircle, FaTimes 
} from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { validationSignSchema } from '../Validation/AllValidation.jsx';
import { showSuccessToast, showErrorToast } from '../Notification/ToastNotification.jsx';
import { LocalUrl } from '../../GlobalUrl.jsx';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [done, setDone] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { name: '', email: '', gender: '', password: '', confirmPassword: '' },
    validationSchema: validationSignSchema,

    onSubmit: async (values) => {
      setIsSubmitting(true);
      setSubmitError('');

      try {

        const response = await axios.post(`${LocalUrl}create_user`, values)

        if(response.status==200 || response.status==201) {
          showSuccessToast(response?.data?.msg || "Succesfully create user")
          localStorage.setItem('email', response?.data?.userDB?.email)
          navigate(`/otp/user_otp_verification/${response.data.userDB._id}`);
        }
      }
       catch (error) {
        if(error?.response?.data?.msg === "user already verified please login"){
          navigate('/user-login')
          showSuccessToast(error.response?.data?.msg || "server error")
        }
        else{
          showErrorToast(error?.response?.data?.msg || "server error")
        }
      } 
      finally {
        setIsSubmitting(false);
      }
    }
  });

  const handleGoogleSignup = () => {
    window.open("http://localhost:1010/api/auth/google");
    setDone(true);
  };

  const FormFields = [
    { id: 'name', label: 'Full Name', icon: <FaUser />, type: 'text', placeholder: 'Enter Your Name' },
    { id: 'email', label: 'Email Address', icon: <FaEnvelope />, type: 'email', placeholder: 'Enter Your Email' },
    {
      id: 'gender', label: 'Gender', icon: <FaVenusMars />, type: 'select',
      options: [
        { value: '', label: 'Select Gender' },
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      id: 'password', label: 'Password', icon: <FaLock />, type: showPassword ? 'text' : 'password',
      placeholder: 'Create a strong password', showToggle: true, toggleFunc: () => setShowPassword(!showPassword), toggleState: showPassword
    },
    {
      id: 'confirmPassword', label: 'Confirm Password', icon: <FaLock />, type: showConfirmPassword ? 'text' : 'password',
      placeholder: 'Re-enter your password', showToggle: true, toggleFunc: () => setShowConfirmPassword(!showConfirmPassword), toggleState: showConfirmPassword
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-[#1a1a1a] p-8 rounded-2xl shadow-xl border border-zinc-800"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Create Account</h2>
          <p className="mt-2 text-center text-sm text-zinc-400">
            Join <span className="text-[#FF5F1F] font-bold">LibroCart</span> today
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={formik.handleSubmit}>
          {FormFields.map((field) => (
            <motion.div key={field.id} layout>
              <label className="block text-sm font-medium text-zinc-300 mb-1">{field.label}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#FF5F1F]">
                  {field.icon}
                </div>
                
                {field.type === 'select' ? (
                  <select
                    {...formik.getFieldProps(field.id)}
                    className="block w-full pl-10 pr-3 py-2 bg-[#121212] border border-zinc-800 rounded-lg focus:ring-2 focus:ring-[#FF5F1F] focus:border-[#FF5F1F] text-white text-sm outline-none appearance-none"
                  >
                    {field.options.map(opt => <option key={opt.value} value={opt.value} className="bg-[#1a1a1a]">{opt.label}</option>)}
                  </select>
                ) : (
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    {...formik.getFieldProps(field.id)}
                    className="block w-full pl-10 pr-10 py-2 bg-[#121212] border border-zinc-800 rounded-lg focus:ring-2 focus:ring-[#FF5F1F] focus:border-[#FF5F1F] text-white text-sm outline-none placeholder:text-zinc-600"
                  />
                )}

                {field.showToggle && (
                  <button
                    type="button"
                    onClick={field.toggleFunc}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-[#FF5F1F]"
                  >
                    {field.toggleState ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                )}
              </div>

              <AnimatePresence>
                {formik.touched[field.id] && formik.errors[field.id] && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-500 text-xs mt-1 ml-1"
                  >
                    {formik.errors[field.id]}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Submit button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-[#FF5F1F] hover:bg-[#ff4d0a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5F1F] transition-all shadow-lg shadow-orange-900/20 mt-6 disabled:opacity-50"
          >
            {isSubmitting ? "Processing..." : (
              <span className="flex items-center gap-2">
                Sign Up <FaArrowRight />
              </span>
            )}
          </motion.button>

          {/* Google Signup */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleGoogleSignup}
            className="w-full mt-4 flex items-center justify-center gap-3 py-3 px-4 border border-zinc-800 rounded-lg shadow-sm bg-[#121212] text-sm font-medium text-white hover:bg-[#1f1f1f] transition-all"
          >
            <FcGoogle size={20} />
            Continue with Google
          </motion.button>

          {done && (
            <p className="text-center text-green-500 font-semibold mt-4">
              OK ✅
            </p>
          )}
          
        </form>

        <p className="text-center text-sm text-zinc-500 mt-4">
          Already have an account?{' '}
          <Link to="/user-login" className="font-bold text-[#FF5F1F] hover:text-[#ff4d0a] transition-colors">
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}