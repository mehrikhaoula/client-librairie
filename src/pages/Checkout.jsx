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