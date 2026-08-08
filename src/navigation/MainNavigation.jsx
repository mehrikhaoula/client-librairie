import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import About from "../pages/About";
import MainLayout from "../layouts/MainLayout";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";

const MainNavigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/checkout"
              element={<Checkout />}/>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />}/>
        
        </Route>
      </Routes>
    </Router>
  );
};

export default MainNavigation;
