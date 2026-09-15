import React from "react";
import {
  Box,
  Typography,
  IconButton,
} from "@mui/material";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";
import BrushIcon from "@mui/icons-material/Brush";
import BackpackIcon from "@mui/icons-material/Backpack";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PaletteIcon from "@mui/icons-material/Palette";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { useNavigate } from "react-router-dom";

const Categories = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const navigate = useNavigate();

  const categories = [
    "Toutes",
    "BEAUX-ARTS",
    "LOISIRS CRÉATIFS",
    "FOURNITURE BOUGIES",
    "PAPIERS",
    "Étudiants",
    "Couture- Stylisme",
  ];

  // =========================
  // SLUG DES CATÉGORIES
  // =========================

  const categorySlugs = {
    "BEAUX-ARTS": "beaux-arts",
    "LOISIRS CRÉATIFS": "loisirs-creatifs",
    "FOURNITURE BOUGIES": "fourniture-bougies",
    "PAPIERS": "papiers",
    "Étudiants": "etudiants",
    "Couture- Stylisme": "couture-stylisme",
  };

  // =========================
  // ICÔNES
  // =========================

  const getIcon = (category) => {
    switch (category) {
      case "Toutes":
        return <MenuBookIcon />;

      case "BEAUX-ARTS":
        return <PaletteIcon />;

      case "LOISIRS CRÉATIFS":
        return <BrushIcon />;

      case "FOURNITURE BOUGIES":
        return <AutoStoriesIcon />;

      case "PAPIERS":
        return <MenuBookIcon />;

      case "Étudiants":
        return <SchoolIcon />;

      case "Couture- Stylisme":
        return <BackpackIcon />;

      default:
        return <MenuBookIcon />;
    }
  };

  // =========================
  // CLICK CATÉGORIE
  // =========================

  const handleCategoryClick = (category) => {
    // Toutes → accueil
    if (category === "Toutes") {
      setSelectedCategory("Toutes");
      navigate("/");
      return;
    }

    // Sélectionner la catégorie
    setSelectedCategory(category);

    // Récupérer le slug
    const slug = categorySlugs[category];

    if (slug) {
      navigate(`/categorie/${slug}`);
    }
  };

  // =========================
  // SCROLL
  // =========================

  const scrollCategories = (direction) => {
    const container = document.getElementById("categories-scroll");

    if (!container) return;

    container.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <Box
      id="categories"
      sx={{
        width: "100%",
        py: { xs: 2, md: 2.5 },
        background:
  "linear-gradient(180deg, #FFFFFF 0%, #EDE4D6 100%)",
        borderBottom: "1px solid #eee",
        position: "relative",
        zIndex: 20,
      }}
    >
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          px: {
            xs: 1.5,
            sm: 2,
            md: 3,
          },
        }}
      >

        {/* =========================
            TITRE
        ========================= */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            mb: 1.5,
          }}
        >
          <MenuBookIcon
            sx={{
              color: "#C9A66B",
              fontSize: {
                xs: 23,
                sm: 27,
              },
            }}
          />

          <Typography
            sx={{
              fontWeight: "bold",
              color: "#173A69",
              fontFamily: "serif",
              fontSize: {
                xs: "1rem",
                sm: "1.15rem",
              },
            }}
          >
            Catégories
          </Typography>
        </Box>

        {/* =========================
            BARRE CATÉGORIES
        ========================= */}

        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >

          {/* FLÈCHE GAUCHE */}

          <IconButton
            onClick={() => scrollCategories("left")}
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              mr: 1,
              width: 38,
              height: 38,
              border: "1px solid #E8DDCE",
              background: "#fff",
              color: "#173A69",
              boxShadow: "0 4px 12px rgba(0,0,0,.08)",

              "&:hover": {
                background: "#F9F5EF",
              },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          {/* CATÉGORIES */}

          <Box
            id="categories-scroll"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: "100%",

              overflowX: "auto",
              overflowY: "hidden",

              scrollBehavior: "smooth",

              scrollbarWidth: "none",

              "&::-webkit-scrollbar": {
                display: "none",
              },

              py: 0.5,

              px: {
                xs: 0.5,
                md: 0,
              },
            }}
          >
            {categories.map((category) => {

              const selected =
                selectedCategory === category;

              return (
                <Box
                  key={category}
                  onClick={() =>
                    handleCategoryClick(category)
                  }
                  sx={{
                    flexShrink: 0,

                    display: "flex",
                    alignItems: "center",
                    gap: 0.8,

                    px: {
                      xs: 1.5,
                      sm: 2,
                    },

                    py: 1,

                    borderRadius: 3,

                    cursor: "pointer",

                    whiteSpace: "nowrap",

                    border: selected
                      ? "1px solid #173A69"
                      : "1px solid #E8DDCE",

                    background: selected
                      ? "#173A69"
                      : "#fff",

                    color: selected
                      ? "#fff"
                      : "#173A69",

                    fontWeight: selected
                      ? "bold"
                      : 500,

                    transition:
                      "all .25s ease",

                    boxShadow: selected
                      ? "0 5px 15px rgba(23,58,105,.18)"
                      : "none",

                    "&:hover": {
                      background: selected
                        ? "#173A69"
                        : "#F9F5EF",

                      borderColor: "#C9A66B",

                      transform:
                        "translateY(-2px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",

                      "& svg": {
                        fontSize: {
                          xs: 17,
                          sm: 19,
                        },
                      },
                    }}
                  >
                    {getIcon(category)}
                  </Box>

                  <Typography
                    component="span"
                    sx={{
                      fontSize: {
                        xs: "0.75rem",
                        sm: "0.82rem",
                        md: "0.88rem",
                      },

                      fontWeight: "inherit",

                      color: "inherit",
                    }}
                  >
                    {category}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* FLÈCHE DROITE */}

          <IconButton
            onClick={() => scrollCategories("right")}
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },

              ml: 1,

              width: 38,
              height: 38,

              border: "1px solid #E8DDCE",

              background: "#fff",

              color: "#173A69",

              boxShadow:
                "0 4px 12px rgba(0,0,0,.08)",

              "&:hover": {
                background: "#F9F5EF",
              },
            }}
          >
            <ChevronRightIcon />
          </IconButton>

        </Box>
      </Box>
    </Box>
  );
};

export default Categories;