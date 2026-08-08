import React from "react";
import { CartProvider } from "./context/CartContext";
import MainNavigation from "./navigation/MainNavigation";

function App() {
  return (
    <CartProvider>
      <MainNavigation />
    </CartProvider>
  );
}

export default App;