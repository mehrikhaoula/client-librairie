import React, { useState } from "react";
import axios from "axios";
import { useNavigate, } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { endpoint } from "../utils/config";
import "./Register.css";
import { useAuth } from "../context/AuthContext";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";


const Register = () => {
  const navigate = useNavigate();
  
  const { login, checkAuth } = useAuth();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !data.firstname.trim() ||
      !data.lastname.trim() ||
      !data.password ||
      !data.confirmPassword
    ) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (!data.email.trim() && !data.phone.trim()) {
      toast.error(
        "Veuillez saisir un email ou un numéro de téléphone."
      );
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    if (data.password.length < 6) {
      toast.error(
        "Le mot de passe doit contenir au moins 6 caractères."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        endpoint.userRegister,
        {
          firstname: data.firstname.trim(),
          lastname: data.lastname.trim(),
          email: data.email.trim()
            ? data.email.trim().toLowerCase()
            : undefined,
          phone: data.phone.trim()
            ? data.phone.trim()
            : undefined,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
  toast.success("Compte créé avec succès 🎉");

  // Le backend vient de créer la session
  // On met à jour AuthContext + on vérifie réellement le cookie
  if (response.data?.user) {
    login(response.data.user);
  }

  await checkAuth();

  setTimeout(() => {
    navigate("/checkout");
  }, 1200);
}

    } catch (error) {
  toast.error(
    error.response?.data?.message ||
      "Erreur lors de la création du compte."
  );
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      <ToastContainer position="top-center" />

      {/* DECORATIONS */}

      <div className="register-circle circle-one"></div>
      <div className="register-circle circle-two"></div>
      <div className="register-circle circle-three"></div>
      <div className="register-circle circle-four"></div>

      <div className="register-small-dot dot-one"></div>
      <div className="register-small-dot dot-two"></div>
      <div className="register-small-dot dot-three"></div>

      {/* CARD */}

      <div className="register-card">

        {/* TOP LINE */}

        <div className="register-top-line"></div>

        {/* LOGO */}

        <div className="register-logo-wrapper">

          <div className="register-logo-glow"></div>

          <div className="register-logo">
            <img
              src="/logo.png"
              alt="Librairie Benzarti"
            />
          </div>

        </div>

        {/* TITLE */}

        <div className="register-header">

          <span className="register-badge">
            📚 Librairie Benzarti
          </span>

          <h1>Créer un compte</h1>

          <p>
            Rejoignez notre communauté et profitez
            pleinement de votre expérience.
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleRegister}
          className="register-form"
        >

          {/* FIRST / LAST NAME */}

          <div className="register-row">

            <div className="register-field">
              <label>Prénom</label>

              <input
                type="text"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
                placeholder="Votre prénom"
                autoComplete="given-name"
              />
            </div>

            <div className="register-field">
              <label>Nom</label>

              <input
                type="text"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
                placeholder="Votre nom"
                autoComplete="family-name"
              />
            </div>

          </div>

          {/* EMAIL */}

          <div className="register-field">

            <label>
              Email
              <span> (optionnel)</span>
            </label>

            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="exemple@gmail.com"
              autoComplete="email"
            />

          </div>

          {/* PHONE */}

          <div className="register-field">

            <label>
              Téléphone
              <span> (optionnel)</span>
            </label>

            <input
              type="tel"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              placeholder="+216 XX XXX XXX"
              autoComplete="tel"
            />

          </div>

          {/* INFO */}

          <div className="register-info">

            <div className="info-icon">i</div>

            <p>
              Vous devez renseigner au moins un email
              ou un numéro de téléphone.
            </p>

          </div>

          {/* PASSWORD */}

<div className="register-field">

  <label>Mot de passe</label>

  <div className="password-input-wrapper">

    <input
      type={showPassword ? "text" : "password"}
      name="password"
      value={data.password}
      onChange={handleChange}
      placeholder="Minimum 6 caractères"
      autoComplete="new-password"
    />

    <button
      type="button"
      className="password-toggle"
      onClick={() =>
        setShowPassword((prev) => !prev)
      }
      aria-label={
        showPassword
          ? "Masquer le mot de passe"
          : "Afficher le mot de passe"
      }
    >
      {showPassword ? (
        <VisibilityOffOutlinedIcon />
      ) : (
        <VisibilityOutlinedIcon />
      )}
    </button>

  </div>

</div>


{/* CONFIRM PASSWORD */}

<div className="register-field">

  <label>Confirmer le mot de passe</label>

  <div className="password-input-wrapper">

    <input
      type={showConfirmPassword ? "text" : "password"}
      name="confirmPassword"
      value={data.confirmPassword}
      onChange={handleChange}
      placeholder="Confirmez votre mot de passe"
      autoComplete="new-password"
    />

    <button
      type="button"
      className="password-toggle"
      onClick={() =>
        setShowConfirmPassword((prev) => !prev)
      }
      aria-label={
        showConfirmPassword
          ? "Masquer la confirmation"
          : "Afficher la confirmation"
      }
    >
      {showConfirmPassword ? (
        <VisibilityOffOutlinedIcon />
      ) : (
        <VisibilityOutlinedIcon />
      )}
    </button>

  </div>

</div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="register-button"
          >
            {loading
              ? "Création du compte..."
              : "Créer mon compte"}
          </button>

        </form>

        {/* LOGIN */}

        <div className="register-login">
  <p>Vous avez déjà un compte ?</p>

  <button
    type="button"
    onClick={() =>
      navigate("/cart", {
        state: { fromLogin: true },
      })
    }
  >
    Se connecter
  </button>
</div>

        {/* FOOTER */}

        <div className="register-footer">
          © {new Date().getFullYear()} Librairie Benzarti
        </div>

      </div>

    </div>
  );
};

export default Register;
