import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
} from "@mui/material";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";
import BrushIcon from "@mui/icons-material/Brush";
import BackpackIcon from "@mui/icons-material/Backpack";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";


const Categories = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3010/api/produits")
      .then((res) => {
        const data = res.data.data;
        const uniqueCategories = [
          "Toutes",
          ...new Set(data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((err) => console.log(err));
  }, []);

  const getIcon = (cat) => {
    const c = cat.toLowerCase();

    if (c.includes("liv")) return <AutoStoriesIcon fontSize="large" />;
    if (c.includes("scol")) return <SchoolIcon fontSize="large" />;
    if (c.includes("art")) return <BrushIcon fontSize="large" />;
    if (c.includes("sac")) return <BackpackIcon fontSize="large" />;

    return <MenuBookIcon fontSize="large" />;
  };

  return (
    <Box
      id="categories"
      sx={{
        py: 10,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container maxWidth="lg">

        {/* Décoration */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: 90,
              height: "2px",
              bgcolor: "#C9A66B",
            }}
          />

          <MenuBookIcon
            sx={{
              color: "#C9A66B",
              fontSize: 38,
            }}
          />

          <Box
            sx={{
              width: 90,
              height: "2px",
              bgcolor: "#C9A66B",
            }}
          />
        </Box>

        <Typography
          variant="h3"
          align="center"
          sx={{
            fontWeight: "bold",
            color: "#14345D",
            fontFamily: "serif",
          }}
        >
          Nos Catégories
        </Typography>

        <Typography
          align="center"
          sx={{
            color: "#555",
            mt: 1,
            mb: 7,
            fontSize: "1.15rem",
          }}
        >
          Trouvez facilement ce que vous cherchez
        </Typography>

        <Grid
          container
          spacing={4}
          justifyContent="center"
        >
          {categories.map((cat, index) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={2.4}
              key={index}
            >
              <Paper
                elevation={0}
                onClick={() =>
                  setSelectedCategory(cat)
                }
                sx={{
                  p: 4,
                  borderRadius: "28px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: ".35s",

                  border:
                    selectedCategory === cat
                      ? "2px solid #173A69"
                      : "1px solid #E6D8C3",

                  bgcolor:
                    selectedCategory === cat
                      ? "#173A69"
                      : "rgba(255,255,255,.90)",

                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 18px 35px rgba(0,0,0,.15)",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    margin: "auto",
                    bgcolor:
                      selectedCategory === cat
                        ? "#fff"
                        : "#F7EFE5",
                    color:
                      selectedCategory === cat
                        ? "#173A69"
                        : "#173A69",
                    mb: 3,
                  }}
                >
                  {getIcon(cat)}
                </Avatar>

                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color:
                      selectedCategory === cat
                        ? "#fff"
                        : "#173A69",
                  }}
                >
                  {cat}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
};

export default Categories;