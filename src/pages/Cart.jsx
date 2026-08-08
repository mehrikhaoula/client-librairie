import React, { useContext } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);
  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );
  
  return (
    <Container
  maxWidth="lg"
  sx={{
    pt: 12,
    pb: 8,
  }}
>
      {
        cart.length === 0 ?
        (
          <Typography
            textAlign="center"
            variant="h6"
            color="text.secondary"
          >
            Votre panier est vide 😢
          </Typography>
        )
        :
        (
        <>
        {
          cart.map((product)=>(
            <Box
              key={product._id}
              sx={{
                display:"flex",
                alignItems:"center",
                gap:3,
                mb:3,
                p:2,
                borderRadius:3,
                boxShadow:2
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                width="120"
                height="120"
                style={{
                  objectFit:"cover",
                  borderRadius:15
                }}
              />
              <Box sx={{flex:1}}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  {product.name}
                </Typography>
                <Typography>
                  {product.price} DT
                </Typography>
                <Box
                  sx={{
                    display:"flex",
                    alignItems:"center",
                    mt:2
                  }}
                >
                  <IconButton
                    onClick={() =>
                      decreaseQuantity(product._id)
                    }
                  >
                    <RemoveIcon/>
                  </IconButton>
                  <Typography>
                    {product.quantity}
                  </Typography>
                  <IconButton
                    onClick={() =>
                      increaseQuantity(product._id)
                    }
                  >
                    <AddIcon/>
                  </IconButton>
                </Box>
              </Box>
              <IconButton
                color="error"
                onClick={() =>
                  removeFromCart(product._id)
                }
              >
                <DeleteIcon/>
              </IconButton>
            </Box>
          ))
        }

        <Divider sx={{my:4}} />
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="right"
        >
          Total : {total} DT
        </Typography>
        <Button
  component={Link}
  to="/checkout"
  variant="contained"
  fullWidth
  sx={{ mt: 3 }}
>
  Passer la commande
</Button>

<Button
  component={Link}
  to="/products"
  startIcon={<ArrowBackIcon />}
  sx={{
    mb: 3,
    textTransform: "none",
    fontWeight: "bold",
  }}
>
  Continuer vos achats
</Button>

        </>
        )
      }
    </Container>
  );
};
export default Cart;