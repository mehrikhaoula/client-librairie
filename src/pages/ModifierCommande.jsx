import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { CartContext } from "../context/CartContext";
import { endpoint } from "../utils/config";

const ModifierCommande = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    editingOrder,
    editingCart,
    startEditingOrder,
    cancelEditingOrder,
    removeFromEditingCart,
    increaseEditingQuantity,
    decreaseEditingQuantity,
  } = useContext(CartContext);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // =====================================
  // CHARGER LA COMMANDE
  // =====================================

  useEffect(() => {
    const loadOrder = async () => {
      try {
        // Commande déjà envoyée depuis MesCommandes
        if (
          location.state?.editOrder &&
          location.state.editOrder._id === id
        ) {
          startEditingOrder(location.state.editOrder);
          setLoading(false);
          return;
        }

        // Commande déjà présente en session
        if (
          editingOrder &&
          editingOrder._id === id
        ) {
          setLoading(false);
          return;
        }

        // Sinon on recharge depuis le backend
        const response = await axios.get(
          endpoint.orderById(id),
          {
            withCredentials: true,
          }
        );

        startEditingOrder(response.data);
      } catch (error) {
        console.error(
          "Erreur chargement commande :",
          error
        );

        alert(
          error.response?.data?.message ||
            "Impossible de charger la commande."
        );

        navigate("/mes-commandes");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [
    id,
    location.state,
    editingOrder,
    startEditingOrder,
    navigate,
  ]);

  // =====================================
  // TOTAL
  // =====================================

  const total = editingCart.reduce(
    (sum, item) =>
      sum +
      Number(item.price) *
        Number(item.quantity),
    0
  );

  // =====================================
  // ENREGISTRER
  // =====================================

  const handleSave = async () => {
    if (!editingOrder) return;

    if (editingCart.length === 0) {
      alert(
        "La commande doit contenir au moins un article."
      );
      return;
    }

    try {
      setSaving(true);

      const items = editingCart.map((item) => ({
        productId:
          item.productId || item._id,
        name: item.name,
        quantity: Number(item.quantity),
        price: Number(item.price),
      }));

      await axios.put(
        `${endpoint.myOrders}/${editingOrder._id}`,
        { items },
        {
          withCredentials: true,
        }
      );

      alert(
        "Votre commande a été modifiée avec succès."
      );

      cancelEditingOrder();

      navigate("/mes-commandes");
    } catch (error) {
      console.error(
        "Erreur modification commande :",
        error
      );

      alert(
        error.response?.data?.message ||
          "Impossible de modifier la commande."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================
  // ANNULER
  // =====================================

  const handleCancel = () => {
    cancelEditingOrder();
    navigate("/mes-commandes");
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>
          Chargement de la commande...
        </Typography>
      </Box>
    );
  }

  if (!editingOrder) {
    return null;
  }

  return (
    <Box
      sx={{
        maxWidth: 1000,
        mx: "auto",
        px: { xs: 2, sm: 3 },
        py: 5,
      }}
    >
      {/* HEADER */}

      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/mes-commandes")}
        sx={{
          mb: 3,
          textTransform: "none",
        }}
      >
        Retour à mes commandes
      </Button>

      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          mb: 1,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        Modifier ma commande
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Commande #{editingOrder._id.slice(-8)}
      </Typography>

      {/* ARTICLES */}

      {editingCart.map((item) => (
        <Card
          key={item._id}
          sx={{
            mb: 2,
            borderRadius: 3,
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography
                  fontWeight="bold"
                >
                  {item.name}
                </Typography>

                <Typography
                  color="text.secondary"
                >
                  {Number(item.price).toFixed(2)} DT
                </Typography>
              </Box>

              {/* QUANTITÉ */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  borderRadius: 2,
                }}
              >
                <IconButton
                  onClick={() =>
                    decreaseEditingQuantity(
                      item._id
                    )
                  }
                >
                  <RemoveIcon />
                </IconButton>

                <Typography
                  sx={{
                    minWidth: 30,
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {item.quantity}
                </Typography>

                <IconButton
                  onClick={() =>
                    increaseEditingQuantity(
                      item._id
                    )
                  }
                >
                  <AddIcon />
                </IconButton>
              </Box>

              {/* SUPPRIMER */}

              <IconButton
                color="error"
                onClick={() =>
                  removeFromEditingCart(
                    item._id
                  )
                }
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}

      {/* CONTINUER ACHATS */}

      <Button
        variant="outlined"
        startIcon={<ShoppingCartIcon />}
        onClick={() => navigate("/")}
        sx={{
          mt: 2,
          textTransform: "none",
          borderRadius: 2,
        }}
      >
        Continuer vos achats
      </Button>

      <Divider sx={{ my: 4 }} />

      {/* TOTAL */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6">
          Nouveau total
        </Typography>

        <Typography
          variant="h5"
          fontWeight="bold"
        >
          {total.toFixed(2)} DT
        </Typography>
      </Box>

      {/* ACTIONS */}

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        <Button
          variant="outlined"
          fullWidth
          onClick={handleCancel}
          sx={{
            py: 1.4,
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Annuler
        </Button>

        <Button
          variant="contained"
          fullWidth
          startIcon={<SaveIcon />}
          onClick={handleSave}
          disabled={saving}
          sx={{
            py: 1.4,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          {saving
            ? "Enregistrement..."
            : "Enregistrer les modifications"}
        </Button>
      </Box>
    </Box>
  );
};

export default ModifierCommande;