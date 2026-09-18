import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  CircularProgress,
  InputAdornment,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { toast } from "react-toastify";
import { endpoint } from "../utils/config";
import { useAuth } from "../context/AuthContext";

const UserLogin = ({ open, onClose, onSuccess }) => {
  const { login } = useAuth();

  const [data, setData] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // =========================================================
  // BLOQUER LE SCROLL QUAND LE MODAL EST OUVERT
  // =========================================================

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  // =========================================================
  // FERMER AVEC ESC
  // =========================================================

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  // =========================================================
  // CHANGEMENT DES CHAMPS
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // LOGIN
  // =========================================================

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!data.identifier.trim() || !data.password) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        endpoint.userLogin,
        {
          identifier: data.identifier.trim(),
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("LOGIN SUCCESS:", response.data);

      if (response.status === 200) {
        // =====================================================
        // METTRE À JOUR AUTH CONTEXT
        // =====================================================

        login(response.data.user);

        // =====================================================
        // GARDER L'UTILISATEUR EN LOCALSTORAGE
        // =====================================================

        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

        toast.success("Connexion réussie !");

        // =====================================================
        // FERMER LE MODAL
        // =====================================================

        setTimeout(() => {
          setData({
            identifier: "",
            password: "",
          });

          setShowPassword(false);

          onClose?.();

          // Permet à Cart / MesCommandes de continuer
          // l'action qui était bloquée par le login.
          onSuccess?.(response.data.user);
        }, 500);
      }
    } catch (error) {
      console.error("USER LOGIN ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Identifiants incorrects."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // NE RIEN AFFICHER SI FERMÉ
  // =========================================================

  if (!open) return null;

  return (
    <Box
      onClick={onClose}
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,

        display: "flex",
        alignItems: {
          xs: "flex-end",
          sm: "center",
        },
        justifyContent: "center",

        backgroundColor: "rgba(15, 23, 42, 0.55)",

        backdropFilter: "blur(7px)",
        WebkitBackdropFilter: "blur(7px)",

        animation: "loginFadeIn 0.25s ease",

        "@keyframes loginFadeIn": {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
      }}
    >
      {/* =====================================================
          CARD LOGIN
      ===================================================== */}

      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          position: "relative",

          width: {
            xs: "100%",
            sm: "430px",
          },

          maxWidth: {
            xs: "100%",
            sm: "calc(100% - 32px)",
          },

          maxHeight: {
            xs: "92vh",
            sm: "90vh",
          },

          overflowY: "auto",

          background: "#ffffff",

          borderRadius: {
            xs: "28px 28px 0 0",
            sm: "28px",
          },

          boxShadow:
            "0 25px 70px rgba(15, 23, 42, 0.30), 0 8px 25px rgba(15, 23, 42, 0.15)",

          padding: {
            xs: "28px 22px 24px",
            sm: "38px 38px 32px",
          },

          animation: {
            xs: "loginSlideMobile 0.3s ease",
            sm: "loginSlideDesktop 0.3s ease",
          },

          "@keyframes loginSlideMobile": {
            from: {
              transform: "translateY(100%)",
              opacity: 0,
            },
            to: {
              transform: "translateY(0)",
              opacity: 1,
            },
          },

          "@keyframes loginSlideDesktop": {
            from: {
              transform: "translateY(25px) scale(0.97)",
              opacity: 0,
            },
            to: {
              transform: "translateY(0) scale(1)",
              opacity: 1,
            },
          },
        }}
      >
        {/* ===================================================
            CLOSE
        =================================================== */}

        <IconButton
          onClick={onClose}
          aria-label="Fermer"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,

            width: 38,
            height: 38,

            color: "#64748b",

            backgroundColor: "#f8fafc",

            "&:hover": {
              backgroundColor: "#f1f5f9",
              color: "#0f172a",
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        {/* ===================================================
            LOGO / ICON
        =================================================== */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: 62,
              height: 62,

              borderRadius: "20px",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              background:
                "linear-gradient(135deg, #f5efe6 0%, #eadfce 100%)",

              color: "#8a6a45",

              boxShadow:
                "0 8px 20px rgba(138, 106, 69, 0.12)",
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: 28 }} />
          </Box>
        </Box>

        {/* ===================================================
            TITRE
        =================================================== */}

        <Typography
          sx={{
            textAlign: "center",
            fontSize: {
              xs: "25px",
              sm: "28px",
            },
            fontWeight: 700,
            color: "#1e293b",
            mb: 0.7,
          }}
        >
          Bon retour 👋
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#64748b",
            fontSize: "14px",
            lineHeight: 1.6,
            mb: 3,
          }}
        >
          Connectez-vous à votre compte pour continuer.
        </Typography>

        {/* ===================================================
            FORM
        =================================================== */}

        <Box
          component="form"
          onSubmit={handleLogin}
        >
          {/* IDENTIFIANT */}

          <TextField
            fullWidth
            name="identifier"
            label="Email ou téléphone"
            value={data.identifier}
            onChange={handleChange}
            autoComplete="username"
            disabled={loading}
            sx={{
              mb: 2,

              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                backgroundColor: "#fafafa",

                "& fieldset": {
                  borderColor: "#e2e8f0",
                },

                "&:hover fieldset": {
                  borderColor: "#cbd5e1",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#a88962",
                  borderWidth: "1px",
                },
              },

              "& .MuiInputLabel-root.Mui-focused": {
                color: "#8a6a45",
              },
            }}
          />

          {/* PASSWORD */}

          <TextField
            fullWidth
            name="password"
            label="Mot de passe"
            type={showPassword ? "text" : "password"}
            value={data.password}
            onChange={handleChange}
            autoComplete="current-password"
            disabled={loading}
            sx={{
              mb: 1,

              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                backgroundColor: "#fafafa",

                "& fieldset": {
                  borderColor: "#e2e8f0",
                },

                "&:hover fieldset": {
                  borderColor: "#cbd5e1",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#a88962",
                  borderWidth: "1px",
                },
              },

              "& .MuiInputLabel-root.Mui-focused": {
                color: "#8a6a45",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    edge="end"
                    disabled={loading}
                    sx={{
                      color: "#64748b",
                    }}
                  >
                    {showPassword ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* MOT DE PASSE OUBLIÉ */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mb: 2.5,
            }}
          >
            <Button
              type="button"
              variant="text"
              sx={{
                textTransform: "none",
                fontSize: "13px",
                color: "#8a6a45",
                minWidth: "auto",
                padding: "4px 0",

                "&:hover": {
                  background: "transparent",
                  color: "#6f5335",
                },
              }}
            >
              Mot de passe oublié ?
            </Button>
          </Box>

          {/* LOGIN */}

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              height: 52,

              borderRadius: "14px",

              textTransform: "none",

              fontSize: "15px",
              fontWeight: 700,

              color: "#ffffff",

              background:
                "linear-gradient(135deg, #9a7b52 0%, #7d603d 100%)",

              boxShadow:
                "0 10px 24px rgba(125, 96, 61, 0.25)",

              "&:hover": {
                background:
                  "linear-gradient(135deg, #8c6d47 0%, #6f5335 100%)",

                boxShadow:
                  "0 12px 28px rgba(125, 96, 61, 0.32)",
              },

              "&:disabled": {
                color: "#ffffff",
                opacity: 0.7,
              },
            }}
          >
            {loading ? (
              <CircularProgress
                size={23}
                sx={{
                  color: "#ffffff",
                }}
              />
            ) : (
              "Se connecter"
            )}
          </Button>
        </Box>

        {/* ===================================================
            REGISTER
        =================================================== */}

        <Box
          sx={{
            mt: 2.5,
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontSize: "14px",
              color: "#64748b",
            }}
          >
            Vous n'avez pas encore de compte ?{" "}
          </Typography>

          <Button
            type="button"
            onClick={() => {
              onClose?.();

              // On garde ton système de route actuel.
              window.location.href = "/register";
            }}
            sx={{
              padding: 0,
              minWidth: "auto",

              textTransform: "none",

              fontSize: "14px",
              fontWeight: 700,

              color: "#8a6a45",

              "&:hover": {
                background: "transparent",
                color: "#6f5335",
              },
            }}
          >
            Créer un compte
          </Button>
        </Box>

        {/* ===================================================
            PETIT INDICATEUR MOBILE
        =================================================== */}

        <Box
          sx={{
            display: {
              xs: "block",
              sm: "none",
            },

            width: 42,
            height: 4,

            borderRadius: 10,

            backgroundColor: "#d1d5db",

            position: "absolute",
            top: 10,
            left: "50%",

            transform: "translateX(-50%)",
          }}
        />
      </Box>
    </Box>
  );
};

export default UserLogin;