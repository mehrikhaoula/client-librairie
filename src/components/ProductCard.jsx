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
  Rating,
} from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { endpoint } from "../utils/config";
import { useState } from "react";
import { flyToCart } from "../utils/flyToCart";

const ProductCard = ({
  product,
  favorites,
  toggleFavorite,
  handleOpen,
}) => {
    const { addToCart } = useContext(CartContext);
    const [added,setAdded]=useState(false);
    const handleAdd=()=>{
    addToCart(product);

    setAdded(true);

    setTimeout(()=>{
        setAdded(false);
    },400);
}
  return (
    <Card
  className="product-card"
      sx={{
        height: "100%",
        borderRadius: 5,
        overflow: "hidden",
        position:"relative",
        transition: ".35s",
        boxShadow:"0 10px 30px rgba(0,0,0,.08)",

        "&:hover": {
          boxShadow:"0 18px 45px rgba(0,0,0,.18)",
          transform: "translateY(-10px)",
        },

        "&:hover img": {
transform:"scale(1.12)",
filter:"brightness(1.05)"
},
      }}
    >
      {product.discount>0 && (

<Chip
label={`-${product.discount}%`}
color="error"
sx={{
position:"absolute",
top:15,
left:15,
fontWeight:"bold"
}}
/>

)}
      <CardMedia
  component="img"
  height="280"
  image={
    product.imageUrl
      ? endpoint.imageReadProduit(product.imageUrl)
      : "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600"
  }
  alt={product.name}
  sx={{
    transition: ".4s",
    objectFit: "cover",
  }}
/>

      <CardContent>
        <Chip
          label={product.category}
          color="primary"
          size="small"
          sx={{
            mb: 2,
            fontWeight: "bold",
          }}
        />

        <Typography variant="h6" fontWeight="bold">
          {product.name}
        </Typography>

        <Rating
          value={4.5}
          precision={0.5}
          readOnly
          size="small"
          sx={{ my: 1 }}
        />

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            minHeight: 60,
          }}
        >
          {product.description}
        </Typography>

        <Typography
          variant="h5"
          color="primary"
          fontWeight="bold"
          mt={2}
        >
          {product.price} DT
        </Typography>

{/* إذا المنتج فيه تخفيض استعمل هذا الكود

<Box display="flex" gap={1} alignItems="center">
  <Typography
    sx={{
      textDecoration: "line-through",
      color: "#888",
    }}
  >
    {product.oldPrice} DT
  </Typography>

  <Chip
    label={`-${product.discount}%`}
    color="error"
    size="small"
  />
</Box>

*/}

      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 2,
          pb: 2,
        }}
      >
        <Box>
          <IconButton onClick={() => toggleFavorite(product)}>
            {favorites.find((p) => p._id === product._id) ? (
              <FavoriteIcon
sx={{
transform:
favorites.find((p)=>p._id===product._id)
?"scale(1.3)"
:"scale(1)",

transition:".3s"
}}
/>
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>

          <IconButton onClick={() => handleOpen(product)}>
            <VisibilityIcon color="primary" />
          </IconButton>
        </Box>

        {product.quantite === 0 && (
  <Chip
    label="Rupture de stock"
    color="error"
    sx={{
      mt:2,
      width:"100%",
      fontWeight:"bold"
    }}
  />
)}

        <Button
variant="contained"

startIcon={<ShoppingCartIcon />}
onClick={(e) => {
  flyToCart(e, product);
   setTimeout(() => {
    handleAdd();
  }, 500);
}}
disabled={product.quantite===0}
sx={{
borderRadius:3,
textTransform:"none",

transform:added?"scale(1.15)":"scale(1)",

transition:".25s",

}}
>
{added ? "Ajouté ✓" : "Ajouter"}
</Button>

      </CardActions>
     </Card> 
  );
};

export default ProductCard;