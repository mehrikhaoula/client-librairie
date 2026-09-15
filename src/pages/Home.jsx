import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Hero from "../components/Hero";
import Categories from "../components/Categories";
import HomeCategorySection from "../components/HomeCategorySection";
import MostOrderedSection from "../components/MostOrderedSection";

const Home = () => {
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] =
    useState("Toutes");

  const [search, setSearch] = useState("");

  // ==========================================
  // SCROLL DEPUIS ABOUT / CONTACT
  // ==========================================

  useEffect(() => {
    if (location.state?.search !== undefined) {
      setSearch(location.state.search);
    }

    if (location.state?.scrollTo === "products") {
      setTimeout(() => {
        document
          .getElementById("categories")
          ?.scrollIntoView({
            behavior: "smooth",
          });
      }, 300);
    }
  }, [location]);

  return (
    <>
      {/* ==========================================
          HERO
      ========================================== */}

      <Hero />

      {/* ==========================================
          CATÉGORIES
      ========================================== */}

      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* ==========================================
          LES PLUS COMMANDÉS
      ========================================== */}

      <MostOrderedSection />

      {/* ==========================================
          SECTIONS CATÉGORIES
      ========================================== */}

      <HomeCategorySection
        category="BEAUX-ARTS"
        title="L'art commence ici."
        accent="#C9785A"
        soft="#F4E1D8"
      />

      <HomeCategorySection
        category="LOISIRS CRÉATIFS"
        title="Imaginez. Créez. Partagez."
        accent="#9B849B"
        soft="#EAE1EA"
      />

      <HomeCategorySection
        category="FOURNITURE BOUGIES"
        title="Créez une ambiance unique."
        accent="#B88A63"
        soft="#F0E3D5"
      />

      <HomeCategorySection
        category="PAPIERS"
        title="Le papier, votre terrain de jeu."
        accent="#8FA493"
        soft="#E4ECE6"
      />

      <HomeCategorySection
        category="Étudiants"
        title="Tout pour vos études."
        accent="#6686A3"
        soft="#E2EAF1"
      />

      <HomeCategorySection
        category="Couture- Stylisme"
        title="Exprimez votre style."
        accent="#A77C8B"
        soft="#EDE0E4"
      />
    </>
    
  );
};

export default Home;