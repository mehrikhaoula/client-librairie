import React, { useContext, useEffect, useMemo, useState,} from "react";
import {
  Box, Button, CircularProgress, Container, Dialog, DialogContent,
  DialogTitle, Divider, IconButton, MenuItem, Select, Typography,
} from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ProductCard from "../components/ProductCard";
import { FavoritesContext,} from "../context/FavoritesContext";
import { CartContext,} from "../context/CartContext";
import { endpoint } from "../utils/config";
import CategoryNavigation from "../components/CategoryNavigation";

// =====================================================
// CATEGORY CONFIG
// =====================================================

const CATEGORY_CONFIG = {

  "beaux-arts": {
  name: "BEAUX-ARTS",
  title: "L'art commence ici.",
  description:
    "Peinture, dessin et matériel artistique pour donner vie à vos idées.",
  image: "/beaux-art.jpg",
  accent: "#C9785A",
  soft: "#F4E1D8",
},

  "loisirs-creatifs": {
    name: "LOISIRS CRÉATIFS",
    title: "Imaginez. Créez. Partagez.",
    description:
      "Tout ce qu'il faut pour vos créations DIY et vos projets créatifs.",
    image:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1000",
    accent: "#9B849B",
    soft: "#EAE1EA",
  },

  "fourniture-bougies": {
    name: "FOURNITURE BOUGIES",
    title: "Créez une ambiance unique.",
    description:
      "Fournitures et accessoires pour créer vos propres bougies.",
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=1000",
    accent: "#B88A63",
    soft: "#F0E3D5",
  },

  papiers: {
    name: "PAPIERS",
    title: "Le papier, votre terrain de jeu.",
    description:
      "Une sélection de papiers pour vos projets créatifs et professionnels.",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1000",
    accent: "#8FA493",
    soft: "#E4ECE6",
  },

  etudiants: {
    name: "Étudiants",
    title: "Tout pour vos études.",
    description:
      "Les essentiels pour travailler, apprendre et organiser votre quotidien.",
    image:
      "https://images.unsplash.com/photo-1453738773917-9c3eff1db985?w=1000",
    accent: "#6686A3",
    soft: "#E2EAF1",
  },

  "couture-stylisme": {
    name: "Couture- Stylisme",
    title: "Exprimez votre style.",
    description:
      "Tout pour vos projets de couture, mode et stylisme.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000",
    accent: "#A77C8B",
    soft: "#EDE0E4",
  },

};


// =====================================================
// COMPONENT
// =====================================================

const CategoryPage = () => {

  const {
    category,
  } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  // ===================================================
  // CONTEXT
  // ===================================================

  const {
    favorites,
    toggleFavorite,
  } = useContext(FavoritesContext);

  const {
    addToCart,
  } = useContext(CartContext);


  // ===================================================
  // STATES
  // ===================================================

  const [
    products,
    setProducts,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    visibleCount,
    setVisibleCount,
  ] = useState(24);

  const [
    sort,
    setSort,
  ] = useState("default");

  const [
    selectedProduct,
    setSelectedProduct,
  ] = useState(null);

  const [
    open,
    setOpen,
  ] = useState(false);


  // ===================================================
  // CATEGORY
  // ===================================================

  const config =
    CATEGORY_CONFIG[category];


  // ===================================================
  // FETCH PRODUCTS
  // ===================================================

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        setLoading(true);

        const response = await axios.get(
  endpoint.getAllProduit
);

        setProducts(
          response.data.data || []
        );

      } catch (error) {

        console.error(
          "Erreur récupération produits :",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);

    // ===================================================
  // CATEGORY CHANGE ANIMATION + RESET
  // ===================================================

  useEffect(() => {
    setVisibleCount(24);
    setSort("default");
    setOpen(false);
    setSelectedProduct(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [category, location.pathname]);


  // ===================================================
  // FILTER + SORT
  // ===================================================

  const categoryProducts =
    useMemo(() => {

      if (!config) {
        return [];
      }

      let result =
        products.filter(
          (product) =>
            product.category
              ?.trim()
              .toLowerCase() ===
            config.name
              .trim()
              .toLowerCase()
        );


      // Prix croissant
      if (sort === "price-asc") {

        result.sort(
          (a, b) =>
            Number(a.price) -
            Number(b.price)
        );

      }


      // Prix décroissant
      if (sort === "price-desc") {

        result.sort(
          (a, b) =>
            Number(b.price) -
            Number(a.price)
        );

      }


      // Nom
      if (sort === "name") {

        result.sort(
          (a, b) =>
            a.name.localeCompare(
              b.name
            )
        );

      }


      return result;

    }, [
      products,
      config,
      sort,
    ]);


  // ===================================================
  // PRODUCTS VISIBLES
  // ===================================================

  const visibleProducts =
    categoryProducts.slice(
      0,
      visibleCount
    );


  // ===================================================
  // DETAIL
  // ===================================================

  const handleOpen = (
    product
  ) => {

    setSelectedProduct(product);

    setOpen(true);

  };


  const handleClose = () => {

    setOpen(false);

    setSelectedProduct(null);

  };


  // ===================================================
  // LOAD MORE
  // ===================================================

  const handleLoadMore = () => {

    setVisibleCount(
      (prev) => prev + 24
    );

  };


  // ===================================================
  // CATEGORY NOT FOUND
  // ===================================================

  if (!config) {

    return (
      

      <Container
        sx={{
          py: 10,
          textAlign: "center",
        }}
      >

        <Typography
          variant="h4"
          fontWeight="bold"
          color="#243447"
        >
          Catégorie introuvable
        </Typography>

        <Button
          onClick={() =>
            navigate("/")
          }
          variant="contained"
          sx={{
            mt: 3,
          }}
        >
          Retour à l'accueil
        </Button>

      </Container>

    );

  }
  // ===================================================
  // PAGE
  // ===================================================

  return (

    <Box
      sx={{
        background: "#FAF8F4",
        minHeight: "100vh",
      }}
    >
      <CategoryNavigation />

{/* =================================================
        CATEGORY PAGE CONTENT
    ================================================= */}

    <Box
      key={location.pathname}
      sx={{
        animation: "categorySlideIn .45s ease-out",

        "@keyframes categorySlideIn": {
          "0%": {
            opacity: 0,
            transform: "translateX(45px)",
          },

          "60%": {
            opacity: 0.8,
            transform: "translateX(-4px)",
          },

          "100%": {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
      }}
    >

      {/* =================================================
          CATEGORY INTRO
      ================================================= */}

      <Container
        maxWidth="xl"
        sx={{
          pt: {
            xs: 2,
            md: 3,
          },
          pb: {
            xs: 2.5,
            md: 3,
          },
        }}
>

        {/* BREADCRUMB */}

{/* <Box
  sx={{
    display: "flex",
    alignItems: "center",
    gap: 0.5,

    mb: {
      xs: 0.5,
      md: 0.5,
    },
  }}
>
  <Button
    startIcon={<ArrowBackIcon />}
    onClick={() => navigate("/")}
    sx={{
      minWidth: "auto",
      color: "#243447",
      fontSize: ".8rem",
      fontWeight: 600,
      px: 0,
      py:0,

      "&:hover": {
        background: "transparent",
        color: config.accent,
      },
    }}
  >
    Accueil
  </Button>

  <Typography
    sx={{
      color: "#aaa",
      fontSize: ".8rem",
    }}
  >
    /
  </Typography>

  <Typography
    sx={{
      color: config.accent,
      fontSize: ".8rem",
      fontWeight: 600,
    }}
  >
    {config.name}
  </Typography>
</Box> */}

        {/* =================================================
    CATEGORY HERO
================================================= */}

<Box
  sx={{
    position: "relative",
    height: {
      xs: 260,
      sm: 300,
      md: 340,
    },
    borderRadius: {
      xs: 2.5,
      md: 4,
    },
    overflow: "hidden",
    backgroundImage: `url("${config.image}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    boxShadow: "0 12px 35px rgba(36,52,71,.12)",
  }}
>

  {/* OVERLAY */}

  <Box
    sx={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(90deg, rgba(20,28,35,.72) 0%, rgba(20,28,35,.48) 45%, rgba(20,28,35,.25) 100%)",
    }}
  />


  {/* TEXT */}

  <Box
    sx={{
      position: "relative",
      zIndex: 2,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      px: {
        xs: 3,
        sm: 5,
      },
      color: "#fff",
    }}
  >

    {/* CATEGORY */}

    <Typography
      sx={{
        fontWeight: 700,
        letterSpacing: {
          xs: 2,
          md: 3,
        },
        fontSize: {
          xs: ".75rem",
          md: ".9rem",
        },
        mb: 1,
        textTransform: "uppercase",
      }}
    >
      {config.name}
    </Typography>


    {/* TITLE */}

    <Typography
      sx={{
        fontFamily: "Georgia, serif",
        fontWeight: 600,
        fontSize: {
          xs: "2rem",
          sm: "2.5rem",
          md: "3.3rem",
        },
        lineHeight: 1.1,
        mb: 1.5,
        textShadow:
          "0 3px 15px rgba(0,0,0,.25)",
      }}
    >
      {config.title}
    </Typography>


    {/* DESCRIPTION */}

    <Typography
      sx={{
        maxWidth: 650,
        fontSize: {
          xs: ".82rem",
          sm: ".9rem",
          md: "1rem",
        },
        lineHeight: 1.6,
        color: "rgba(255,255,255,.92)",
        textShadow:
          "0 2px 8px rgba(0,0,0,.3)",
      }}
    >
      {config.description}
    </Typography>


    {/* PRODUCTS COUNT */}

    <Box
      sx={{
        mt: 2,
        px: 2,
        py: .65,
        borderRadius: 10,
        background: "rgba(255,255,255,.92)",
        color: config.accent,
        fontSize: ".75rem",
        fontWeight: 700,
        backdropFilter: "blur(6px)",
      }}
    >
      {categoryProducts.length} produits
    </Box>

  </Box>

</Box>

      </Container>
      {/* =================================================
          PRODUCTS
      ================================================= */}
      <Box
        sx={{
          background: "#fff",
          borderTop:
            "1px solid #EEE9E1",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            py: {
              xs: 4,
              md: 6,
            },
          }}
        >


          {/* PRODUCTS HEADER */}

          <Box
            sx={{
              display: "flex",
              alignItems: {
                xs: "flex-start",
                md: "center",
              },

              justifyContent:
                "space-between",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              gap: 2,
              mb: 4,
            }}
          >

            <Box>
              <Typography
                sx={{
                  color: "#243447",
                  fontWeight: 700,
                  fontSize: {
                    xs: "1.4rem",
                    md: "1.8rem",
                  },
                }}
              >
                Notre sélection
              </Typography>

              <Typography
                sx={{
                  color: "#89929A",
                  fontSize: ".85rem",
                  mt: .5,
                }}
              >
                Découvrez nos produits
              </Typography>
            </Box>


            {/* SORT */}

            <Select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
              size="small"
              IconComponent={
                KeyboardArrowDownIcon
              }
              sx={{
                minWidth: 190,
                borderRadius: 2,
                background:
                  "#FAF8F4",
                "& fieldset": {
                  borderColor:
                    "#E6DED3",
                },
                "&:hover fieldset": {
                  borderColor:
                    config.accent,
                },
              }}
            >

              <MenuItem value="default">
                Trier par
              </MenuItem>

              <MenuItem value="price-asc">
                Prix : croissant
              </MenuItem>

              <MenuItem value="price-desc">
                Prix : décroissant
              </MenuItem>

              <MenuItem value="name">
                Nom
              </MenuItem>
            </Select>
          </Box>

          {/* LOADING */}

          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "center",
                py: 10,
              }}
            >
              <CircularProgress
                sx={{
                  color:
                    config.accent,
                }}
              />
            </Box>
          )}

          {/* EMPTY */}

          {!loading &&
            categoryProducts.length === 0 && (
              <Box
                sx={{
                  textAlign: "center",
                  py: 10,
                  background:
                    "#FAF8F4",
                  borderRadius: 3,
                }}
              >
                <Typography
                  color="text.secondary"
                >
                  Aucun produit disponible
                  dans cette catégorie.
                </Typography>

              </Box>

            )}


          {/* PRODUCT GRID */}

          {!loading &&
            visibleProducts.length > 0 && (

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, minmax(0, 1fr))",
                    sm: "repeat(3, minmax(0, 1fr))",
                    md: "repeat(4, minmax(0, 1fr))",
                  },

                  gap: {
                    xs: 1.5,
                    sm: 2,
                    md: 2.5,
                  },
                }}
              >

                {visibleProducts.map(
                  (product) => (

                    <ProductCard
                      key={product._id}
                      product={product}
                      favorites={favorites}
                      toggleFavorite={
                        toggleFavorite
                      }
                      handleOpen={
                        handleOpen
                      }
                    />
                  )
                )}

              </Box>

            )}


          {/* LOAD MORE */}

          {!loading &&
            visibleCount <
              categoryProducts.length && (

              <Box
                sx={{
                  display: "flex",

                  justifyContent:
                    "center",

                  mt: 5,
                }}
              >

                <Button
                  variant="outlined"
                  onClick={
                    handleLoadMore
                  }
                  sx={{
                    px: 4,

                    py: 1.2,

                    borderRadius: 10,

                    borderColor:
                      config.accent,

                    color:
                      config.accent,

                    fontWeight: 600,

                    "&:hover": {
                      borderColor:
                        config.accent,

                      background:
                        config.soft,
                    },
                  }}
                >
                  Charger plus
                </Button>

              </Box>

            )}

        </Container>

      </Box>
      </Box>


      {/* =================================================
          PRODUCT DETAIL
      ================================================= */}

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

                color: "#243447",

                pr: 6,

                position:
                  "relative",
              }}
            >

              {selectedProduct.name}

              <IconButton
                onClick={
                  handleClose
                }
                sx={{
                  position:
                    "absolute",

                  right: 10,

                  top: 10,

                  color: "#243447",

                  "&:hover": {
                    background:
                      config.soft,

                    color:
                      config.accent,
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

                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "1fr 1fr",
                  },

                  gap: 4,

                  py: 2,
                }}
              >

                {/* IMAGE */}

                <Box
                  sx={{
                    display: "flex",

                    justifyContent:
                      "center",
                  }}
                >

                  <Box
                    component="img"
                    src={
                      selectedProduct.imageUrl
                        ? endpoint.imageReadProduit(
                            selectedProduct.imageUrl
                          )
                        : "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600"
                    }
                    alt={
                      selectedProduct.name
                    }
                    sx={{
                      width: "100%",

                      maxWidth: 400,

                      maxHeight: 450,

                      objectFit:
                        "cover",

                      borderRadius: 2,
                    }}
                  />

                </Box>


                {/* INFO */}

                <Box>

                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="#243447"
                  >
                    {
                      selectedProduct.name
                    }
                  </Typography>


                  {selectedProduct.brand && (

                    <Typography
                      color="text.secondary"
                      sx={{
                        mt: 1,
                        fontWeight: 500,
                      }}
                    >
                      Marque :{" "}
                      {
                        selectedProduct.brand
                      }
                    </Typography>

                  )}


                  <Typography
                    color="text.secondary"
                    sx={{
                      mt: 3,

                      lineHeight: 1.8,
                    }}
                  >
                    {
                      selectedProduct.description ||
                      "Aucune description disponible."
                    }
                  </Typography>


                  <Divider
                    sx={{
                      my: 3,
                    }}
                  />


                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                      color:
                        config.accent,
                    }}
                  >
                    {
                      selectedProduct.price
                    }{" "}
                    DT
                  </Typography>


                  <Typography
                    sx={{
                      mt: 2,
                    }}
                  >
                    📚 Catégorie :{" "}
                    <strong>
                      {
                        selectedProduct.category
                      }
                    </strong>
                  </Typography>


                  <Typography
                    sx={{
                      mt: 1,
                    }}
                  >
                    📦 Stock :{" "}
                    <strong>
                      {
                        selectedProduct.quantite ||
                        0
                      }
                    </strong>
                  </Typography>


                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={
                      <ShoppingCartIcon />
                    }
                    disabled={
                      selectedProduct.quantite ===
                      0
                    }
                    onClick={() => {

                      addToCart(
                        selectedProduct
                      );

                      handleClose();

                    }}
                    sx={{
                      mt: 4,

                      py: 1.5,

                      background:
                        config.accent,

                      "&:hover": {
                        background:
                          config.accent,
                        filter:
                          "brightness(.9)",
                      },
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

    </Box>

  );

};

export default CategoryPage;