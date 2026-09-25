const API_BASE_URL_BASE = "https://backlibrairie.onrender.com";

const API_BASE_URL =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1")
    ? "http://localhost:3010/api"
    : `${API_BASE_URL_BASE}/api`;
    
export const endpoint = {
  login: `${API_BASE_URL}/login`,
  
  // User
  userLogin: `${API_BASE_URL}/user/login`,
  userRegister: `${API_BASE_URL}/user/register`,
  getMe: `${API_BASE_URL}/user/me`,

  forgotPassword: `${API_BASE_URL}/user/forgot-password`,
verifyResetCode: `${API_BASE_URL}/user/verify-reset-code`,
resetPassword: `${API_BASE_URL}/user/reset-password`,

  // categorie
  getAllCategorie: `${API_BASE_URL}/categories`,
  addCategorie: `${API_BASE_URL}/categorie`,
  categorieById: (id) => `${API_BASE_URL}/categorie/${id}`,

  // produit
  getAllProduit: `${API_BASE_URL}/produits`,
  addProduit: `${API_BASE_URL}/produit`,
  produitById: (id) => `${API_BASE_URL}/produit/${id}`,
  imageUploadProduit: `${API_BASE_URL}/files/upload-product`,

  imageReadProduit: (imgUrl) =>
    imgUrl?.startsWith("http")
      ? imgUrl
      : `${API_BASE_URL_BASE}${imgUrl}`,

  // users
  getAllUsers: `${API_BASE_URL}/users`,
  addUser: `${API_BASE_URL}/user`,
  userById: (id) => `${API_BASE_URL}/user/${id}`,

// orders
getAllOrders: `${API_BASE_URL}/orders`,
createOrder: `${API_BASE_URL}/orders`,
myOrders: `${API_BASE_URL}/orders/my-orders`,
orderById: (id) => `${API_BASE_URL}/orders/${id}`,

// Google Auth
googleLogin: `${API_BASE_URL}/auth/google`,

};