import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
} from "@mui/material";

import { useContext, useState } from "react";

import { CartContext } from "../context/CartContext";
import { FavoritesContext } from "../context/FavoritesContext";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { endpoint } from "../utils/config";
import { flyToCart } from "../utils/flyToCart";

const ProductCard = ({
  product,
  handleOpen,
}) => {
  // =====================================
  // CART NORMAL UNIQUEMENT
  // =====================================

  const { addToCart } =
    useContext(CartContext);

  // =====================================
  // FAVORIS
  // =====================================

  const {
    favorites,
    toggleFavorite,
  } = useContext(FavoritesContext);

  const [added, setAdded] = useState(false);

  const isFavorite = favorites.some(
    (p) => p._id === product._id
  );

  // =====================================
  // AJOUTER AU PANIER NORMAL
  // =====================================

  const handleAdd = (e) => {
    setAdded(true);

    // Toujours le panier normal
    flyToCart(
      e,
      product,
      addToCart
    );

    setTimeout(() => {
      setAdded(false);
    }, 900);
  };

  return (
    <Card
      className="product-card"
      sx={{
        height: "100%",
        borderRadius: 5,
        overflow: "hidden",
        position: "relative",
        transition: ".35s",
        boxShadow:
          "0 10px 30px rgba(0,0,0,.08)",

        "&:hover": {
          boxShadow:
            "0 18px 45px rgba(0,0,0,.18)",
          transform: "translateY(-10px)",
        },

        "&:hover img": {
          transform: "scale(1.12)",
          filter: "brightness(1.05)",
        },
      }}
    >
      {/* ================================= */}
      {/* DISCOUNT */}
      {/* ================================= */}

      {product.discount > 0 && (
        <Chip
          label={`-${product.discount}%`}
          color="error"
          sx={{
            position: "absolute",
            top: 15,
            left: 15,
            fontWeight: "bold",
            zIndex: 2,
          }}
        />
      )}

      {/* ================================= */}
      {/* IMAGE */}
      {/* ================================= */}

      <CardMedia
        component="img"
        onError={(e) => {
          console.error(
            "❌ IMAGE ERROR"
          );
          console.error(
            "URL:",
            e.currentTarget.src
          );
        }}
        onLoad={(e) => {
          console.log(
            "✅ IMAGE LOADED"
          );
          console.log(
            "URL:",
            e.currentTarget.src
          );
        }}
        height="190"
        image={
          product.imageUrl
            ? endpoint.imageReadProduit(
                product.imageUrl
              )
            : "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600"
        }
        alt={product.name}
        sx={{
          transition: ".4s",
          objectFit: "cover",
        }}
      />

      {/* ================================= */}
      {/* PRODUCT INFORMATION */}
      {/* ================================= */}

      <CardContent
        sx={{
          p: 1.5,
          "&:last-child": {
            pb: 1.5,
          },
        }}
      >
        <Chip
          label={product.category}
          color="primary"
          size="small"
          sx={{
            mb: 1,
            fontWeight: "bold",
            fontSize: "0.7rem",
          }}
        />

        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.3,
            minHeight: 40,
          }}
        >
          {product.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            minHeight: 22,
            fontSize: "0.82rem",
            fontWeight: 500,
            mb: 0.5,
          }}
        >
          {product.brand ||
            "Marque non disponible"}
        </Typography>

        <Typography
          variant="h6"
          color="primary"
          fontWeight="bold"
          mt={1}
        >
          {product.price} DT
        </Typography>
      </CardContent>

      {/* ================================= */}
      {/* ACTIONS */}
      {/* ================================= */}

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 1.5,
          pb: 1.5,
          pt: 0,
        }}
      >
        {/* ❤️ + 👁️ */}

        <Box>
          <IconButton
            onClick={() =>
              toggleFavorite(product)
            }
            aria-label={
              isFavorite
                ? "Retirer des favoris"
                : "Ajouter aux favoris"
            }
            sx={{
              transition: ".25s",
            }}
          >
            {isFavorite ? (
              <FavoriteIcon
                sx={{
                  color: "#e53935",
                  transform:
                    "scale(1.3)",
                  transition: ".3s",
                }}
              />
            ) : (
              <FavoriteBorderIcon
                sx={{
                  transition: ".3s",
                  "&:hover": {
                    color: "#e53935",
                  },
                }}
              />
            )}
          </IconButton>

          <IconButton
            onClick={() =>
              handleOpen(product)
            }
          >
            <VisibilityIcon color="primary" />
          </IconButton>
        </Box>

        {/* ================================= */}
        {/* STOCK */}
        {/* ================================= */}

        {product.quantite === 0 && (
          <Chip
            label="Rupture de stock"
            color="error"
            sx={{
              mt: 2,
              width: "100%",
              fontWeight: "bold",
            }}
          />
        )}

        {/* ================================= */}
        {/* AJOUTER AU PANIER */}
        {/* ================================= */}

        <Button
          variant="contained"
          size="small"
          startIcon={
            <ShoppingCartIcon />
          }
          onClick={handleAdd}
          disabled={
            product.quantite === 0
          }
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontSize: "0.75rem",
            minWidth: "auto",
            px: 1.5,

            transform: added
              ? "scale(1.08)"
              : "scale(1)",

            transition: ".25s",
          }}
        >
          {added
            ? "Ajouté ✓"
            : "Ajouter"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;