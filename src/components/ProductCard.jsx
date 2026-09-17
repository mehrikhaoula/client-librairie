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
  const { addToCart } = useContext(CartContext);

  const {
    favorites,
    toggleFavorite,
  } = useContext(FavoritesContext);

  const [added, setAdded] = useState(false);

  const isFavorite = favorites.some(
    (p) => p._id === product._id
  );

  const handleAdd = (e) => {
    setAdded(true);

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
        borderRadius: {
          xs: 2,
          sm: 3,
          md: 5,
        },
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

      {/* DISCOUNT */}

      {product.discount > 0 && (
        <Chip
          label={`-${product.discount}%`}
          color="error"
          sx={{
            position: "absolute",

            top: {
              xs: 5,
              sm: 8,
              md: 15,
            },

            left: {
              xs: 5,
              sm: 8,
              md: 15,
            },

            fontWeight: "bold",
            zIndex: 2,

            fontSize: {
              xs: "0.55rem",
              sm: "0.65rem",
              md: "0.8rem",
            },

            height: {
              xs: 20,
              sm: 24,
              md: 32,
            },
          }}
        />
      )}

      {/* IMAGE */}

      <CardMedia
        component="img"
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
          height: {
            xs: 100,
            sm: 130,
            md: 190,
          },

          transition: ".4s",
          objectFit: "cover",
        }}
      />

      {/* PRODUCT INFO */}

      <CardContent
        sx={{
          p: {
            xs: 0.7,
            sm: 1,
            md: 1.5,
          },

          "&:last-child": {
            pb: {
              xs: 0.7,
              sm: 1,
              md: 1.5,
            },
          },
        }}
      >

        {/* CATEGORY */}

        <Chip
          label={product.category}
          color="primary"
          size="small"
          sx={{
            mb: {
              xs: 0.5,
              md: 1,
            },

            fontWeight: "bold",

            fontSize: {
              xs: "0.5rem",
              sm: "0.6rem",
              md: "0.7rem",
            },

            height: {
              xs: 18,
              sm: 22,
              md: 28,
            },

            maxWidth: "100%",
          }}
        />

        {/* NAME */}

        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{
            fontSize: {
              xs: "0.68rem",
              sm: "0.8rem",
              md: "0.95rem",
            },

            lineHeight: 1.2,

            minHeight: {
              xs: 32,
              sm: 36,
              md: 40,
            },

            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.name}
        </Typography>

        {/* BRAND */}

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            minHeight: {
              xs: 18,
              md: 22,
            },

            fontSize: {
              xs: "0.58rem",
              sm: "0.7rem",
              md: "0.82rem",
            },

            fontWeight: 500,

            mb: 0.5,

            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {product.brand ||
            "Marque non disponible"}
        </Typography>

        {/* PRICE */}

        <Typography
          variant="h6"
          color="primary"
          fontWeight="bold"
          sx={{
            fontSize: {
              xs: "0.8rem",
              sm: "0.95rem",
              md: "1.25rem",
            },

            mt: {
              xs: 0.5,
              md: 1,
            },
          }}
        >
          {product.price} DT
        </Typography>

      </CardContent>

      {/* ACTIONS */}

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",

          px: {
            xs: 0.5,
            sm: 1,
            md: 1.5,
          },

          pb: {
            xs: 0.6,
            sm: 1,
            md: 1.5,
          },

          pt: 0,
        }}
      >

        {/* FAVORITE + VIEW */}

        <Box
          sx={{
            display: "flex",
          }}
        >

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
              p: {
                xs: 0.3,
                sm: 0.6,
                md: 1,
              },
            }}
          >
            {isFavorite ? (
              <FavoriteIcon
                sx={{
                  color: "#e53935",

                  fontSize: {
                    xs: 17,
                    sm: 20,
                    md: 24,
                  },
                }}
              />
            ) : (
              <FavoriteBorderIcon
                sx={{
                  fontSize: {
                    xs: 17,
                    sm: 20,
                    md: 24,
                  },

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
            sx={{
              p: {
                xs: 0.3,
                sm: 0.6,
                md: 1,
              },
            }}
          >
            <VisibilityIcon
              color="primary"
              sx={{
                fontSize: {
                  xs: 17,
                  sm: 20,
                  md: 24,
                },
              }}
            />
          </IconButton>

        </Box>

        {/* STOCK */}

        {product.quantite === 0 && (
          <Chip
            label="Rupture"
            color="error"
            sx={{
              fontSize: {
                xs: "0.45rem",
                sm: "0.6rem",
                md: "0.75rem",
              },

              height: {
                xs: 18,
                sm: 22,
                md: 30,
              },

              fontWeight: "bold",
            }}
          />
        )}

        {/* ADD TO CART */}

        <Button
          variant="contained"
          size="small"
          startIcon={
            <ShoppingCartIcon
              sx={{
                fontSize: {
                  xs: "13px !important",
                  sm: "16px !important",
                  md: "20px !important",
                },
              }}
            />
          }
          onClick={handleAdd}
          disabled={
            product.quantite === 0
          }
          sx={{
            borderRadius: 2,
            textTransform: "none",

            fontSize: {
              xs: "0.5rem",
              sm: "0.65rem",
              md: "0.75rem",
            },

            minWidth: "auto",

            px: {
              xs: 0.6,
              sm: 1,
              md: 1.5,
            },

            py: {
              xs: 0.4,
              sm: 0.6,
              md: 0.8,
            },

            transform: added
              ? "scale(1.08)"
              : "scale(1)",

            transition: ".25s",
          }}
        >
          {added
            ? "✓"
            : "Ajouter"}
        </Button>

      </CardActions>
    </Card>
  );
};

export default ProductCard;