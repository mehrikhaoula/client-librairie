import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Button,
  Divider,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const Contact = ({ open, onClose }) => {
  const phone = "21622952645";
  const email = "contact@librairiebenzarti.tn";
  const address = "Av. de la republique, Monastir 5060";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 1,
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          color: "#16375B",
          fontWeight: "bold",
          fontFamily: "Georgia, serif",
        }}
      >
        Contactez-nous

        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 10,
            top: 10,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {/* EMAIL */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3 }}>
          <EmailOutlinedIcon sx={{ color: "#16375B" }} />

          <Box>
            <Typography variant="caption" color="text.secondary">
              Email
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              {email}
            </Typography>
          </Box>
        </Box>

        {/* ADRESSE */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3 }}>
          <LocationOnOutlinedIcon sx={{ color: "#16375B" }} />

          <Box>
            <Typography variant="caption" color="text.secondary">
              Adresse
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              {address}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* TELEPHONE */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
          <PhoneOutlinedIcon sx={{ color: "#16375B" }} />

          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Téléphone
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              {phone}
            </Typography>
          </Box>
        </Box>

        <Button
          fullWidth
          variant="contained"
          startIcon={<PhoneOutlinedIcon />}
          href={`tel:+${phone}`}
          sx={{
            mb: 2,
            borderRadius: 3,
            backgroundColor: "#16375B",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#0F2743",
            },
          }}
        >
          Appeler
        </Button>

        {/* WHATSAPP */}
        <Button
          fullWidth
          variant="contained"
          startIcon={<WhatsAppIcon />}
          href={`https://wa.me/${phone}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            borderRadius: 3,
            backgroundColor: "#25D366",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#1DA851",
            },
          }}
        >
          Contacter sur WhatsApp
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Contact;