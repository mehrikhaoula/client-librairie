import React, {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  Box,
  Container,
  Typography,
} from "@mui/material";

import axios from "axios";
import { endpoint } from "../utils/config";
import ProductCard from "./ProductCard";
import ProductDetailsDialog from "./ProductDetailsDialog";

import { FavoritesContext } from "../context/FavoritesContext";

const MostOrderedSection = () => {
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [open, setOpen] = useState(false);

  const {
    favorites,
    toggleFavorite,
  } = useContext(FavoritesContext);

  // ==========================================
  // RÉCUPÉRER LES VRAIS PRODUITS
  // LES PLUS COMMANDÉS
  // ==========================================

  useEffect(() => {
    const fetchMostOrdered = async () => {
      try {
        const response = await axios.get(
  `${endpoint.getAllOrders}/most-ordered`
);

        const mostOrdered =
          response.data.data || [];

        setProducts(mostOrdered);

      } catch (error) {
        setProducts([]);
      }
    };

    fetchMostOrdered();
  }, []);

  // ==========================================
  // OUVRIR DÉTAIL PRODUIT
  // ==========================================

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  // ==========================================
  // FERMER DÉTAIL PRODUIT
  // ==========================================

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  // ==========================================
  // SI AUCUNE COMMANDE VALIDÉE
  // ==========================================

  if (products.length === 0) {
    return null;
  }

  return (
    <>
      <Box
        sx={{
          position: "relative",

          // =================================
          // TRANSITION DEPUIS CATEGORIES
          // =================================

          background:
            "linear-gradient(180deg, #EDE4D6 0%, #FFFFFF 38%, #FAF8F4 100%)",

          py: {
            xs: 4,
            md: 5,
          },

          overflow: "hidden",

          // =================================
          // FADE SUPÉRIEUR
          // =================================

          "&::before": {
            content: '""',

            position: "absolute",

            top: 0,
            left: 0,
            right: 0,

            height: 50,

            background:
              "linear-gradient(180deg, rgba(237,228,214,0.55) 0%, rgba(255,255,255,0) 100%)",

            pointerEvents: "none",
          },

          // =================================
          // FADE INFÉRIEUR
          // =================================

          "&::after": {
            content: '""',

            position: "absolute",

            bottom: 0,
            left: 0,
            right: 0,

            height: 45,

            background:
              "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(250,248,244,1) 100%)",

            pointerEvents: "none",
          },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* =================================
              TITRE
          ================================= */}

          <Box sx={{ mb: 2.5 }}>
            <Typography
              sx={{
                color: "#C9785A",

                fontSize: ".75rem",

                fontWeight: 700,

                letterSpacing: 1.5,

                textTransform: "uppercase",

                mb: 0.5,
              }}
            >
              Nos incontournables
            </Typography>

            <Typography
              sx={{
                color: "#243447",

                fontFamily:
                  "Georgia, serif",

                fontWeight: 600,

                fontSize: {
                  xs: "1.5rem",
                  sm: "1.7rem",
                  md: "1.9rem",
                },

                lineHeight: 1.2,
              }}
            >
              🔥 Les plus commandés
            </Typography>

            <Typography
              sx={{
                color: "#89929A",

                fontSize: {
                  xs: ".82rem",
                  md: ".88rem",
                },

                mt: 0.7,
              }}
            >
              Les produits que nos clients
              apprécient le plus.
            </Typography>
          </Box>

          {/* =================================
    PRODUITS
    SCROLL HORIZONTAL
================================= */}

<Box
  sx={{
    position: "relative",
  }}
>
  {/* Flèche gauche */}
  <Box
    onClick={() => {
      document
        .getElementById("most-ordered-scroll")
        ?.scrollBy({
          left: -500,
          behavior: "smooth",
        });
    }}
    sx={{
      display: {
        xs: "none",
        md: "flex",
      },

      position: "absolute",
      left: 8,
      top: "50%",
      transform: "translateY(-50%)",

      width: 42,
      height: 42,

      borderRadius: "50%",

      backgroundColor: "#FFFFFF",

      boxShadow: "0 4px 14px rgba(36,52,71,0.18)",

      alignItems: "center",
      justifyContent: "center",

      color: "#C9785A",

      fontSize: "24px",
      fontWeight: 700,

      cursor: "pointer",

      zIndex: 5,

      transition: "all .2s ease",

      "&:hover": {
        transform: "translateY(-50%) scale(1.08)",
        boxShadow:
          "0 6px 18px rgba(36,52,71,0.25)",
      },
    }}
  >
    ‹
  </Box>

  {/* Cartes */}
  <Box
    id="most-ordered-scroll"
    sx={{
      display: "flex",

      gap: {
        xs: 1.5,
        sm: 2,
        md: 2.5,
      },

      overflowX: "auto",

      flexWrap: "nowrap",

      scrollBehavior: "smooth",

      pb: 2,

      scrollbarWidth: "none",

      "&::-webkit-scrollbar": {
        display: "none",
      },

      // =================================
      // LARGEUR DES CARTES
      // =================================

      "& > *": {
        flex: {
          xs: "0 0 72%",
          sm: "0 0 38%",
          md: "0 0 23%",
          lg: "0 0 23%",
        },

        minWidth: 0,
      },
    }}
  >
    {products.map((product) => (
      <Box
        key={product._id}
        sx={{
          flexShrink: 0,
        }}
      >
        <ProductCard
          product={product}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          handleOpen={handleOpen}
        />
      </Box>
    ))}
  </Box>

  {/* Flèche droite */}
  <Box
    onClick={() => {
      document
        .getElementById("most-ordered-scroll")
        ?.scrollBy({
          left: 500,
          behavior: "smooth",
        });
    }}
    sx={{
      display: {
        xs: "none",
        md: "flex",
      },

      position: "absolute",
      right: 8,
      top: "50%",
      transform: "translateY(-50%)",

      width: 42,
      height: 42,

      borderRadius: "50%",

      backgroundColor: "#FFFFFF",

      boxShadow:
        "0 4px 14px rgba(36,52,71,0.18)",

      alignItems: "center",
      justifyContent: "center",

      color: "#C9785A",

      fontSize: "24px",
      fontWeight: 700,

      cursor: "pointer",

      zIndex: 5,

      transition: "all .2s ease",

      "&:hover": {
        transform: "translateY(-50%) scale(1.08)",
        boxShadow:
          "0 6px 18px rgba(36,52,71,0.25)",
      },
    }}
  >
    ›
  </Box>
</Box>
        </Container>
      </Box>

      {/* =================================
          PRODUCT DETAILS
      ================================= */}

      <ProductDetailsDialog
        product={selectedProduct}
        open={open}
        onClose={handleClose}
        accent="#C9785A"
        soft="#F4E1D8"
      />
    </>
  );
};

export default MostOrderedSection;