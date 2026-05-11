import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaShieldAlt, FaArrowRight, FaSync, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import {
  showSuccessToast,
  showErrorToast,
} from "../Notification/ToastNotification.jsx";
import { LocalUrl } from "../../GlobalUrl.jsx";

export default function Otp() {
  const [code, setCode] = useState(new Array(4).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const { userid, type } = useParams();
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const email = localStorage.getItem("email") || "test@gmail.com";

  // count down
  useEffect(() => {
    let interval = null;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    setIsLoading(true);
    try {
      await axios.post(`${LocalUrl}resend_otp/${userid}`);
      showSuccessToast("New OTP Sent");
      setCode(new Array(4).fill(""));
      setTimeLeft(30);
      setCanResend(false);
      inputRefs.current[0].focus();
    } catch (err) {
      showErrorToast("Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userOtp = code.join("");
    if (userOtp.length !== 4) {
      showErrorToast("Enter 4 digit OTP");
      return;
    }

    setIsLoading(true);

    try {
      if (type == "user_otp_verification") {
        const response = await axios.post(
          `${LocalUrl}user_otp_verification/${userid}`,
          { otp: userOtp }
        );
        if (response.status === 200 || response.status === 201) {
          showSuccessToast(response?.data?.msg || "Sucessfully Verify Otp");
          navigate("/user-login");
        }
      }
    } catch (err) {
      if (err?.response?.data?.msg == "Account Already Verify Pls LogIn!") {
        showSuccessToast(err.response?.data?.msg || "server error");
        navigate("/user-login");
      } else {
        showErrorToast(err.response?.data?.msg || "Verification failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]  py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-[#1a1a1a] p-10 rounded-2xl shadow-2xl border border-zinc-800"
      >
        <div className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 bg-[#FF5F1F]/10 text-[#FF5F1F] rounded-full flex items-center justify-center mb-2 border border-[#FF5F1F]/20">
            <FaShieldAlt size={30} />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-white">
              Email Verification
            </h2>
            <p className="text-sm text-zinc-400">Enter the code sent to:</p>
            <div className="inline-flex items-center gap-2 bg-[#FF5F1F]/5 px-4 py-2 rounded-full border border-[#FF5F1F]/20">
              <FaEnvelope className="text-[#FF5F1F] text-xs" />
              <span className="font-semibold text-zinc-200 text-xs">
                {email}
              </span>
            </div>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* 4-Box Input System */}
          <div className="flex justify-center gap-4">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-14 h-16 text-center text-2xl font-bold bg-[#121212] text-white border-2 border-zinc-800 rounded-xl focus:border-[#FF5F1F] focus:ring-2 focus:ring-[#FF5F1F]/20 outline-none transition-all"
              />
            ))}
          </div>

          <div className="flex flex-col items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              type="submit"
              className="w-full py-4 bg-[#FF5F1F] hover:bg-[#ff4d0a] text-white font-bold rounded-2xl shadow-lg shadow-orange-900/20 flex justify-center items-center gap-2 transition-all disabled:opacity-50"
            >
              {isLoading ? "Verifying..." : <>Verify Account <FaArrowRight /></>}
            </motion.button>

            <div className="text-sm font-medium">
              {!canResend ? (
                <p className="text-zinc-500">
                  Resend in <span className="text-[#FF5F1F]">{timeLeft}s</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-[#FF5F1F] flex items-center gap-2 hover:text-[#ff4d0a] transition-colors"
                >
                  <FaSync className={isLoading ? "animate-spin" : ""} /> Resend OTP
                </button>
              )}
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}