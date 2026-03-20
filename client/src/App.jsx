import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import TopBar from './components/layout/TopBar/TopBar.jsx';
import Navbar from './components/layout/Navbar/Navbar.jsx';
import Footer from './components/layout/Footer/Footer.jsx';
import CartDrawer from './components/cart/CartDrawer.jsx';
import Toast from './components/ui/Toast/Toast.jsx';
import Home from './pages/Home/Home.jsx';
import Shop from './pages/Shop/Shop.jsx';
import ProductDetail from './pages/ProductDetail/ProductDetail.jsx';

function AppLayout() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <CartProvider>
        <ToastProvider>
          <AppLayout />
        </ToastProvider>
      </CartProvider>
    </Router>
  );
}
