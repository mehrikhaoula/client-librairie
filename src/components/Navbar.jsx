import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  InputBase,
  Badge,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { CartContext } from "../context/CartContext";
import { FavoritesContext } from "../context/FavoritesContext";
import Contact from "../pages/Contact";

const Navbar = () => {
  const { cart } = useContext(CartContext);

  const {
    favorites,
  } = useContext(FavoritesContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [contactOpen, setContactOpen] = useState(false);

  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down("sm")
  );

  const [searchValue, setSearchValue] =
    useState("");

  const totalItems = cart.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  );

  const goToProducts = () => {
    if (location.pathname === "/") {
      document
        .getElementById("products")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    } else {
      navigate("/", {
        state: {
          scrollTo: "products",
        },
      });
    }
  };

  const menuItems = [
    {
      label: "Accueil",
      path: "/",
    },
    {
      label: "Produits",
      action: "products",
    },
    {
      label: "À propos",
      path: "/about",
    },
    {
      label: "Contact",
      action: "contact",
    },
  ];

  return (
    <>
    <AppBar
      position="sticky"
      elevation={2}
      sx={{
        backgroundColor: "#fff",
        color: "#222",
      }}
    >
      <Toolbar
        sx={{
          minHeight: {
            xs: 68,
            sm: 78,
          },

          justifyContent: "space-between",

          gap: {
            xs: 1,
            sm: 2,
            md: 3,
          },

          px: {
            xs: 1.5,
            sm: 2,
            md: 3,
          },

          py: {
            xs: 0.8,
            sm: 1,
          },
        }}
      >

        {/* =========================
            LOGO
        ========================= */}

        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",

            gap: {
              xs: 0.7,
              sm: 1.2,
              md: 2,
            },

            textDecoration: "none",
            color: "inherit",

            flexShrink: 0,
          }}
        >
          <img
            src="/logo.png"
            alt="Librairie Benzarti"
            style={{
              width: isMobile
                ? 45
                : 60,

              height: isMobile
                ? 45
                : 60,

              objectFit: "contain",
            }}
          />

          <Box
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  sm: 12,
                  md: 14,
                },

                letterSpacing: {
                  sm: 1.5,
                  md: 2,
                },

                color: "#8a6d3b",
              }}
            >
              LIBRAIRIE
            </Typography>

            <Typography
              fontWeight="bold"
              sx={{
                color: "#16375B",
                lineHeight: 1,

                fontSize: {
                  sm: 20,
                  md: 25,
                },
              }}
            >
              BENZARTI
            </Typography>
          </Box>
        </Box>

        {/* =========================
            MENU DESKTOP
        ========================= */}

        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },

            gap: {
              md: 3,
              lg: 4,
            },

            alignItems: "center",
          }}
        >
          {menuItems.map((item) => {
            
            if (item.action === "contact") {
  return (
    <Typography
      key={item.label}
      onClick={() => setContactOpen(true)}
      sx={{
        cursor: "pointer",
        color: "#444",
        fontWeight: 500,
        "&:hover": {
          color: "#1565C0",
        },
      }}
    >
      {item.label}
    </Typography>
);
}

            if (item.action === "products") {
              return (
                <Typography
                  key={item.label}
                  onClick={goToProducts}
                  sx={{
                    cursor: "pointer",
                    color: "#444",
                    fontWeight: 500,

                    "&:hover": {
                      color: "#1565C0",
                    },
                  }}
                >
                  {item.label}
                </Typography>
              );
            }

            if (item.path === "/") {
              return (
                <Typography
                  key={item.label}
                  sx={{
                    cursor: "pointer",

                    color:
                      location.pathname === "/"
                        ? "#1565C0"
                        : "#444",

                    fontWeight:
                      location.pathname === "/"
                        ? "bold"
                        : 500,

                    "&:hover": {
                      color: "#1565C0",
                    },
                  }}

                  onClick={() => {
                    if (
                      location.pathname !== "/"
                    ) {
                      navigate("/");
                    } else {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }
                  }}
                >
                  {item.label}
                </Typography>
              );
            }

            return (
              <Typography
                key={item.path}
                component={Link}
                to={item.path}
                sx={{
                  textDecoration: "none",

                  color:
                    location.pathname ===
                    item.path
                      ? "#1565C0"
                      : "#444",

                  fontWeight:
                    location.pathname ===
                    item.path
                      ? "bold"
                      : 500,

                  "&:hover": {
                    color: "#1565C0",
                  },
                }}
              >
                {item.label}
              </Typography>
            );
          })}
        </Box>

        {/* =========================
            SEARCH
        ========================= */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",

            background: "#f5f5f5",

            borderRadius: "30px",

            px: {
              xs: 1,
              sm: 1.5,
              md: 2,
            },

            py: {
              xs: 0.3,
              sm: 0.5,
            },

            flex: {
              xs: 1,
              sm: "0 1 240px",
              md: "0 1 320px",
            },

            minWidth: 0,

            mx: {
              xs: 0.5,
              sm: 1,
              md: 0,
            },
          }}
        >
          <SearchIcon
            sx={{
              fontSize: {
                xs: 20,
                sm: 22,
              },

              color: "#777",
            }}
          />

          <InputBase
            placeholder="Rechercher..."
            value={searchValue}
            onChange={(e) =>
              setSearchValue(
                e.target.value
              )
            }

            onKeyDown={(e) => {
              if (
                e.key === "Enter"
              ) {
                navigate("/", {
                  state: {
                    scrollTo:
                      "products",

                    search:
                      searchValue,
                  },
                });
              }
            }}

            sx={{
              ml: 0.5,
              flex: 1,

              fontSize: {
                xs: "0.8rem",
                sm: "0.9rem",
              },

              minWidth: 0,
            }}
          />
        </Box>

        {/* =========================
            ACTIONS
        ========================= */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",

            gap: {
              xs: 0.2,
              sm: 0.8,
              md: 1.5,
            },

            flexShrink: 0,
          }}
        >

          {/* Mes commandes */}

          <Button
            onClick={() =>
              navigate(
                "/mes-commandes"
              )
            }

            startIcon={
              <Inventory2OutlinedIcon
                sx={{
                  fontSize: {
                    xs: 22,
                    sm: 24,
                  },
                }}
              />
            }

            sx={{
              minWidth: {
                xs: "auto",
                sm: 40,
              },

              px: {
                xs: 0.5,
                sm: 1,
                md: 1.5,
              },

              textTransform:
                "none",

              fontWeight:
                location.pathname ===
                "/mes-commandes"
                  ? "bold"
                  : 500,

              color:
                location.pathname ===
                "/mes-commandes"
                  ? "#1565C0"
                  : "#444",

              "& .MuiButton-startIcon":
                {
                  margin: {
                    xs: 0,
                    sm: undefined,
                  },
                },

              "&:hover": {
                color: "#1565C0",
                backgroundColor:
                  "transparent",
              },
            }}
          >
            <Box
              component="span"
              sx={{
                display: {
                  xs: "none",
                  sm: "inline",
                },
              }}
            >
              Mes commandes
            </Box>
          </Button>

          {/* Favoris */}

          <IconButton
            onClick={() =>
              navigate("/favoris")
            }

            aria-label="Mes favoris"

            sx={{
              color:
                location.pathname ===
                "/favoris"
                  ? "#1565C0"
                  : "#444",

              p: {
                xs: 0.8,
                sm: 1,
              },
            }}
          >
            <Badge
              badgeContent={
                favorites.length
              }

              color="error"

              max={99}
            >
              <FavoriteBorderIcon
                sx={{
                  fontSize: {
                    xs: 24,
                    sm: 27,
                    md: 30,
                  },
                }}
              />
            </Badge>
          </IconButton>

          {/* Panier */}

          <IconButton
            id="cart-icon"
            onClick={() =>
              navigate("/cart")
            }

            aria-label="Panier"

            sx={{
              color:
                location.pathname ===
                "/cart"
                  ? "#1565C0"
                  : "#444",

              p: {
                xs: 0.8,
                sm: 1,
              },
            }}
          >
            <Badge
              badgeContent={
                totalItems
              }

              color="primary"

              max={99}
            >
              <ShoppingCartIcon
                sx={{
                  fontSize: {
                    xs: 25,
                    sm: 28,
                    md: 30,
                  },
                }}
              />
            </Badge>
          </IconButton>

        </Box>
      </Toolbar>
    </AppBar>

    <Contact
  open={contactOpen}
  onClose={() => setContactOpen(false)}
/>
</>
);
};

export default Navbar;
