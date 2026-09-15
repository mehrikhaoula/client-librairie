import React, { useContext } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { CartContext } from "../context/CartContext";
import { endpoint } from "../utils/config";

const ProductDetailsDialog = ({
  product,
  open,
  onClose,
  accent = "#173A69",
  soft = "#F7EFE5",
}) => {
  const { addToCart } = useContext(CartContext);

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle
        sx={{
          fontWeight: "bold",
          color: "#243447",
          pr: 6,
          position: "relative",
        }}
      >
        {product.name}

        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 10,
            top: 10,
            color: "#243447",

            "&:hover": {
              background: soft,
              color: accent,
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            gap: 4,
            py: 2,
          }}
        >
          {/* IMAGE */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Box
              component="img"
              src={
                product.imageUrl
                  ? endpoint.imageReadProduit(
                      product.imageUrl
                    )
                  : "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600"
              }
              alt={product.name}
              sx={{
                width: "100%",
                maxWidth: 400,
                maxHeight: 450,
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
          </Box>

          {/* INFORMATIONS */}

          <Box>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="#243447"
              sx={{
                fontSize: {
                  xs: "1.6rem",
                  md: "2rem",
                },
              }}
            >
              {product.name}
            </Typography>

            {product.brand && (
              <Typography
                color="text.secondary"
                sx={{
                  mt: 1,
                  fontWeight: 500,
                }}
              >
                Marque : {product.brand}
              </Typography>
            )}

            <Typography
              color="text.secondary"
              sx={{
                mt: 3,
                lineHeight: 1.8,
              }}
            >
              {product.description ||
                "Aucune description disponible."}
            </Typography>

            <Divider
              sx={{
                my: 3,
              }}
            />

            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                color: accent,
              }}
            >
              {product.price} DT
            </Typography>

            <Typography
              sx={{
                mt: 2,
              }}
            >
              📚 Catégorie :{" "}
              <strong>
                {product.category}
              </strong>
            </Typography>

            <Typography
              sx={{
                mt: 1,
              }}
            >
              📦 Stock :{" "}
              <strong>
                {product.quantite || 0}
              </strong>
            </Typography>

            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={
                <ShoppingCartIcon />
              }
              disabled={
                product.quantite === 0
              }
              onClick={handleAddToCart}
              sx={{
                mt: 4,
                py: 1.5,
                background: accent,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,

                "&:hover": {
                  background: accent,
                  filter: "brightness(.9)",
                },
              }}
            >
              Ajouter au panier
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;