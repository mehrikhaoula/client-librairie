import { useContext, useState } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { endpoint } from "../utils/config";
import { useNavigate } from "react-router-dom";

import {
  toast,
  ToastContainer,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Divider,
} from "@mui/material";

const Checkout = () => {
  const { cart, clearCart } =
    useContext(CartContext);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  });

  const [confirmedOrder, setConfirmedOrder] =
    useState(null);

  const [error, setError] = useState("");

  const [loading, setLoading] =
    useState(false);

  // ==========================================
  // FORMAT PRIX
  // Exemple : 27.5 → 27,5
  // ==========================================

  const formatPrice = (price) => {
    return Number(price)
      .toFixed(1)
      .replace(".", ",");
  };

  // ==========================================
  // TOTAL PANIER
  // ==========================================

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  // ==========================================
  // CHANGE FORM
  // ==========================================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // ENVOYER COMMANDE
  // ==========================================

  const handleSubmit = async () => {
    try {
      setError("");

      // Vérification formulaire

      if (
        !form.firstName ||
        !form.lastName ||
        !form.phone ||
        !form.address
      ) {
        setError(
          "Veuillez remplir tous les champs."
        );

        toast.error(
          "Veuillez remplir tous les champs."
        );

        return;
      }

      // Vérification panier

      if (cart.length === 0) {
        setError(
          "Votre panier est vide."
        );

        toast.error(
          "Votre panier est vide."
        );

        return;
      }

      setLoading(true);

      // ==========================================
      // ENVOI AU BACKEND
      // ==========================================

      const response = await axios.post(
        endpoint.createOrder,
        {
          customer: {
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
      address: form.address,
    },

          items: cart.map((item) => ({
      productId: item._id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    })),

          total: Number(total),
        },
        {
    withCredentials: true,
  },
  
);

      const order = response.data.order;

      

      // ==========================================
      // VIDER LE PANIER
      // ==========================================

      clearCart();

      // ==========================================
      // TOAST SUCCESS 🎉
      // ==========================================

      toast.success(
        "Commande envoyée avec succès 🎉"
      );

      // ==========================================
      // AFFICHER LE BON
      // ==========================================

      setConfirmedOrder(order);

      // Reset formulaire

      setForm({
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
      });

    } catch (err) {
      console.log(err);

      setError(
        "Erreur lors de l'envoi de la commande."
      );

      toast.error(
        "Erreur lors de l'envoi de la commande."
      );

    } finally {
      setLoading(false);
    }
  };

  // ==================================================
  // BON DE COMMANDE
  // ==================================================

  if (confirmedOrder) {
    return (
      <>
        <Container
          maxWidth="sm"
          sx={{
            py: 8,
            pt: 12,
          }}
        >
          <Paper
            sx={{
              p: 4,
              borderRadius: 4,
              border:
                "1px solid #e5e5e5",
            }}
          >
            {/* HEADER */}

            <Box
              textAlign="center"
              mb={3}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                color="success.main"
              >
                ✓ Commande confirmée
              </Typography>

              <Typography
                color="text.secondary"
                mt={1}
              >
                Merci pour votre commande ❤️
              </Typography>
            </Box>

            <Divider />

            {/* NUMERO COMMANDE */}

            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                mt: 3,
                mb: 2,
              }}
            >
              <Typography fontWeight="bold">
                N° Commande
              </Typography>

              <Typography
                fontWeight="bold"
                color="primary"
              >
                #
                {confirmedOrder._id
                  ?.toString()
                  .slice(-8)
                  .toUpperCase()}
              </Typography>
            </Box>

            {/* DATE */}

            <Typography
              fontSize="14px"
              color="text.secondary"
              mb={3}
            >
              Date :{" "}
              {confirmedOrder.createdAt
                ? new Date(
                    confirmedOrder.createdAt
                  ).toLocaleString(
                    "fr-FR"
                  )
                : new Date().toLocaleString(
                    "fr-FR"
                  )}
            </Typography>

            <Divider />

            {/* CLIENT */}

            <Box mt={3}>
              <Typography
                fontWeight="bold"
                mb={1.5}
              >
                Informations client
              </Typography>

              <Typography>
                👤{" "}
                {
                  confirmedOrder.customer
                    .firstName
                }{" "}
                {
                  confirmedOrder.customer
                    .lastName
                }
              </Typography>

              <Typography mt={0.5}>
                📞{" "}
                {
                  confirmedOrder.customer
                    .phone
                }
              </Typography>

              <Typography mt={0.5}>
                📍{" "}
                {
                  confirmedOrder.customer
                    .address
                }
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* ARTICLES */}

            <Typography
              fontWeight="bold"
              mb={2}
            >
              Articles commandés
            </Typography>

            {confirmedOrder.items.map(
              (item, index) => (
                <Box
                  key={
                    item.productId ||
                    index
                  }
                  sx={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    mb: 2,
                    pb: 1.5,
                    borderBottom:
                      "1px solid #eee",
                  }}
                >
                  <Box
                    sx={{
                      minWidth: 0,
                      flex: 1,
                    }}
                  >
                    <Typography
                      fontWeight="600"
                    >
                      {item.name}
                    </Typography>

                    <Typography
                      fontSize="13px"
                      color="text.secondary"
                    >
                      {item.quantity} ×{" "}
                      {formatPrice(
                        item.price
                      )}{" "}
                      DT
                    </Typography>
                  </Box>

                  <Typography
                    fontWeight="bold"
                    sx={{ ml: 2 }}
                  >
                    {formatPrice(
                      item.quantity *
                        item.price
                    )}{" "}
                    DT
                  </Typography>
                </Box>
              )
            )}

            {/* TOTAL */}

            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                mt: 3,
                p: 2,
                borderRadius: 2,
                backgroundColor:
                  "#f7f7f7",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
              >
                TOTAL
              </Typography>

              <Typography
                variant="h5"
                fontWeight="bold"
                color="primary"
              >
                {formatPrice(
                  confirmedOrder.total
                )}{" "}
                DT
              </Typography>
            </Box>

            {/* STATUT */}

            <Box
              sx={{
                mt: 3,
                textAlign: "center",
              }}
            >
              <Typography
                fontSize="14px"
                color="text.secondary"
              >
                Statut de la commande
              </Typography>

              <Typography
                fontWeight="bold"
                color="warning.main"
                mt={0.5}
              >
                {confirmedOrder.status ||
                  "En attente"}
              </Typography>
            </Box>

            {/* MESSAGE */}

            <Typography
              textAlign="center"
              fontSize="13px"
              color="text.secondary"
              mt={3}
            >
              Votre commande a été
              enregistrée avec succès.
            </Typography>

            {/* MES COMMANDES */}

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.4,
                borderRadius: 2,
                fontWeight: "bold",
                textTransform: "none",
              }}
              onClick={() =>
                navigate(
                  "/mes-commandes"
                )
              }
            >
              📦 Voir mes commandes
            </Button>
          </Paper>
        </Container>

        {/* TOAST */}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
        />
      </>
    );
  }

  // ==================================================
  // FORMULAIRE CHECKOUT
  // ==================================================

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          py: 8,
          pt: 12,
        }}
      >
        <Paper
          sx={{
            p: 4,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={4}
            textAlign="center"
          >
            Passer la commande
          </Typography>

          {/* ERROR */}

          {error && (
            <Typography
              color="error"
              textAlign="center"
              sx={{ mb: 2 }}
            >
              {error}
            </Typography>
          )}

          {/* NOM */}

          <TextField
            fullWidth
            label="Nom"
            name="lastName"
            value={form.lastName}
            margin="normal"
            onChange={handleChange}
          />

          {/* PRENOM */}

          <TextField
            fullWidth
            label="Prénom"
            name="firstName"
            value={form.firstName}
            margin="normal"
            onChange={handleChange}
          />

          {/* TELEPHONE */}

          <TextField
            fullWidth
            label="Téléphone"
            name="phone"
            value={form.phone}
            margin="normal"
            onChange={handleChange}
          />

          {/* ADRESSE */}

          <TextField
            fullWidth
            label="Adresse"
            name="address"
            value={form.address}
            margin="normal"
            multiline
            rows={3}
            onChange={handleChange}
          />

          {/* TOTAL */}

          <Box
            mt={4}
            sx={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
            >
              Total
            </Typography>

            <Typography
              variant="h5"
              fontWeight="bold"
              color="primary"
            >
              {formatPrice(total)} DT
            </Typography>
          </Box>

          {/* BUTTON */}

          <Button
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              mt: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: "bold",
            }}
            onClick={handleSubmit}
          >
            {loading
              ? "Envoi en cours..."
              : "Confirmer la commande"}
          </Button>
        </Paper>
      </Container>

      {/* TOAST */}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </>
  );
};

