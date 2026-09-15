import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { endpoint } from "../utils/config";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // ============================
  // CHANGE INPUT
  // ============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================
  // REGISTER
  // ============================

  const handleRegister = async (e) => {
    e.preventDefault();

    // ============================
    // Vérifications
    // ============================

    if (
      !data.firstname ||
      !data.lastname ||
      !data.password ||
      !data.confirmPassword
    ) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (!data.email && !data.phone) {
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
          email: data.email
            ? data.email.trim().toLowerCase()
            : undefined,
          phone: data.phone
            ? data.phone.trim()
            : undefined,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success(
          "Compte créé avec succès 🎉"
        );

        setTimeout(() => {
          navigate("/login");
        }, 1200);
      }

    } catch (error) {
      console.error("REGISTER ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la création du compte."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-400 via-slate-200 to-blue-950 px-4 py-10">

      <ToastContainer position="top-center" />

      <div className="w-full max-w-md">

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-7 sm:p-9">

          {/* LOGO */}

          <div className="flex justify-center mb-5">
            <img
              src="/logo.png"
              alt="Librairie Benzarti"
              className="w-28 h-28 object-contain"
            />
          </div>

          {/* TITLE */}

          <div className="text-center mb-7">

            <h1 className="text-3xl font-bold text-blue-950">
              Créer un compte
            </h1>

            <p className="text-gray-500 mt-2">
              Rejoignez Librairie Benzarti
            </p>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleRegister}
            className="flex flex-col gap-4"
          >

            {/* NOM / PRENOM */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="flex flex-col gap-2">

                <label className="text-gray-700 font-semibold">
                  Prénom
                </label>

                <input
                  type="text"
                  name="firstname"
                  value={data.firstname}
                  onChange={handleChange}
                  placeholder="Votre prénom"
                  autoComplete="given-name"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition"
                />

              </div>

              <div className="flex flex-col gap-2">

                <label className="text-gray-700 font-semibold">
                  Nom
                </label>

                <input
                  type="text"
                  name="lastname"
                  value={data.lastname}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  autoComplete="family-name"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition"
                />

              </div>

            </div>

            {/* EMAIL */}

            <div className="flex flex-col gap-2">

              <label className="text-gray-700 font-semibold">
                Email
                <span className="text-gray-400 font-normal ml-1">
                  (optionnel)
                </span>
              </label>

              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="exemple@gmail.com"
                autoComplete="email"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition"
              />

            </div>

            {/* TELEPHONE */}

            <div className="flex flex-col gap-2">

              <label className="text-gray-700 font-semibold">
                Téléphone
                <span className="text-gray-400 font-normal ml-1">
                  (optionnel)
                </span>
              </label>

              <input
                type="tel"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                placeholder="+216 XX XXX XXX"
                autoComplete="tel"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition"
              />

            </div>

            {/* INFO */}

            <p className="text-xs text-gray-500">
              * Vous devez renseigner au moins un email
              ou un numéro de téléphone.
            </p>

            {/* PASSWORD */}

            <div className="flex flex-col gap-2">

              <label className="text-gray-700 font-semibold">
                Mot de passe
              </label>

              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Minimum 6 caractères"
                autoComplete="new-password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition"
              />

            </div>

            {/* CONFIRM PASSWORD */}

            <div className="flex flex-col gap-2">

              <label className="text-gray-700 font-semibold">
                Confirmer le mot de passe
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Confirmez votre mot de passe"
                autoComplete="new-password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition"
              />

            </div>

            {/* REGISTER BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-slate-500 to-blue-950 hover:from-slate-600 hover:to-blue-900 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition duration-300 shadow-md mt-2"
            >
              {loading
                ? "Création du compte..."
                : "Créer mon compte"}
            </button>

          </form>

          {/* LOGIN */}

          <div className="text-center mt-7 pt-6 border-t border-gray-200">

            <span className="text-gray-600">
              Vous avez déjà un compte ?
            </span>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-800 font-semibold hover:underline ml-1"
            >
              Se connecter
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;