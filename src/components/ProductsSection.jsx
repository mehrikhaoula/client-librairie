import React, {
  useEffect,
  useMemo,
  useState,
  useContext,
} from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { endpoint } from "../utils/config";
import { CartContext } from "../context/CartContext";

const ProductsSection = ({
  selectedCategory,
  search,
  setSearch,
}) => {
  const [products, setProducts] = useState([]);

  const { addToCart } = useContext(CartContext);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [open, setOpen] = useState(false);

  // =========================
  // GET PRODUCTS
  // =========================

  useEffect(() => {
  axios
    .get(endpoint.getAllProduit)
    .then((res) => {
        console.log(
          "📦 PRODUIT :",
          res.data.data[0]
        );

        console.log(
          "🖼️ IMAGE URL :",
          res.data.data[0]?.imageUrl
        );

        setProducts(res.data.data);
      })
      .catch((err) =>
        console.log(err)
      );
  }, []);

  // =========================
  // PRODUCT DETAILS
  // =========================

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // =========================
  // FILTER PRODUCTS
  // =========================

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory =
        selectedCategory === "Toutes" ||
        p.category === selectedCategory;

      const matchSearch = p.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      return (
        matchCategory &&
        matchSearch
      );
    });
  }, [
    products,
    selectedCategory,
    search,
  ]);

  // =========================
  // RENDER
  // =========================

  return (
    <Box
      id="products"
      sx={{
        py: {
          xs: 4,
          md: 6,
        },
        background: "#fff",
      }}
    >
      <Container maxWidth="xl">

        {/* TITLE */}

        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={3}
          sx={{
            color: "#173A69",
            fontFamily: "serif",
            fontSize: {
              xs: "1.7rem",
              sm: "2.1rem",
              md: "2.4rem",
            },
          }}
        >
          {selectedCategory === "Toutes"
            ? "Nos Produits"
            : selectedCategory}
        </Typography>

        {/* SEARCH */}

        <TextField
          fullWidth
          placeholder="Rechercher un produit..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          sx={{
            mb: 5,
          }}
        />

        {/* PRODUCTS */}

        <Grid
          container
          spacing={2}
        >
          {filteredProducts.map(
            (product) => (
              <Grid
                key={product._id}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 3,
                }}
              >
                <ProductCard
                  product={product}
                  handleOpen={handleOpen}
                />
              </Grid>
            )
          )}
        </Grid>

        {/* PRODUCT DETAILS */}

        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
        >
          {selectedProduct && (
            <>
              <DialogTitle
                sx={{
                  fontWeight: "bold",
                  pr: 6,
                  position: "relative",
                }}
              >
                {selectedProduct.name}

                <IconButton
                  onClick={handleClose}
                  sx={{
                    position:
                      "absolute",
                    right: 10,
                    top: 10,
                    color: "#173A69",

                    "&:hover": {
                      background:
                        "#F7EFE5",
                      color: "#C9A66B",
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

                    gridTemplateColumns:
                      {
                        xs: "1fr",
                        md: "1fr 1fr",
                      },

                    gap: 4,
                  }}
                >

                  {/* IMAGE */}

                  <Box>
                    <img
                      src={
                        selectedProduct.imageUrl
                          ? endpoint.imageReadProduit(
                              selectedProduct.imageUrl
                            )
                          : "https://images.unsplash.com/photo-1512820790803-83ca734da0803?w=600"
                      }
                      alt={
                        selectedProduct.name
                      }
                      width="350"
                      style={{
                        maxWidth: "100%",
                        borderRadius:
                          "12px",
                        objectFit:
                          "cover",
                      }}
                    />
                  </Box>

                  {/* INFORMATION */}

                  <Box>

                    <Typography
                      variant="h4"
                      fontWeight="bold"
                    >
                      {
                        selectedProduct.name
                      }
                    </Typography>

                    <Typography
                      color="text.secondary"
                      mt={2}
                    >
                      {
                        selectedProduct.description
                      }
                    </Typography>

                    <Divider
                      sx={{
                        my: 3,
                      }}
                    />

                    <Typography
                      variant="h5"
                    >
                      💰{" "}
                      {
                        selectedProduct.price
                      }{" "}
                      DT
                    </Typography>

                    <Typography
                      mt={2}
                    >
                      📚 Catégorie :{" "}
                      <strong>
                        {
                          selectedProduct.category
                        }
                      </strong>
                    </Typography>

                    <Typography
                      mt={1}
                    >
                      📦 Stock :{" "}
                      <strong>
                        {
                          selectedProduct.quantite ||
                          0
                        }
                      </strong>
                    </Typography>

                    {/* ADD TO CART */}

                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      startIcon={
                        <ShoppingCartIcon />
                      }
                      onClick={() =>
                        addToCart(
                          selectedProduct
                        )
                      }
                      disabled={
                        selectedProduct.quantite ===
                        0
                      }
                      sx={{
                        mt: 3,
                        borderRadius: 2,
                        textTransform:
                          "none",
                      }}
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
