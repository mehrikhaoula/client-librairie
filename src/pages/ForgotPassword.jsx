import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  CircularProgress,
  InputAdornment,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { endpoint } from "../utils/config";

const ForgotPassword = () => {
  const navigate = useNavigate();

  // =========================================================
  // ÉTAPE
  // 1 = choix méthode
  // 2 = envoi / vérification code
  // 3 = nouveau mot de passe
  // =========================================================

  const [step, setStep] = useState(1);

  const [method, setMethod] = useState("");

  const [identifier, setIdentifier] = useState("");

  const [code, setCode] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  // =========================================================
  // CHOIX EMAIL / TÉLÉPHONE
  // =========================================================

  const handleMethodSelect = (selectedMethod) => {
    setMethod(selectedMethod);
    setIdentifier("");
    setStep(2);
  };

  // =========================================================
  // ENVOYER CODE
  // =========================================================

  const handleSendCode = async (e) => {
    e.preventDefault();

    if (!identifier.trim()) {
      toast.error(
        method === "email"
          ? "Veuillez saisir votre adresse email."
          : "Veuillez saisir votre numéro de téléphone."
      );

      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        endpoint.forgotPassword,
        {
          method,
          identifier: identifier.trim(),
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(
          method === "email"
            ? "Le code a été envoyé par email."
            : "Le code a été envoyé par SMS."
        );

        setStep(3);
      }
    } catch (error) {
      console.error("FORGOT PASSWORD ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Une erreur est survenue."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // VÉRIFIER CODE
  // =========================================================

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    if (!code.trim()) {
      toast.error("Veuillez saisir le code reçu.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        endpoint.verifyResetCode,
        {
          method,
          identifier: identifier.trim(),
          code: code.trim(),
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Code vérifié avec succès.");

        setStep(4);
      }
    } catch (error) {
      console.error("VERIFY CODE ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Code incorrect ou expiré."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // RESET PASSWORD
  // =========================================================

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error(
        "Le mot de passe doit contenir au moins 6 caractères."
      );

      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error(
        "Les mots de passe ne correspondent pas."
      );

      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        endpoint.resetPassword,
        {
          method,
          identifier: identifier.trim(),
          code: code.trim(),
          newPassword,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(
          "Mot de passe réinitialisé avec succès !"
        );

        setTimeout(() => {
          navigate("/");

          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("RESET PASSWORD ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Impossible de réinitialiser le mot de passe."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // RETOUR
  // =========================================================

  const handleBack = () => {
    if (step === 1) {
      navigate("/");
      return;
    }

    if (step === 2) {
      setMethod("");
      setIdentifier("");
      setStep(1);
      return;
    }

    if (step === 3) {
      setCode("");
      setStep(2);
      return;
    }

    if (step === 4) {
      setNewPassword("");
      setConfirmPassword("");
      setStep(3);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        padding: {
          xs: 2,
          sm: 3,
        },

        background:
          "linear-gradient(135deg, #f8f5ef 0%, #f1ece4 50%, #eee7dc 100%)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 460,

          backgroundColor: "#ffffff",

          borderRadius: "28px",

          padding: {
            xs: "28px 22px",
            sm: "40px",
          },

          boxShadow:
            "0 25px 70px rgba(15, 23, 42, 0.14)",
        }}
      >
        {/* =====================================================
            RETOUR
        ===================================================== */}

        <IconButton
          onClick={handleBack}
          sx={{
            mb: 2,

            color: "#64748b",

            "&:hover": {
              backgroundColor: "#f8fafc",
              color: "#8a6a45",
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        {/* =====================================================
            ICON
        ===================================================== */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: 68,
              height: 68,

              borderRadius: "22px",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              background:
                "linear-gradient(135deg, #f5efe6 0%, #eadfce 100%)",

              color: "#8a6a45",
            }}
          >
            <LockResetOutlinedIcon
              sx={{
                fontSize: 32,
              }}
            />
          </Box>
        </Box>

        {/* =====================================================
            TITRE
        ===================================================== */}

        <Typography
          sx={{
            textAlign: "center",

            fontSize: {
              xs: "24px",
              sm: "27px",
            },

            fontWeight: 700,

            color: "#1e293b",

            mb: 1,
          }}
        >
          Mot de passe oublié ?
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
          {step === 1 &&
            "Choisissez comment vous souhaitez recevoir votre code de vérification."}

          {step === 2 &&
            (method === "email"
              ? "Entrez votre adresse email pour recevoir le code."
              : "Entrez votre numéro de téléphone pour recevoir le code.")}

          {step === 3 &&
            "Entrez le code de vérification que vous avez reçu."}

          {step === 4 &&
            "Choisissez votre nouveau mot de passe."}
        </Typography>

        {/* =====================================================
            ÉTAPE 1
        ===================================================== */}

        {step === 1 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Button
              type="button"
              onClick={() => handleMethodSelect("email")}
              startIcon={<EmailOutlinedIcon />}
              sx={{
                height: 58,

                borderRadius: "15px",

                justifyContent: "flex-start",

                padding: "0 20px",

                textTransform: "none",

                fontSize: "15px",

                fontWeight: 600,

                color: "#334155",

                backgroundColor: "#fafafa",

                border: "1px solid #e2e8f0",

                "&:hover": {
                  backgroundColor: "#f8f5ef",

                  borderColor: "#cbb99f",
                },
              }}
            >
              Recevoir le code par Email
            </Button>

            <Button
              type="button"
              onClick={() => handleMethodSelect("phone")}
              startIcon={<PhoneOutlinedIcon />}
              sx={{
                height: 58,

                borderRadius: "15px",

                justifyContent: "flex-start",

                padding: "0 20px",

                textTransform: "none",

                fontSize: "15px",

                fontWeight: 600,

                color: "#334155",

                backgroundColor: "#fafafa",

                border: "1px solid #e2e8f0",

                "&:hover": {
                  backgroundColor: "#f8f5ef",

                  borderColor: "#cbb99f",
                },
              }}
            >
              Recevoir le code par SMS
            </Button>
          </Box>
        )}

        {/* =====================================================
            ÉTAPE 2
        ===================================================== */}

        {step === 2 && (
          <Box
            component="form"
            onSubmit={handleSendCode}
          >
            <TextField
              fullWidth
              autoFocus
              label={
                method === "email"
                  ? "Adresse email"
                  : "Numéro de téléphone"
              }
              value={identifier}
              onChange={(e) =>
                setIdentifier(e.target.value)
              }
              type={
                method === "email"
                  ? "email"
                  : "tel"
              }
              placeholder={
                method === "email"
                  ? "exemple@email.com"
                  : "20 000 000"
              }
              disabled={loading}
              sx={{
                mb: 2.5,

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
                  },
                },

                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#8a6a45",
                },
              }}
            />

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

                "&:hover": {
                  background:
                    "linear-gradient(135deg, #8c6d47 0%, #6f5335 100%)",
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
                "Envoyer le code"
              )}
            </Button>
          </Box>
        )}

        {/* =====================================================
            ÉTAPE 3
        ===================================================== */}

        {step === 3 && (
          <Box
            component="form"
            onSubmit={handleVerifyCode}
          >
            <TextField
              fullWidth
              autoFocus
              label="Code de vérification"
              value={code}
              onChange={(e) =>
                setCode(e.target.value)
              }
              inputProps={{
                maxLength: 6,
                inputMode: "numeric",
              }}
              placeholder="000000"
              disabled={loading}
              sx={{
                mb: 2.5,

                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",

                  backgroundColor: "#fafafa",

                  "& fieldset": {
                    borderColor: "#e2e8f0",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "#a88962",
                  },
                },
              }}
            />

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
                "Vérifier le code"
              )}
            </Button>

            <Button
              type="button"
              onClick={handleSendCode}
              disabled={loading}
              sx={{
                mt: 1.5,

                width: "100%",

                textTransform: "none",

                color: "#8a6a45",

                fontSize: "13px",

                "&:hover": {
                  background: "transparent",
                },
              }}
            >
              Renvoyer le code
            </Button>
          </Box>
        )}

        {/* =====================================================
            ÉTAPE 4
        ===================================================== */}

        {step === 4 && (
          <Box
            component="form"
            onSubmit={handleResetPassword}
          >
            <TextField
              fullWidth
              label="Nouveau mot de passe"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              disabled={loading}
              sx={{
                mb: 2,

                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",

                  backgroundColor: "#fafafa",

                  "& fieldset": {
                    borderColor: "#e2e8f0",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "#a88962",
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(
                          (prev) => !prev
                        )
                      }
                      edge="end"
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

            <TextField
              fullWidth
              label="Confirmer le mot de passe"
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              disabled={loading}
              sx={{
                mb: 2.5,

                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",

                  backgroundColor: "#fafafa",

                  "& fieldset": {
                    borderColor: "#e2e8f0",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "#a88962",
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(
                          (prev) => !prev
                        )
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <VisibilityOffOutlinedIcon />
                      ) : (
                        <VisibilityOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

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
                "Réinitialiser le mot de passe"
              )}
            </Button>
          </Box>
        )}

        {/* =====================================================
            RETOUR LOGIN
        ===================================================== */}

        <Box
          sx={{
            mt: 3,

            textAlign: "center",
          }}
        >
          <Button
            type="button"
            onClick={() => navigate("/")}
            sx={{
              textTransform: "none",

              fontSize: "13px",

              color: "#64748b",

              "&:hover": {
                background: "transparent",

                color: "#8a6a45",
              },
            }}
          >
            Retour à l'accueil
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
