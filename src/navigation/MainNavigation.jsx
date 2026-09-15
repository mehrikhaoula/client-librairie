import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/Home";
import Contact from "../pages/Contact";
import About from "../pages/About";
import MainLayout from "../layouts/MainLayout";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import MesCommandes from "../pages/MesCommandes";
import UserLogin from "../pages/UserLogin";
import Register from "../pages/Register";
import FavoritesProvider from "../context/FavoritesContext";
import { AuthProvider } from "../context/AuthContext";
import Favoris from "../pages/Favoris";
import ModifierCommande from "../pages/ModifierCommande";
import CategoryPage from "../pages/CategoryPage";

const MainNavigation = () => {
  return (
    <Router>

      <AuthProvider>
        <FavoritesProvider>

        <Routes>

          <Route
            path="/login"
            element={<UserLogin />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            element={<MainLayout />}
          >

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/cart"
              element={<Cart />}
            />

            <Route
              path="/mes-commandes"
              element={<MesCommandes />}
            />

            <Route
              path="/favoris"
             element={<Favoris />}
            />

            <Route
              path="/modifier-commande/:id"
              element={<ModifierCommande />}
            />

            <Route
              path="/categorie/:category"
              element={<CategoryPage />}
            />

          </Route>

        </Routes>
        </FavoritesProvider>

      </AuthProvider>

    </Router>
  );
};

export default MainNavigation;