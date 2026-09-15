import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  // =====================================
  // PANIER NORMAL
  // =====================================

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");

    return saved ? JSON.parse(saved) : [];
  });

  // =====================================
  // COMMANDE EN MODIFICATION
  // =====================================

  const [editingOrder, setEditingOrder] = useState(() => {
    const saved = sessionStorage.getItem("editingOrder");

    if (!saved) return null;

    try {
      return JSON.parse(saved);
    } catch {
      sessionStorage.removeItem("editingOrder");
      return null;
    }
  });

  const [editingCart, setEditingCart] = useState(() => {
    const saved = sessionStorage.getItem("editingCart");

    if (!saved) return [];

    try {
      return JSON.parse(saved);
    } catch {
      sessionStorage.removeItem("editingCart");
      return [];
    }
  });

  // =====================================
  // SAUVEGARDE PANIER NORMAL
  // =====================================

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // =====================================
  // SAUVEGARDE MODIFICATION
  // =====================================

  useEffect(() => {
    if (editingOrder) {
      sessionStorage.setItem(
        "editingOrder",
        JSON.stringify(editingOrder)
      );

      sessionStorage.setItem(
        "editingCart",
        JSON.stringify(editingCart)
      );
    }
  }, [editingOrder, editingCart]);

  // =====================================
  // COMMENCER MODIFICATION
  // =====================================

  const startEditingOrder = useCallback((order) => {
    const orderItems =
      order.items?.map((item) => ({
        _id: item.productId,
        productId: item.productId,
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity),
      })) || [];

    setEditingOrder(order);
    setEditingCart(orderItems);

    sessionStorage.setItem(
      "editingOrder",
      JSON.stringify(order)
    );

    sessionStorage.setItem(
      "editingCart",
      JSON.stringify(orderItems)
    );
  }, []);

  // =====================================
  // ANNULER MODIFICATION
  // =====================================

  const cancelEditingOrder = useCallback(() => {
    setEditingOrder(null);
    setEditingCart([]);

    sessionStorage.removeItem("editingOrder");
    sessionStorage.removeItem("editingCart");
  }, []);

  // =====================================
  // PANIER NORMAL
  // =====================================

  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find(
        (item) => item._id === product._id
      );

      if (exists) {
        return prevCart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => item._id !== id
      )
    );
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // =====================================
  // PANIER DE MODIFICATION
  // =====================================

  const addToEditingCart = (product) => {
    setEditingCart((prevCart) => {
      const exists = prevCart.find(
        (item) => item._id === product._id
      );

      if (exists) {
        return prevCart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromEditingCart = (id) => {
    setEditingCart((prevCart) =>
      prevCart.filter(
        (item) => item._id !== id
      )
    );
  };

  const increaseEditingQuantity = (id) => {
    setEditingCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseEditingQuantity = (id) => {
    setEditingCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        // ==========================
        // PANIER NORMAL
        // ==========================
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,

        // ==========================
        // MODIFICATION COMMANDE
        // ==========================
        editingOrder,
        editingCart,

        startEditingOrder,
        cancelEditingOrder,

        addToEditingCart,
        removeFromEditingCart,
        increaseEditingQuantity,
        decreaseEditingQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
