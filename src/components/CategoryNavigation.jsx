import React from "react";
import { Box, Chip, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const categories = [
  {
    label: "Accueil",
    slug: "",
    color: "#243447",
    soft: "#E8EDF2",
  },
  {
    label: "BEAUX-ARTS",
    slug: "beaux-arts",
    color: "#C9785A",
    soft: "#F4E1D8",
  },
  {
    label: "LOISIRS CRÉATIFS",
    slug: "loisirs-creatifs",
    color: "#9B849B",
    soft: "#EAE1EA",
  },
  {
    label: "FOURNITURE BOUGIES",
    slug: "fourniture-bougies",
    color: "#B88A63",
    soft: "#F0E3D5",
  },
  {
    label: "PAPIERS",
    slug: "papiers",
    color: "#8FA493",
    soft: "#E4ECE6",
  },
  {
    label: "Étudiants",
    slug: "etudiants",
    color: "#6686A3",
    soft: "#E2EAF1",
  },
  {
    label: "Couture-Stylisme",
    slug: "couture-stylisme",
    color: "#A77C8B",
    soft: "#EDE0E4",
  },
];

const CategoryNavigation = () => {
  const navigate = useNavigate();
  const { category } = useParams();

  const handleCategoryClick = (item) => {
    if (item.slug === "") {
      navigate("/");
      return;
    }

    navigate(`/categorie/${item.slug}`);
  };

  return (
    <Box
      sx={{
        width: "100%",
        background: "#FAF8F4",
        borderBottom: "1px solid #E8E1D8",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            py: 1.2,

            overflowX: "auto",
            overflowY: "hidden",

            scrollbarWidth: "none",

            "&::-webkit-scrollbar": {
              display: "none",
            },

            whiteSpace: "nowrap",
          }}
        >
          {categories.map((item) => {
            const isActive =
              item.slug === ""
                ? !category
                : category === item.slug;

            return (
              <Chip
                key={item.label}
                label={item.label}
                onClick={() => handleCategoryClick(item)}
                sx={{
                  flexShrink: 0,

                  height: 36,
                  borderRadius: "18px",

                  px: 0.5,

                  fontSize: {
                    xs: "0.72rem",
                    sm: "0.78rem",
                  },

                  fontWeight: isActive ? 700 : 600,

                  color: isActive ? "#FFFFFF" : item.color,

                  backgroundColor: isActive
                    ? item.color
                    : "transparent",

                  border: `1px solid ${item.color}`,

                  transition: "all 0.25s ease",

                  "&:hover": {
                    backgroundColor: isActive
                      ? item.color
                      : item.soft,

                    transform: "translateY(-1px)",
                  },
                }}
              />
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default CategoryNavigation;