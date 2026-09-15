import React, { useContext } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Button,
  Chip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { FavoritesContext } from "../context/FavoritesContext";
import { CartContext } from "../context/CartContext";
import { endpoint } from "../utils/config";

const Favoris = () => {
  const {
    favorites,
    removeFavorite,
  } = useContext(FavoritesContext);

  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
  if (product.quantite === 0) return;

  addToCart(product);

  // 🗑️ Retirer automatiquement des favoris
  removeFavorite(product._id);
};

  return (
    <Box
  sx={{
    maxWidth: 1200,
    mx: "auto",

    px: {
      xs: 1.5,
      sm: 3,
      md: 4,
    },

    py: {
      xs: 3,
      sm: 4,
      md: 5,
    },
  }}
>
      {/* Titre */}

      <Typography
  variant="h4"
  fontWeight="bold"
  sx={{
    color: "#16375B",

    mb: {
      xs: 2.5,
      sm: 3,
      md: 4,
    },

    fontSize: {
      xs: "1.7rem",
      sm: "2rem",
      md: "2.2rem",
    },

    textAlign: {
      xs: "center",
      md: "left",
    },
  }}
>
  ❤️ Mes Favoris
</Typography>

      {/* Aucun favori */}

      {favorites.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 10,
          }}
        >
          <FavoriteIcon
            sx={{
              fontSize: 70,
              color: "#ddd",
              mb: 2,
            }}
          />

          <Typography
            variant="h6"
            sx={{
              color: "#777",
            }}
          >
            Vous n'avez aucun produit dans vos favoris.
          </Typography>

          <Typography
            sx={{
              color: "#999",
              mt: 1,
            }}
          >
            Ajoutez des produits ❤️ pour les retrouver ici.
          </Typography>
        </Box>
      ) : (

        /* Liste des favoris */
<Box
  sx={{
    display: "grid",

    gridTemplateColumns: {
      xs: "1fr",
      sm: "repeat(2, minmax(0, 1fr))",
      md: "repeat(3, minmax(0, 1fr))",
      lg: "repeat(4, minmax(0, 1fr))",
    },

    gap: {
      xs: 2,
      sm: 2.5,
      md: 3,
    },
  }}
>
  {favorites.map((product) => {
    const outOfStock =
      product.quantite === 0;

    return (
      <Card
        key={product._id}
        sx={{
          position: "relative",

          borderRadius: {
            xs: 2.5,
            sm: 3,
          },

          overflow: "hidden",

          height: "100%",

          display: "flex",
          flexDirection: "column",

          boxShadow:
            "0 4px 15px rgba(0,0,0,0.08)",

          transition:
            "transform .3s, box-shadow .3s",

          "&:hover": {
            transform: {
              xs: "none",
              sm: "translateY(-5px)",
            },

            boxShadow: {
              xs:
                "0 4px 15px rgba(0,0,0,0.08)",
              sm:
                "0 8px 25px rgba(0,0,0,0.12)",
            },
          },
        }}
      >

        {/* Corbeille */}

        <IconButton
          onClick={() =>
            removeFavorite(product._id)
          }

          aria-label="Supprimer des favoris"

          sx={{
            position: "absolute",

            top: {
              xs: 7,
              sm: 8,
            },

            right: {
              xs: 7,
              sm: 8,
            },

            zIndex: 2,

            width: {
              xs: 36,
              sm: 40,
            },

            height: {
              xs: 36,
              sm: 40,
            },

            backgroundColor:
              "rgba(255,255,255,.95)",

            boxShadow:
              "0 2px 8px rgba(0,0,0,.12)",

            "&:hover": {
              backgroundColor:
                "#fff",

              color: "#d32f2f",
            },
          }}
        >
          <DeleteOutlineIcon
            sx={{
              fontSize: {
                xs: 20,
                sm: 22,
              },
            }}
          />
        </IconButton>

        {/* Image */}

        <CardMedia
          component="img"

          image={
            product.imageUrl
              ? endpoint.imageReadProduit(
                  product.imageUrl
                )
              : "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600"
          }

          alt={product.name}

          sx={{
            width: "100%",

            height: {
              xs: 210,
              sm: 220,
              md: 230,
            },

            objectFit: "cover",
          }}
        />

        {/* Informations */}

        <CardContent
          sx={{
            p: {
              xs: 1.5,
              sm: 2,
            },

            flexGrow: 1,
          }}
        >
          {/* Nom */}

          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{
              color: "#16375B",

              fontSize: {
                xs: "0.92rem",
                sm: "1rem",
              },

              lineHeight: 1.35,

              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient:
                "vertical",

              overflow: "hidden",

              minHeight: {
                xs: 39,
                sm: 43,
              },
            }}
          >
            {product.name}
          </Typography>

          {/* Marque */}

          <Typography
            variant="body2"
            sx={{
              color: "#777",

              mt: 0.5,

              fontSize: {
                xs: "0.78rem",
                sm: "0.82rem",
              },

              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow:
                "ellipsis",
            }}
          >
            {product.brand ||
              "Marque non disponible"}
          </Typography>

          {/* Prix */}

          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              color: "#1565C0",

              mt: 1.2,

              fontSize: {
                xs: "1.05rem",
                sm: "1.15rem",
              },
            }}
          >
            {product.price} DT
          </Typography>

          {/* Stock */}

          {outOfStock ? (
            <Chip
              label="Rupture de stock"
              color="error"
              size="small"
              sx={{
                mt: 1.2,

                fontWeight: "bold",

                fontSize: {
                  xs: "0.7rem",
                  sm: "0.75rem",
                },
              }}
            />
          ) : (
            <Typography
              variant="body2"
              sx={{
                color: "#777",

                mt: 0.8,

                fontSize: {
                  xs: "0.75rem",
                  sm: "0.8rem",
                },
              }}
            >
              📦 Stock :{" "}
              {product.quantite}
            </Typography>
          )}
        </CardContent>

        {/* Ajouter au panier */}

        <CardActions
          sx={{
            p: {
              xs: 1.5,
              sm: 2,
            },

            pt: 0,
          }}
        >
          <Button
            fullWidth
            variant="contained"

            startIcon={
              <ShoppingCartIcon
                sx={{
                  fontSize: {
                    xs: 18,
                    sm: 20,
                  },
                }}
              />
            }

            onClick={() =>
              handleAddToCart(product)
            }

            disabled={outOfStock}

            sx={{
              borderRadius: 2,

              textTransform:
                "none",

              fontWeight: "bold",

              fontSize: {
                xs: "0.78rem",
                sm: "0.85rem",
              },

              py: {
                xs: 0.8,
                sm: 1,
              },
            }}
          >
            {outOfStock
              ? "Rupture de stock"
              : "Ajouter au panier"}
          </Button>
        </CardActions>

      </Card>
    );
  })}
</Box>

      )}
    </Box>
  );
};

export default Favoris;