export default Checkout;

/*
import { useContext, useState } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { endpoint } from "../utils/config";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
} from "@mui/material";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    produit: "",
  
  });
  const total = cart.reduce( (sum, item) => sum + item.price * item.quantity,0);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async () => {
  try {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.phone ||
      !form.address
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    await axios.post(endpoint.orders, {
  customer: {
    firstName: form.firstName,
    lastName: form.lastName,
    phone: form.phone,
    address: form.address,
    produit: form.produit,
  },

  items: cart.map((item) => ({
    productId: item._id,
    name: item.name,
    quantity: item.quantity,
    price: item.price,
  })),

  total: Number(total),
});
    clearCart();

    setForm({
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
    });

    alert("Commande envoyée avec succès 🎉\nMerci pour votre confiance ❤️");
  } catch (err) {
    console.log(err);
    alert("Erreur lors de l'envoi de la commande");
  }
};
if (cart.length === 0) {
  alert("Votre panier est vide.");
  return;
};
return (
  <Container maxWidth="sm" sx={{ py: 8 }}>
    <Paper sx={{ p: 4, borderRadius: 4 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        textAlign="center"
      >
        Passer la commande
      </Typography>

      <TextField
        fullWidth
        label="Nom"
        name="lastName"
        value={form.lastName}
        margin="normal"
        onChange={handleChange}
      />

      <TextField
        fullWidth
        label="Prénom"
        name="firstName"
        value={form.firstName}
        margin="normal"
        onChange={handleChange}
      />

      <TextField
        fullWidth
        label="Téléphone"
        name="phone"
        value={form.phone}
        margin="normal"
        onChange={handleChange}
      />

      <TextField
        fullWidth
        label="Adresse"
        name="address"
        value={form.address}
        margin="normal"
        multiline
        rows={3}
        onChange={handleChange}
      />

      <Box mt={4}>
        <Typography variant="h6">
          Total : {total} DT
        </Typography>
      </Box>

      <Button
        fullWidth
        variant="contained"
        size="large"
        sx={{ mt: 4 }}
        onClick={handleSubmit}
      >
        Confirmer la commande
      </Button>
    </Paper>
  </Container>
);
};
export default Checkout;

import React, { createContext, useState, useEffect } from "react";
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);
  const addToCart = (product) => {
    const exists = cart.find(
      (item) => item._id === product._id
    );
    if (exists) {
      setCart(
        cart.map((item) =>
          item._id === product._id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ]);
    }
  };
  const removeFromCart = (id) => {
    setCart(
      cart.filter(
        item => item._id !== id
      )
    );
  };
  const increaseQuantity = (id) => {
    setCart(
      cart.map(item =>
        item._id === id
        ?
        {
          ...item,
          quantity:item.quantity + 1
        }
        :
        item
      )
    );
  };
  const decreaseQuantity = (id) => {
    setCart(
      cart.map(item =>
        item._id === id && item.quantity > 1
        ?
        {
          ...item,
          quantity:item.quantity - 1
        }
        :
        item
      )
    );
  };
  const clearCart = () => {
  setCart([]);
  localStorage.removeItem("cart");
};
  return (
    <CartContext.Provider
      value={{
  cart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
}}
    >
      {children}
    </CartContext.Provider>
  );


};
*/