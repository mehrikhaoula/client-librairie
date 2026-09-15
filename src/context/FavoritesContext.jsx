import React, { createContext, useEffect, useState } from "react";

export const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");

    return savedFavorites
      ? JSON.parse(savedFavorites)
      : [];
  });

  // Sauvegarder les favoris dans localStorage
  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  // Ajouter / supprimer un produit des favoris
  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some(
        (item) => item._id === product._id
      );

      if (exists) {
        return prevFavorites.filter(
          (item) => item._id !== product._id
        );
      }

      return [...prevFavorites, product];
    });
  };

  // Vérifier si un produit est déjà favori
  const isFavorite = (productId) => {
    return favorites.some(
      (item) => item._id === productId
    );
  };

  // Supprimer directement un favori
  const removeFavorite = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter(
        (item) => item._id !== productId
      )
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
