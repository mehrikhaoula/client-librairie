import React from "react";

const OrderDetails = ({ order, onClose }) => {
  if (!order) return null;

  const customer = order.customer || {};
  const items = order.items || [];

  const totalItems = items.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">

        {/* Header */}
        <div className="bg-gradient-to-r from-slate-500 to-blue-950 text-white px-6 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold font-serif">
              🛒 DÉTAIL DE LA COMMANDE
            </h2>

            <p className="text-sm opacity-80 mt-1">
              Commande #{order._id?.slice(-8).toUpperCase()}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-white text-2xl hover:text-gray-300"
          >
            ✕
          </button>
        </div>

        <div className="p-6">

          {/* CLIENT */}
          <section className="mb-6">
            <h3 className="text-lg font-bold text-blue-950 mb-3 border-b pb-2">
              👤 CLIENT
            </h3>

            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Nom :</strong>{" "}
                {customer.firstName} {customer.lastName}
              </p>

              <p>
                <strong>📞 Téléphone :</strong>{" "}
                {customer.phone || "—"}
              </p>

              <p>
                <strong>📍 Adresse :</strong>{" "}
                {customer.address || "—"}
              </p>
            </div>
          </section>

          {/* COMMANDE */}
          <section className="mb-6">
            <h3 className="text-lg font-bold text-blue-950 mb-3 border-b pb-2">
              📦 DÉTAIL DE LA COMMANDE
            </h3>

            <div className="space-y-4">

              {items.map((item, index) => {
                const quantity = Number(item.quantity || 1);
                const price = Number(item.price || 0);
                const subtotal = price * quantity;

                return (
                  <div
                    key={item.productId || index}
                    className="bg-gray-50 border rounded-xl p-4"
                  >
                    <div className="flex justify-between items-start gap-4">

                      <div>
                        <p className="font-bold text-gray-800">
                          {index + 1}. 📚 {item.name}
                        </p>

                        <p className="text-sm text-gray-600 mt-2">
                          🔢 Quantité : {quantity}
                        </p>

                        <p className="text-sm text-gray-600">
                          💰 Prix unitaire : {price.toFixed(2)} Dt
                        </p>
                      </div>

                      <div className="font-bold text-blue-950 whitespace-nowrap">
                        {subtotal.toFixed(2)} Dt
                      </div>

                    </div>
                  </div>
                );
              })}

            </div>
          </section>

          {/* TOTAL */}
          <section className="border-t-2 border-b-2 py-5 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-700">
                  📦 Nombre d'articles :{" "}
                  <strong>{totalItems}</strong>
                </p>
              </div>

              <div className="text-2xl font-extrabold text-blue-950">
                💳 {Number(order.total || 0).toFixed(2)} Dt
              </div>
            </div>
          </section>

          {/* PAIEMENT */}
          <section className="mb-6">
            <h3 className="text-lg font-bold text-blue-950 mb-3 border-b pb-2">
              💰 PAIEMENT
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">
                  Statut paiement
                </p>

                <p className="font-bold text-gray-800">
                  {order.paymentStatus || "—"}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">
                  Méthode de paiement
                </p>

                <p className="font-bold text-gray-800">
                  {order.paymentMethod || "—"}
                </p>
              </div>

            </div>
          </section>

          {/* STATUT */}
          <section className="mb-6">
            <h3 className="text-lg font-bold text-blue-950 mb-3 border-b pb-2">
              📋 COMMANDE
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">
                  Statut
                </p>

                <p className="font-bold text-gray-800">
                  {order.status || "En attente"}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">
                  Date
                </p>

                <p className="font-bold text-gray-800">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString("fr-FR")
                    : "—"}
                </p>
              </div>

            </div>
          </section>

          {/* BUTTON */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-lg bg-blue-950 text-white font-semibold hover:bg-blue-900 transition"
            >
              Fermer
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderDetails;