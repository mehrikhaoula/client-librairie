import React, {
  useEffect,
  useState,
  useContext,
} from "react";
import {
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { FavoritesContext,} from "../context/FavoritesContext";
import ProductDetailsDialog from "./ProductDetailsDialog";
import { endpoint } from "../utils/config";

const HomeCategorySection = ({
  category,
  title,
  accent,
  soft,
}) => {
  const navigate = useNavigate();

  const [products, setProducts] =
    useState([]);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [open, setOpen] =
    useState(false);

  const {
    favorites,
    toggleFavorite,
  } = useContext(FavoritesContext);

  // ==========================================
  // GET PRODUCTS
  // ==========================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
       const response = await axios.get(
  endpoint.getAllProduit
);

console.log("🔥 PRODUITS RESPONSE :", response.data);
console.log("🔥 TYPE :", Array.isArray(response.data));
console.log("🔥 DATA :", response.data.data);

const allProducts = Array.isArray(response.data)
  ? response.data
  : response.data.data || [];

console.log("🔥 ALL PRODUCTS :", allProducts);

        const categoryProducts =
          allProducts.filter(
            (product) =>
              product.category
                ?.trim()
                .toLowerCase() ===
              category
                .trim()
                .toLowerCase()
          );

        setProducts(
          categoryProducts.slice(0, 8)
        );
      } catch (error) {
        console.error(
          `Erreur produits ${category} :`,
          error
        );
      }
    };

    fetchProducts();
  }, [category]);

  // ==========================================
  // SLUG
  // ==========================================

  const categorySlugs = {
    "BEAUX-ARTS":
      "beaux-arts",

    "LOISIRS CRÉATIFS":
      "loisirs-creatifs",

    "FOURNITURE BOUGIES":
      "fourniture-bougies",

    PAPIERS:
      "papiers",

    Étudiants:
      "etudiants",

    "Couture- Stylisme":
      "couture-stylisme",
  };

  const slug =
    categorySlugs[category];

  // ==========================================
  // OPEN DETAILS
  // ==========================================

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  // ==========================================
  // NOTHING
  // ==========================================

  if (products.length === 0) {
    return null;
  }

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <>
      {/* SECTION */}
      <Box
        sx={{
          background: "#FAF8F4",
          py: {
            xs: 4,
            md: 6,
          },
        }}
      >
        <Container maxWidth="xl">

          {/* HEADER */}
          <Box
            sx={{
              display: "flex",
              alignItems: {
                xs: "flex-start",
                sm: "center",
              },
              justifyContent: "space-between",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              gap: 2,
              mb: 2.5,
            }}
          >
            {/* TITLE */}
            <Box>
              <Typography
                sx={{
                  color: accent,
                  fontSize: ".75rem",
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  mb: 0.5,
                }}
              >
                {category}
              </Typography>

              <Typography
                sx={{
                  color: "#243447",
                  fontFamily: "Georgia, serif",
                  fontWeight: 600,
                  fontSize: {
                    xs: "1.45rem",
                    md: "1.9rem",
                  },
                }}
              >
                {title}
              </Typography>
            </Box>

            {/* SEE ALL */}
            <Button
              endIcon={<ChevronRightIcon />}
              onClick={() => navigate(`/categorie/${slug}`)}
              sx={{
                color: accent,
                fontWeight: 700,
                textTransform: "none",
                whiteSpace: "nowrap",

                "&:hover": {
                  background: soft,
                },
              }}
            >
              Voir tout
            </Button>
          </Box>

          {/* PRODUCTS */}
          <Box
            sx={{
              display: "flex",
              gap: {
                xs: 0.8,
                sm: 2,
                md: 2.5,
              },
              overflowX: "auto",
              pb: 2,
              scrollbarWidth: "none",

              "&::-webkit-scrollbar": {
                display: "none",
              },

              "& > *": {
                flex: {
                  xs: "0 0 31%",
                  sm: "0 0 38%",
                  md: "0 0 23%",
                },
                minWidth: 0,
              },
            }}
          >
            {products.map((product) => (
              <Box key={product._id}>
                <ProductCard
                  product={product}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  handleOpen={handleOpen}
                />
              </Box>
            ))}
          </Box>

        </Container>
      </Box>

      {/* PRODUCT DETAILS */}
      <ProductDetailsDialog
        product={selectedProduct}
        open={open}
        onClose={handleClose}
        accent={accent}
        soft={soft}
      />
    </>
  );
};

export default HomeCategorySection;