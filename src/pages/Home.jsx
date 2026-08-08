import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Hero from "../components/Hero";
import Categories from "../components/Categories";
import ProductsSection from "../components/ProductsSection";

const Home = () => {
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] =
    useState("Toutes");

  // Scroll automatique vers les produits
  // quand on vient de À propos / Contact
  useEffect(() => {
    if (location.state?.scrollTo === "products") {
      setTimeout(() => {
        document
          .getElementById("products")
          ?.scrollIntoView({
            behavior: "smooth",
          });
      }, 300);
    }
  }, [location]);

  return (
    <>
      <Hero />

      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <ProductsSection
        selectedCategory={selectedCategory}
      />
    </>
  );
};

export default Home;