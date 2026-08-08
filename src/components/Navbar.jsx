import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  Badge,
  IconButton,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  const totalItems = cart.reduce(
  (sum, item) => sum + item.quantity,
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
  { label: "Accueil", path: "/" },
  { label: "Produits", action: "products" },
  { label: "À propos", path: "/about" },
  { label: "Contact", path: "/contact" },
];

  return (
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
          justifyContent: "space-between",
          py: 1,
        }}
      >
        {/* Logo */}
<Box
  component={Link}
  to="/"
  sx={{
    display: "flex",
    alignItems: "center",
    gap: 2,
    textDecoration: "none",
    color: "inherit",
  }}
>
  <img
    src="/logo.png"
    alt="Librairie Benzarti"
    style={{
      width: 70,
      height: 70,
      objectFit: "contain",
    }}
  />

  <Box>
    <Typography
      sx={{
        fontSize: 16,
        letterSpacing: 2,
        color: "#8a6d3b",
      }}
    >
      LIBRAIRIE
    </Typography>

    <Typography
      variant="h4"
      fontWeight="bold"
      sx={{
        color: "#16375B",
        lineHeight: 1,
      }}
    >
      BENZARTI
    </Typography>
  </Box>
</Box>

        {/* Menu */}
        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
            gap: 4,
          }}
        >
          {menuItems.map((item) => {
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
          color: location.pathname === "/" ? "#1565C0" : "#444",
          fontWeight: location.pathname === "/" ? "bold" : 500,
          "&:hover": { color: "#1565C0" },
        }}
        onClick={() => {
          if (location.pathname !== "/") {
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
          location.pathname === item.path ? "#1565C0" : "#444",
        fontWeight:
          location.pathname === item.path ? "bold" : 500,
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

        {/* Search */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            background: "#f5f5f5",
            borderRadius: "30px",
            px: 2,
            width: {
              xs: 180,
              md: 320,
            },
          }}
        >
          <SearchIcon color="action" />

          <InputBase
            placeholder="Rechercher..."
            sx={{
              ml: 1,
              flex: 1,
            }}
          />
        </Box>

        {/* Cart */}
        <IconButton
  id="cart-icon"
  onClick={() => navigate("/cart")}
>
          <Badge
            badgeContent={totalItems}
            color="primary"
          >
            <ShoppingCartIcon
              sx={{
                fontSize: 30,
              }}
            />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;