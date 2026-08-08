import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const MainLayout = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box component="main" flexGrow={1}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;