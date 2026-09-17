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

        // 🖥️ Desktop
        minHeight: "80vh",

        // 📱 Mobile
        "@media (max-width:600px)": {
          minHeight: "55vh",
        },

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

            // 📱 Mobile
            "@media (max-width:600px)": {
              minHeight: "55vh",
              py: 3,
            },
          }}
        >
          {/* Bienvenue */}

          <Typography
            sx={{
              fontSize: {
                xs: "1.25rem",
                md: "2rem",
              },
              fontWeight: 500,
              fontFamily: "Playfair Display, serif",
              mb: {
                xs: 0.5,
                md: 1,
              },
            }}
          >
            Bienvenue à la
          </Typography>

          {/* Librairie */}

          <Typography
            sx={{
              fontSize: {
                xs: "2.1rem",
                sm: "2.7rem",
                md: "5rem",
              },
              fontWeight: "bold",
              fontFamily: "Playfair Display, serif",
              color: "#16375B",
              lineHeight: 1,
            }}
          >
            Librairie Benzarti
          </Typography>

          {/* Logo + lignes */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: {
                xs: 1,
                md: 2,
              },
              mt: {
                xs: 1.5,
                md: 3,
              },
              mb: {
                xs: 1.5,
                md: 4,
              },
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: {
                  xs: 55,
                  sm: 80,
                  md: 120,
                },
                height: "2px",
                backgroundColor: "#C9A66B",
              }}
            />

            <img
              src="/logo.png"
              alt="Logo"
              style={{
                width: "45px",
                height: "45px",
                objectFit: "contain",
              }}
            />

            <Box
              sx={{
                width: {
                  xs: 55,
                  sm: 80,
                  md: 120,
                },
                height: "2px",
                backgroundColor: "#C9A66B",
              }}
            />
          </Box>

          {/* Description */}

          <Typography
            sx={{
              fontSize: {
                xs: "0.85rem",
                sm: "1rem",
                md: "1.45rem",
              },
              color: "#444",
              lineHeight: {
                xs: 1.45,
                md: 1.8,
              },
              maxWidth: "600px",
              mb: {
                xs: 2,
                md: 5,
              },
              px: {
                xs: 1,
                md: 0,
              },
            }}
          >
            Découvrez une large sélection des fournitures de Beaux Art,
            Artisanat, Fournitures Scolaires et articles de bureau de qualité
            pour tous les âges. Tout ce dont vous avez besoin pour apprendre,
            créer et réussir.
          </Typography>

          {/* Button */}

          <Button
            variant="contained"
            onClick={scrollToProducts}
            sx={{
              px: {
                xs: 2.5,
                md: 5,
              },
              py: {
                xs: 1,
                md: 1.8,
              },
              mb: 2,
              borderRadius: "40px",
              background: "#16375B",
              textTransform: "none",
              fontSize: {
                xs: "0.85rem",
                md: "1.1rem",
              },

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