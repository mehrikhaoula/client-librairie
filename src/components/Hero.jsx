import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";

const Hero = () => {
  const scrollToProducts = () => {
    document
      .getElementById("categories")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
  sx={{
    backgroundImage: "url('/librairie.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
  }}
>
      <Container maxWidth="lg">
  <Box
    sx={{
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      color: "#042141ff",
      mx: "auto",
      maxWidth: "850px",
    }}
  >
    {/* Bienvenue */}

    <Typography
      sx={{
        fontSize: {
          xs: "2rem",
          md: "3rem",
        },
        fontWeight: 500,
        fontFamily: "Playfair Display, serif",
        mb: 1,
      }}
    >
      Bienvenue à la
    </Typography>

    {/* Librairie */}

    <Typography
      sx={{
        fontSize: {
          xs: "3.5rem",
          md: "5.5rem",
        },
        fontWeight: "bold",
        fontFamily: "Playfair Display, serif",
        color: "#16375B",
        lineHeight: 1,
      }}
    >
      Librairie Benzarti
    </Typography>

    {/* Livre + lignes */}

    <Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    mt: 3,
    mb: 4,
  }}
>
  <Box
    sx={{
      width: 120,
      height: "2px",
      backgroundColor: "#C9A66B",
    }}
  />

  <img
  src="/logo.png"
  alt="Logo"
  style={{
    width: 55,
    height: 55,
    objectFit: "contain",
  }}
/>

  <Box
    sx={{
      width: 120,
      height: "2px",
      backgroundColor: "#C9A66B",
    }}
  />
</Box>

    {/* Description */}

    <Typography
      sx={{
        fontSize: {
          xs: "1.15rem",
          md: "1.45rem",
        },
        color: "#444",
        lineHeight: 1.8,
        maxWidth: "700px",
        mb: 5,
      }}
    >
      Découvrez une large sélection des fournitures
      de Beaux Art, Arisanat, Founitures Scolaires et articles de bureau de qualité pour tous les
      âges.
      Tout ce dont vous avez besoin pour apprendre, créer et réussir.
    </Typography>

    {/* Button */}

    <Button
      variant="contained"
      onClick={scrollToProducts}
      sx={{
        px: 5,
        py: 1.8,
        borderRadius: "40px",
        background: "#16375B",
        textTransform: "none",
        fontSize: "1.1rem",

        "&:hover": {
          background: "#0F2743",
        },
      }}
    >
      Découvrir nos produits
    </Button>
  </Box>
</Container>

    </Box>
  );
};

export default Hero;