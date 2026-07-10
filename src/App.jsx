import {BrowserRouter, Routes, Route , Navigate , useLocation} from 'react-router-dom'
import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/pages/About.jsx'
import SignUp from './components/Auth/SignUp.jsx'
import Login from './components/Auth/LogIn.jsx'
import Footer from './components/Footer.jsx'
import ContactUs from './components/ContactUs.jsx'
import Otp from './components/OtpVerification/Otp.jsx'
import { ToastContainer } from "react-toastify";
import Collections from './components/Collections/Collections.jsx'
import { CartProvider } from './components/context/CartContext.jsx';
import BookDetail from './components/pages/BookDetail.jsx';
import Cart from './components/pages/Cart.jsx';
import Checkout from './components/pages/Checkout.jsx';
import Dashboard from './components/Dashboard/HomeDashboard.jsx'
import { useAuth } from './context/AllContext.jsx'

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PrivateRoute({children}){
  const {login} = useAuth()
  return login ? children : <Navigate to = "/" replace />
}

export default function App() {
  return (
    <div>
      <CartProvider>
      <BrowserRouter>
      <ScrollToTop />
      <Navbar/>
      <Routes> 

        {/* Public Routes */}
        <Route path='/' element={<Home/>} />
        <Route path='/collections' element={<Collections/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/book/:id' element={<BookDetail/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/contact-us' element={<ContactUs/>} />
        <Route path='/create-account' element={<SignUp/>} />
        <Route path='/user-login' element={<Login/>} />

        {/* Private Routes */}
         <Route path='/otp/:type/:userid' element={<PrivateRoute><Otp/></PrivateRoute>} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>} />
      </Routes>
      <ToastContainer/>
      <Footer/> 
      </BrowserRouter>
    </CartProvider>
    </div>
  )
}
