import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import CustomCursor from './CustomCursor.jsx';
import GoldVeil from './GoldVeil.jsx';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <CustomCursor />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}