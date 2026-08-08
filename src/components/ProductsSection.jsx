import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { endpoint } from "../utils/config";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductsSection = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);
  const toggleFavorite = (product) => {

    const exists = favorites.find(
      (p) => p._id === product._id
    );

    if (exists) {
      setFavorites(
        favorites.filter(
          (p) => p._id !== product._id
        )
      );
    } else {
      setFavorites([
        ...favorites,
        product
      ]);
    }
  };
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);

const handleOpen = (product) => {
  setSelectedProduct(product);
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

  useEffect(() => {
    axios
      .get("http://localhost:3010/api/produits")
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory =
  selectedCategory === "Toutes" ||
  p.category === selectedCategory;

      const matchSearch = p.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, search]);

  return (
    
    <Box sx={{ py: 8, background: "#fff" }}
     id="products">
      
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={4}
        >
          {selectedCategory || "Nos Produits"}
        </Typography>

        <TextField
          fullWidth
          placeholder="Rechercher un produit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 5 }}
        />

        <Grid container spacing={4}>
  {filteredProducts.map((product) => (
    <Grid item xs={12} sm={6} md={4} key={product._id}>
      <ProductCard
        product={product}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        handleOpen={handleOpen}
      />
    </Grid>
  ))}
</Grid>
        <Dialog
  open={open}
  onClose={handleClose}
  maxWidth="md"
  fullWidth
>
  {selectedProduct && (
    <>
      <DialogTitle fontWeight="bold">
        {selectedProduct.name}
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
          }}
        >
          <Box>

            <img
  src={
    selectedProduct.imageUrl
      ? endpoint.imageReadProduit(selectedProduct.imageUrl)
      : "https://images.unsplash.com/photo-1512820790803-83ca734da0803?w=600"
  }
  alt={selectedProduct.name}
  width="350"
  style={{
    borderRadius: "12px",
    objectFit: "cover",
  }}
/>

          </Box>

          <Box>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              {selectedProduct.name}
            </Typography>

            <Typography
              color="text.secondary"
              mt={2}
            >
              {selectedProduct.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5">
              💰 {selectedProduct.price} DT
            </Typography>

            <Typography mt={2}>
              📚 Catégorie :
              {" "}
              <strong>
                {selectedProduct.category}
              </strong>
            </Typography>

            <Typography mt={1}>
  📦 Stock :{" "}
  <strong>
    {selectedProduct.quantite || 0}
  </strong>
</Typography>

            <Button
 fullWidth
 variant="contained"
 size="large"
 startIcon={<ShoppingCartIcon />}
 onClick={() => addToCart(selectedProduct)}
>
 Ajouter au panier
</Button>

          </Box>
        </Box>

      </DialogContent>
    </>
  )}
</Dialog>
      </Container>
    </Box>
  );
};

export default ProductsSection;