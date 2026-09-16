import React, {
  useContext,
  useState,
} from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { endpoint } from "../utils/config";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  useNavigate,
  Link,
} from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  // =====================================
  // PANIER NORMAL UNIQUEMENT
  // =====================================

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const navigate = useNavigate();
const { isAuthenticated, loading } = useAuth();

  // =====================================
  // DELETE DIALOG
  // =====================================

  const [deleteDialog, setDeleteDialog] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  // =====================================
  // TOTAL
  // =====================================

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price) *
        Number(item.quantity),
    0
  );

  // =====================================
  // CHECKOUT
  // =====================================

  const handleCheckout = () => {
  if (!cart.length) return;

  // Encore en train de vérifier la session
  if (loading) return;

  // User non connecté → Login
  if (!isAuthenticated) {
    navigate("/login", {
      state: {
        from: "/checkout",
      },
    });
    return;
  }

  // User connecté → Checkout
  navigate("/checkout");
};

  // =====================================
  // DELETE
  // =====================================

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProduct) {
      removeFromCart(selectedProduct._id);
    }

    setDeleteDialog(false);
    setSelectedProduct(null);
  };

  const handleCancelDelete = () => {
    setDeleteDialog(false);
    setSelectedProduct(null);
  };

  // =====================================
  // PANIER VIDE
  // =====================================

  if (cart.length === 0) {
    return (
      <Container
        maxWidth="md"
        sx={{
          pt: 12,
          pb: 8,
        }}
      >
        <Typography
          textAlign="center"
          variant="h6"
          color="text.secondary"
        >
          Votre panier est vide 😢
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 3,
          }}
        >
          <Button
            component={Link}
            to="/"
            startIcon={<ArrowBackIcon />}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Continuer vos achats
          </Button>
        </Box>
      </Container>
    );
  }

  // =====================================
  // PANIER NORMAL
  // =====================================

  return (
    <Container
      maxWidth="md"
      sx={{
        pt: 12,
        pb: 8,
      }}
    >
      {/* ================================= */}
      {/* TITRE */}
      {/* ================================= */}

      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
      >
        Mon panier 🛒
      </Typography>

      {/* ================================= */}
      {/* ARTICLES */}
      {/* ================================= */}

      {cart.map((product) => (
        <Box
          key={product._id}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 1.5,
            mb: 1.5,
            borderRadius: 2,
            backgroundColor: "#fff",
            boxShadow:
              "0 1px 6px rgba(0,0,0,0.08)",
            border: "1px solid #f0f0f0",

            // Responsive
            "@media (max-width:600px)": {
              gap: 1,
              p: 1,
            },
          }}
        >
          {/* IMAGE */}

          <img
            src={
              product.imageUrl
                ? endpoint.imageReadProduit(
                    product.imageUrl
                  )
                : "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600"
            }
            alt={product.name}
            style={{
              width: "75px",
              height: "75px",
              objectFit: "cover",
              borderRadius: "8px",
              flexShrink: 0,
            }}
          />

          {/* INFOS */}

          <Box
            sx={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <Typography
              fontWeight="600"
              sx={{
                fontSize: "15px",
                mb: 0.5,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",

                "@media (max-width:600px)":
                  {
                    fontSize: "13px",
                  },
              }}
            >
              {product.name}
            </Typography>

            <Typography
              color="primary"
              fontWeight="bold"
              fontSize="14px"
            >
              {product.price} DT
            </Typography>
          </Box>

          {/* QUANTITE */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ddd",
              borderRadius: "6px",
              height: "34px",
              flexShrink: 0,
            }}
          >
            <IconButton
              size="small"
              onClick={() =>
                decreaseQuantity(product._id)
              }
              sx={{
                p: 0.5,
              }}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>

            <Typography
              sx={{
                minWidth: "25px",
                textAlign: "center",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              {product.quantity}
            </Typography>

            <IconButton
              size="small"
              onClick={() =>
                increaseQuantity(product._id)
              }
              sx={{
                p: 0.5,
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* DELETE */}

          <IconButton
            color="error"
            size="small"
            onClick={() =>
              handleDeleteClick(product)
            }
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}

      <Divider sx={{ my: 3 }} />

      {/* ================================= */}
      {/* TOTAL */}
      {/* ================================= */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          fontSize="18px"
          fontWeight="600"
        >
          Total
        </Typography>

        <Typography
          fontSize="22px"
          fontWeight="bold"
          color="primary"
        >
          {total.toFixed(2)} DT
        </Typography>
      </Box>

      {/* ================================= */}
      {/* PASSER COMMANDE */}
      {/* ================================= */}

      <Button
        onClick={handleCheckout}
        variant="contained"
        fullWidth
        sx={{
          mt: 3,
          py: 1.4,
          borderRadius: 2,
          fontWeight: "bold",
          textTransform: "none",
        }}
      >
        Passer la commande
      </Button>

      {/* ================================= */}
      {/* CONTINUER ACHATS */}
      {/* ================================= */}

      <Button
        component={Link}
        to="/"
        startIcon={<ArrowBackIcon />}
        sx={{
          mt: 2,
          textTransform: "none",
          fontWeight: "bold",
        }}
      >
        Continuer vos achats
      </Button>

      {/* ================================= */}
      {/* DIALOG DELETE */}
      {/* ================================= */}

      <Dialog
        open={deleteDialog}
        onClose={handleCancelDelete}
      >
        <DialogTitle fontWeight="bold">
          Supprimer cet article ?
        </DialogTitle>

        <DialogContent>
          <Typography>
            Voulez-vous vraiment supprimer{" "}
            <strong>
              {selectedProduct?.name}
            </strong>{" "}
            de votre panier ?
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleCancelDelete}
            color="inherit"
          >
            Annuler
          </Button>

          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Cart;