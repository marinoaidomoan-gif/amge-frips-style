import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import GoldVeil from './components/GoldVeil.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import { pageTransition } from './animations/framerMotionVariants.js';

import Home from './pages/Home.jsx';
import Catalogue from './pages/Catalogue.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

export default function App() {
  const location = useLocation();

  return (
    <>
      <CustomCursor />
      <Navbar />
      <GoldVeil key={`veil-${location.pathname}`} />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          className="pt-20"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/produit/:id" element={<ProductDetail />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
          </Routes>
        </motion.main>
      </AnimatePresence>

      <Footer />
    </>
  );
}