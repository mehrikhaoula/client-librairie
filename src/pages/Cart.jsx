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
  Link, useLocation,
} from "react-router-dom";

import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import UserLogin from "./UserLogin";

const Cart = () => {
  // =====================================================
  // CONTEXTS
  // =====================================================

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const {
    isAuthenticated,
    loading,
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // =====================================================
  // LOGIN MODAL
  // =====================================================

  const [loginOpen, setLoginOpen] = useState(false);
  React.useEffect(() => {
  if (location.state?.fromLogin) {
    setLoginOpen(true);

    // نمسح الـstate باش refresh ما يعاودش يفتح Login
    navigate("/cart", {
      replace: true,
      state: {},
    });
  }
}, [location, navigate]);

  // =====================================================
  // DELETE DIALOG
  // =====================================================

  const [deleteDialog, setDeleteDialog] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  // =====================================================
  // TOTAL
  // =====================================================

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price) *
        Number(item.quantity),
    0
  );

  // =====================================================
  // CHECKOUT
  // =====================================================

  const handleCheckout = () => {
    // Panier vide
    if (!cart.length) return;

    // Vérification de la session en cours
    if (loading) return;

    // Utilisateur non connecté
    if (!isAuthenticated) {
      setLoginOpen(true);
      return;
    }

    // Utilisateur connecté
    navigate("/checkout");
  };

  // =====================================================
  // APRÈS LOGIN RÉUSSI
  // =====================================================

  const handleLoginSuccess = () => {
    setLoginOpen(false);

    navigate("/checkout");
  };

  // =====================================================
  // DELETE
  // =====================================================

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

  // =====================================================
  // PANIER VIDE
  // =====================================================

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

  // =====================================================
  // PANIER NORMAL
  // =====================================================

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          pt: {
            xs: 10,
            sm: 12,
          },
          pb: 8,
          px: {
            xs: 2,
            sm: 3,
          },
        }}
      >
        {/* =================================================
            TITRE
        ================================================= */}

        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
          sx={{
            fontSize: {
              xs: "24px",
              sm: "28px",
            },
          }}
        >
          Mon panier 🛒
        </Typography>

        {/* =================================================
            ARTICLES
        ================================================= */}

        {cart.map((product) => (
          <Box
            key={product._id}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: {
                xs: 1,
                sm: 2,
              },

              p: {
                xs: 1,
                sm: 1.5,
              },

              mb: 1.5,

              borderRadius: {
                xs: 2,
                sm: 3,
              },

              backgroundColor: "#fff",

              boxShadow:
                "0 4px 16px rgba(15, 23, 42, 0.07)",

              border:
                "1px solid rgba(226, 232, 240, 0.8)",

              transition: "0.2s ease",

              "&:hover": {
                boxShadow:
                  "0 6px 22px rgba(15, 23, 42, 0.11)",
              },
            }}
          >
            {/* =================================================
                IMAGE
            ================================================= */}

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
                width: {
                  xs: 62,
                  sm: 78,
                },

                height: {
                  xs: 62,
                  sm: 78,
                },

                objectFit: "cover",
                borderRadius: "10px",
                flexShrink: 0,
              }}
            />

            {/* =================================================
                INFORMATIONS
            ================================================= */}

            <Box
              sx={{
                flex: 1,
                minWidth: 0,
              }}
            >
              <Typography
                fontWeight="600"
                sx={{
                  fontSize: {
                    xs: "13px",
                    sm: "15px",
                  },

                  mb: 0.5,

                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {product.name}
              </Typography>

              <Typography
                color="primary"
                fontWeight="bold"
                sx={{
                  fontSize: {
                    xs: "13px",
                    sm: "14px",
                  },
                }}
              >
                {product.price} DT
              </Typography>
            </Box>

            {/* =================================================
                QUANTITÉ
            ================================================= */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",

                border: "1px solid #e2e8f0",
                borderRadius: "8px",

                height: {
                  xs: "30px",
                  sm: "34px",
                },

                flexShrink: 0,
              }}
            >
              <IconButton
                size="small"
                onClick={() =>
                  decreaseQuantity(product._id)
                }
                sx={{
                  p: {
                    xs: 0.25,
                    sm: 0.5,
                  },
                }}
              >
                <RemoveIcon
                  sx={{
                    fontSize: {
                      xs: 15,
                      sm: 18,
                    },
                  }}
                />
              </IconButton>

              <Typography
                sx={{
                  minWidth: {
                    xs: "20px",
                    sm: "25px",
                  },

                  textAlign: "center",

                  fontSize: {
                    xs: "12px",
                    sm: "14px",
                  },

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
                  p: {
                    xs: 0.25,
                    sm: 0.5,
                  },
                }}
              >
                <AddIcon
                  sx={{
                    fontSize: {
                      xs: 15,
                      sm: 18,
                    },
                  }}
                />
              </IconButton>
            </Box>

            {/* =================================================
                DELETE
            ================================================= */}

            <IconButton
              color="error"
              size="small"
              onClick={() =>
                handleDeleteClick(product)
              }
              sx={{
                flexShrink: 0,
              }}
            >
              <DeleteIcon
                sx={{
                  fontSize: {
                    xs: 19,
                    sm: 22,
                  },
                }}
              />
            </IconButton>
          </Box>
        ))}

        <Divider sx={{ my: 3 }} />

        {/* =================================================
            TOTAL
        ================================================= */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "16px",
                sm: "18px",
              },

              fontWeight: "600",
            }}
          >
            Total
          </Typography>

          <Typography
            color="primary"
            fontWeight="bold"
            sx={{
              fontSize: {
                xs: "20px",
                sm: "24px",
              },
            }}
          >
            {total.toFixed(2)} DT
          </Typography>
        </Box>

        {/* =================================================
            PASSER COMMANDE
        ================================================= */}

        <Button
          onClick={handleCheckout}
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            mt: 3,
            py: 1.4,

            borderRadius: "12px",

            fontWeight: "bold",
            textTransform: "none",

            fontSize: "15px",

            background:
              "linear-gradient(135deg, #779dc9ff 0%, #21263fff 100%)",

            boxShadow:
              "0 8px 20px rgba(8, 2, 46, 0.22)",

            "&:hover": {
              background:
                "linear-gradient(135deg, #463683ff 0%, #330f75ff 100%)",

              boxShadow:
                "0 10px 25px rgba(125, 96, 61, 0.30)",
            },
          }}
        >
          {loading
            ? "Vérification..."
            : "Passer la commande"}
        </Button>

        {/* =================================================
            CONTINUER LES ACHATS
        ================================================= */}

        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{
            mt: 2,

            textTransform: "none",
            fontWeight: "bold",

            color: "#64748b",

            "&:hover": {
              backgroundColor: "transparent",
              color: "#8a6a45",
            },
          }}
        >
          Continuer vos achats
        </Button>

        {/* =================================================
            DIALOG DELETE
        ================================================= */}

        <Dialog
          open={deleteDialog}
          onClose={handleCancelDelete}
          PaperProps={{
            sx: {
              borderRadius: "18px",
              width: "100%",
              maxWidth: "420px",
              mx: 2,
            },
          }}
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

          <DialogActions
            sx={{
              p: 2,
              gap: 1,
            }}
          >
            <Button
              onClick={handleCancelDelete}
              color="inherit"
              sx={{
                textTransform: "none",
              }}
            >
              Annuler
            </Button>

            <Button
              onClick={handleConfirmDelete}
              color="error"
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: "9px",
              }}
            >
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </Container>

      {/* =====================================================
          LOGIN MODAL
      ===================================================== */}

      <UserLogin
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Cart;