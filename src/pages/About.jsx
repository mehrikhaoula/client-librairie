import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import {
  School,
  Palette,
  WorkspacePremium,
} from "@mui/icons-material";

const About = () => {
  const features = [
    {
      icon: <School sx={{ fontSize: 32 }} />,
      title: "Fourniture scolaire",
      text: "Tout le nécessaire pour accompagner les élèves et étudiants.",
    },
    {
      icon: <Palette sx={{ fontSize: 32 }} />,
      title: "Beaux-Arts",
      text: "Peintures, pinceaux, accessoires et matériel pour artistes.",
    },
    {
      icon: <WorkspacePremium sx={{ fontSize: 32 }} />,
      title: "20+ ans d'expérience",
      text: "Un savoir-faire reconnu au service de nos clients.",
    },
  ];

  return (
   <Box
  id="about"
  sx={{
    position: "relative",
    overflow: "hidden",
    py: { xs: 7, md: 10 },

    backgroundImage: `url("/about_bg.png")`,

    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",

    backgroundAttachment: {
      xs: "scroll",
      md: "fixed",
    },
  }}
>
 

      <Container maxWidth="lg">

        {/* ===== HEADER ===== */}
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 5, md: 7 },
          }}
        >
          <Typography
            sx={{
              color: "#1976d2",
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: 2,
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            À propos de nous
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: "#172033",
              fontSize: {
                xs: "2rem",
                sm: "2.5rem",
                md: "3rem",
              },
              mb: 2,
            }}
          >
            Librairie{" "}
            <Box
              component="span"
              sx={{
                color: "#1976d2",
              }}
            >
              Benzarti
            </Box>{" "}
            Monastir
          </Typography>

          <Box
            sx={{
              width: 65,
              height: 4,
              background: "#1976d2",
              borderRadius: 10,
              mx: "auto",
              mb: 3,
            }}
          />

          <Typography
            sx={{
              maxWidth: 750,
              mx: "auto",
              color: "#667085",
              fontSize: { xs: "1rem", md: "1.1rem" },
              lineHeight: 1.8,
            }}
          >
            Depuis plus de 20 ans, nous accompagnons élèves, étudiants,
            passionnés et artistes avec une large sélection de produits
            scolaires, créatifs et artistiques.
          </Typography>
        </Box>

        {/* ===== MAIN CARD ===== */}
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 5,
            p: { xs: 3, sm: 4, md: 6 },
            background: "#ffffff",
            border: "1px solid #e8edf5",
            boxShadow: "0 15px 45px rgba(20, 40, 80, 0.08)",
            mb: 5,
          }}
        >
          {/* Decorative circle */}
          <Box
            sx={{
              position: "absolute",
              width: 220,
              height: 220,
              borderRadius: "50%",
              background: "rgba(25, 118, 210, 0.05)",
              top: -100,
              right: -80,
            }}
          />

          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              maxWidth: 900,
              mx: "auto",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "#172033",
                mb: 3,
                fontSize: {
                  xs: "1.6rem",
                  md: "2.1rem",
                },
              }}
            >
              Votre univers scolaire & artistique
            </Typography>

            <Typography
              sx={{
                color: "#667085",
                lineHeight: 1.9,
                fontSize: { xs: "0.98rem", md: "1.05rem" },
              }}
            >
              La Librairie Benzarti vous propose une sélection complète de
              fournitures scolaires ainsi qu'un large choix de produits
              dédiés aux beaux-arts et aux artistes.
            </Typography>

            <Typography
              sx={{
                color: "#667085",
                lineHeight: 1.9,
                fontSize: { xs: "0.98rem", md: "1.05rem" },
                mt: 2,
              }}
            >
              Découvrez notamment nos peintures à l'huile, peintures sur
              verre, peintures acryliques, aquarelles, accessoires et
              tableaux de peinture, sélectionnés pour répondre aux besoins
              des débutants comme des passionnés.
            </Typography>
          </Box>
        </Paper>

        {/* ===== FEATURES ===== */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
        >
          {features.map((feature, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                flex: 1,
                p: 3.5,
                borderRadius: 4,
                background: "#ffffff",
                border: "1px solid #e8edf5",
                boxShadow: "0 10px 30px rgba(20, 40, 80, 0.06)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-7px)",
                  boxShadow: "0 18px 40px rgba(20, 40, 80, 0.12)",
                  borderColor: "#90caf9",
                },
              }}
            >
              <Box
                sx={{
                  width: 62,
                  height: 62,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1976d2",
                  background: "rgba(25, 118, 210, 0.08)",
                  mb: 2.5,
                }}
              >
                {feature.icon}
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#172033",
                  mb: 1,
                }}
              >
                {feature.title}
              </Typography>

              <Typography
                sx={{
                  color: "#667085",
                  lineHeight: 1.7,
                  fontSize: "0.95rem",
                }}
              >
                {feature.text}
              </Typography>
            </Paper>
          ))}
        </Stack>

      </Container>
    </Box>
  );
};

export default About;
