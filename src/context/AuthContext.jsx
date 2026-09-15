import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { endpoint } from "../utils/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);
  const [loading, setLoading] = useState(true);

  // ============================
  // CHECK SESSION
  // ============================

  const checkAuth = async () => {
    try {
      console.log("🔐 AUTH → vérification session...");

      const response = await axios.get(
        endpoint.getMe,
        {
          withCredentials: true,
        }
      );

      if (
        response.data.success &&
        response.data.user
      ) {
        setUser(response.data.user);
        setIsAuthenticated(true);

        console.log(
          "✅ USER CONNECTÉ:",
          response.data.user
        );
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log(
        "❌ USER NON CONNECTÉ"
      );

      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // CHECK AU DÉMARRAGE
  // ============================

  useEffect(() => {
    checkAuth();
  }, []);

  // ============================
  // LOGIN
  // ============================

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  // ============================
  // LOGOUT
  // ============================

  const logout = async () => {
    try {
      // On ajoutera la vraie route logout après
      setUser(null);
      setIsAuthenticated(false);

      localStorage.removeItem("user");
    } catch (error) {
      console.error(
        "LOGOUT ERROR:",
        error
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ============================
// HOOK
// ============================

export const useAuth = () => {
  return useContext(AuthContext);
};