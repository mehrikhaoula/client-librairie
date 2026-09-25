import React, {useCallback, useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";

import { useNavigate } from "react-router-dom";
import { endpoint } from "../utils/config";
import UserLogin from "./UserLogin";

const MesCommandes = () => {
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // =====================================
// RÉCUPÉRER LES COMMANDES
// =====================================

const fetchOrders = useCallback(async () => {
  try {
    setLoading(true);
    const response = await axios.get(
      endpoint.myOrders,
      {
        withCredentials: true,
      }
    );
    setConnected(true);

    setOrders(
      response.data?.orders ||
        response.data ||
        []
    );
  } catch (error) {

    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401
    ) {
      setConnected(false);
      setLoginOpen(true);

      return;
    }

    setConnected(true);
    setOrders([]);
  } finally {
    setLoading(false);
  }
}, []);

// =====================================
// CHARGEMENT INITIAL
// =====================================

useEffect(() => {
  fetchOrders();
}, [fetchOrders]);

  // =====================================
  // Vérifier le statut
  // =====================================

  const getOrderStatus = (order) => {
    return (
      order.status
        ?.toString()
        .trim()
        .toLowerCase() || "en attente"
    );
  };

  const isPending = (order) => {
    return (
      getOrderStatus(order) ===
      "en attente"
    );
  };

  const isConfirmed = (order) => {
    return (
      getOrderStatus(order) ===
      "confirmée"
    );
  };

  // =====================================
// FILTRES
// =====================================

const filteredOrders = orders.filter((order) => {
  // ============================
  // FILTRE STATUT
  // ============================

  const status = getOrderStatus(order);

  const matchesStatus =
    statusFilter === "all" ||
    status === statusFilter;

  // ============================
  // FILTRE DATE
  // ============================

  if (dateFilter === "all") {
    return matchesStatus;
  }

  if (!order.createdAt) {
    return false;
  }

  const orderDate = new Date(order.createdAt);
  const now = new Date();

  let startDate = new Date(now);

  if (dateFilter === "today") {
    startDate.setHours(0, 0, 0, 0);
  }

  if (dateFilter === "7days") {
    startDate.setDate(now.getDate() - 7);
  }

  if (dateFilter === "30days") {
    startDate.setDate(now.getDate() - 30);
  }

  return (
    matchesStatus &&
    orderDate >= startDate &&
    orderDate <= now
  );
});

  // =====================================
  // Modifier une commande
  // =====================================

const handleEditOrder = (order) => {

  navigate(`/modifier-commande/${order._id}`, {
    state: {
      editOrder: order,
    },
  });
};

  // =====================================
  // Loading
  // =====================================

  if (loading) {
    return (
      <Container
        maxWidth="md"
        sx={{
          pt: 14,
          pb: 8,
          textAlign: "center",
        }}
      >
        <CircularProgress />

        <Typography
          sx={{ mt: 2 }}
          color="text.secondary"
        >
          Chargement de vos commandes...
        </Typography>
      </Container>
    );
  }

  // =====================================
  // Non connecté
  // =====================================

  if (!connected) {
  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          pt: 14,
          pb: 8,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={2}
        >
          Connectez-vous pour voir vos commandes 🔐
        </Typography>

        <Typography
          color="text.secondary"
          mb={3}
        >
          Connectez-vous à votre compte pour consulter vos commandes.
        </Typography>

        <Button
          variant="contained"
          onClick={() => setLoginOpen(true)}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            fontWeight: "bold",
          }}
        >
          Se connecter
        </Button>
      </Container>

      <UserLogin
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={fetchOrders}
      />
    </>
  );
}
  // =====================================
  // Aucune commande
  // =====================================

  if (orders.length === 0) {
    return (
      <Container
        maxWidth="md"
        sx={{
          pt: 14,
          pb: 8,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={2}
        >
          Mes commandes 📦
        </Typography>


        <Typography
          color="text.secondary"
          mb={3}
        >
          Vous n'avez encore passé aucune
          commande.
        </Typography>

        <Button
          variant="contained"
          onClick={() =>
            navigate("/")
          }
          sx={{
            textTransform: "none",
            borderRadius: 2,
            fontWeight: "bold",
          }}
        >
          Découvrir nos produits
        </Button>
      </Container>
    );
  }

  // =====================================
  // Affichage commandes
  // =====================================

  return (
    <>
    <Container
      maxWidth="md"
      sx={{
        pt: 14,
        pb: 8,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
      >
        Mes commandes 📦
      </Typography>

      <Box
  sx={{
    display: "flex",
    gap: 2,
    flexWrap: "wrap",
    mb: 4,
  }}
>
  {/* FILTRE DATE */}
  <Box sx={{ flex: 1, minWidth: 180 }}>
    <Typography
      fontSize="14px"
      fontWeight="600"
      mb={0.5}
    >
      Date
    </Typography>

    <select
      value={dateFilter}
      onChange={(e) =>
        setDateFilter(e.target.value)
      }
      style={{
        width: "100%",
        padding: "10px 12px",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        background: "white",
        fontSize: "14px",
      }}
    >
      <option value="all">
        Toutes les dates
      </option>

      <option value="today">
        Aujourd'hui
      </option>

      <option value="7days">
        7 derniers jours
      </option>

      <option value="30days">
        30 derniers jours
      </option>
    </select>
  </Box>

  {/* FILTRE STATUT */}
  <Box sx={{ flex: 1, minWidth: 180 }}>
    <Typography
      fontSize="14px"
      fontWeight="600"
      mb={0.5}
    >
      Statut
    </Typography>

    <select
      value={statusFilter}
      onChange={(e) =>
        setStatusFilter(e.target.value)
      }
      style={{
        width: "100%",
        padding: "10px 12px",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        background: "white",
        fontSize: "14px",
      }}
    >
      <option value="all">
        Tous les statuts
      </option>

      <option value="en attente">
        En attente
      </option>

      <option value="confirmée">
        Confirmée
      </option>

      <option value="livrée">
        livrée
      </option>
    </select>
  </Box>
</Box>

      {filteredOrders.map((order, index) => {
        const pending =
          isPending(order);

        const confirmed =
          isConfirmed(order);

        return (
          <Paper
            key={order._id || index}
            elevation={3}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
            }}
          >
            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}

            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: {
                  xs: "flex-start",
                  sm: "center",
                },
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
                gap: 1,
              }}
            >
              <Box>
                <Typography
                  fontWeight="bold"
                  fontSize="18px"
                >
                  Commande #
                  {order._id
                    ?.toString()
                    .slice(-8)}
                </Typography>

                <Typography
                  color="text.secondary"
                  fontSize="14px"
                >
                  {order.createdAt
                    ? new Date(
                        order.createdAt
                      ).toLocaleDateString(
                        "fr-FR"
                      )
                    : "Date inconnue"}
                </Typography>
              </Box>

              {/* STATUT */}

              <Typography
                sx={{
                  fontWeight: "bold",
                  color: pending
                    ? "#f59e0b"
                    : confirmed
                    ? "#16a34a"
                    : "text.primary",
                }}
              >
                {pending
                  ? "🟠 En attente"
                  : confirmed
                  ? "🟢 Confirmée"
                  : order.status}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* ================================= */}
            {/* PRODUITS */}
            {/* ================================= */}

            {order.items?.map(
              (item, itemIndex) => (
                <Box
                  key={
                    item.productId ||
                    itemIndex
                  }
                  sx={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "center",
                    py: 1,
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <Typography
                      fontWeight="600"
                      sx={{
                        overflow:
                          "hidden",
                        textOverflow:
                          "ellipsis",
                        whiteSpace:
                          "nowrap",
                      }}
                    >
                      {item.name}
                    </Typography>

                    <Typography
                      color="text.secondary"
                      fontSize="14px"
                    >
                      Quantité :{" "}
                      {item.quantity}
                    </Typography>
                  </Box>

                  <Typography
                    fontWeight="bold"
                    sx={{
                      whiteSpace:
                        "nowrap",
                    }}
                  >
                    {(
                      Number(
                        item.price
                      ) *
                      Number(
                        item.quantity
                      )
                    ).toFixed(2)}{" "}
                    DT
                  </Typography>
                </Box>
              )
            )}

            <Divider sx={{ my: 2 }} />

            {/* ================================= */}
            {/* TOTAL */}
            {/* ================================= */}

            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                fontWeight="bold"
              >
                Total
              </Typography>

              <Typography
                variant="h6"
                fontWeight="bold"
                color="primary"
              >
                {Number(
                  order.total || 0
                ).toFixed(2)}{" "}
                DT
              </Typography>
            </Box>

            {/* ================================= */}
            {/* ACTION */}
            {/* ================================= */}

            {pending && (
              <Button
                variant="outlined"
                fullWidth
                startIcon={<EditIcon />}
                onClick={() =>
                  handleEditOrder(order)
                }
                sx={{
                  mt: 3,
                  py: 1.2,
                  borderRadius: 2,
                  fontWeight: "bold",
                  textTransform:
                    "none",
                }}
              >
                Modifier la commande
              </Button>
            )}

            {confirmed && (
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  gap: 1,
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor:
                    "#f0fdf4",
                  color: "#15803d",
                }}
              >
                <LockIcon fontSize="small" />

                <Typography
                  fontSize="14px"
                  fontWeight="600"
                >
                  Cette commande est confirmée
                  et ne peut plus être modifiée.
                </Typography>
              </Box>
            )}
          </Paper>
        );
      })}
    </Container>

    <UserLogin
  open={loginOpen}
  onClose={() => setLoginOpen(false)}
  onSuccess={fetchOrders}
/>
</>
  );
};

export default MesCommandes;
