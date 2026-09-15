import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { endpoint } from "../utils/config";
import { useAuth } from "../context/AuthContext";


const UserLogin = () => {
  
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [data, setData] = useState({
    identifier: "",
    password: "",
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
  // LOGIN
  // ============================

 const handleLogin = async (e) => {
  e.preventDefault();

  if (!data.identifier || !data.password) {
    toast.error("Veuillez remplir tous les champs.");
    return;
  }

  try {
    setLoading(true);

    const response = await axios.post(
      endpoint.userLogin,
      data,
      {
        withCredentials: true,
      }
    );

    console.log("LOGIN SUCCESS:", response.data);

    if (response.status === 200) {

  login(response.data.user);

  localStorage.setItem(
    "user",
    JSON.stringify(response.data.user)
  );

  toast.success("Connexion réussie !");

  setTimeout(() => {

    const from =
      location.state?.from || "/";

    navigate(from, {
      replace: true,
    });

  }, 700);
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

  // ============================
  // GOOGLE LOGIN
  // ============================

  const handleGoogleLogin = () => {
    window.location.href = endpoint.googleLogin;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-400 via-slate-200 to-blue-950 px-4 py-10">

      <ToastContainer position="top-center" />

      <div className="w-full max-w-md">

        {/* CARD */}

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
              Bienvenue 👋
            </h1>

            <p className="text-gray-500 mt-2">
              Connectez-vous à votre compte
            </p>

          </div>

          {/* GOOGLE */}

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition duration-200 shadow-sm"
          >

            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="#4285F4"
                d="M21.35 12.27c0-.79-.07-1.55-.23-2.27H12v4.3h5.23a4.47 4.47 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.92-4.18 2.92-7.42z"
              />
              <path
                fill="#34A853"
                d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.7-1.72-5.47-4.03H3.29v2.53A9.75 9.75 0 0 0 12 21.5z"
              />
              <path
                fill="#FBBC05"
                d="M6.53 13.6A5.86 5.86 0 0 1 6.22 12c0-.56.1-1.1.31-1.6V7.87H3.29A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.13l3.24-2.53z"
              />
              <path
                fill="#EA4335"
                d="M12 6.37c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.42 14.63 2.5 12 2.5a9.75 9.75 0 0 0-8.71 5.37l3.24 2.53C7.3 8.09 9.46 6.37 12 6.37z"
              />
            </svg>

            Continuer avec Google

          </button>

          {/* SEPARATOR */}

          <div className="flex items-center gap-3 my-6">

            <div className="flex-1 h-px bg-gray-200" />

            <span className="text-sm text-gray-400">
              ou
            </span>

            <div className="flex-1 h-px bg-gray-200" />

          </div>

          {/* FORM */}

          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-5"
          >

            {/* EMAIL / PHONE */}

            <div className="flex flex-col gap-2">

              <label className="text-gray-700 font-semibold">
                Email ou numéro de téléphone
              </label>

              <input
                type="text"
                name="identifier"
                value={data.identifier}
                onChange={handleChange}
                placeholder="Email ou +216 XX XXX XXX"
                autoComplete="username"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition"
              />

            </div>

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
                placeholder="Votre mot de passe"
                autoComplete="current-password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition"
              />

            </div>

            {/* FORGOT PASSWORD */}

            <div className="text-right">

              <button
                type="button"
                className="text-sm text-blue-700 hover:underline"
              >
                Mot de passe oublié ?
              </button>

            </div>

            {/* LOGIN */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-slate-500 to-blue-950 hover:from-slate-600 hover:to-blue-900 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition duration-300 shadow-md"
            >
              {loading
                ? "Connexion..."
                : "Se connecter"}
            </button>

          </form>

          {/* REGISTER */}

          <div className="text-center mt-7 pt-6 border-t border-gray-200">

            <span className="text-gray-600">
              Vous n'avez pas de compte ?
            </span>

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-blue-800 font-semibold hover:underline ml-1"
            >
              Créer un compte
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UserLogin;