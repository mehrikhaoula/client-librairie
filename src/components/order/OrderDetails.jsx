import React from "react";

const OrderDetails = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif font-bold text-blue-950">
            Détails de la commande
          </h2>

          <button
            onClick={onClose}
            className="text-red-600 hover:text-red-900 font-bold"
          >
            ✕
          </button>
        </div>


        {/* Client */}
        <div className="mb-5 border-b pb-4">

          <h3 className="text-lg font-bold text-gray-700 mb-2">
            Informations client
          </h3>

          <p>
            <b>Nom :</b>{" "}
            {order.customer?.firstName} {order.customer?.lastName}
          </p>

          <p>
            <b>Téléphone :</b>{" "}
            {order.customer?.phone}
          </p>

          <p>
            <b>Adresse :</b>{" "}
            {order.customer?.address}
          </p>

        </div>


        {/* Status */}
        <div className="grid grid-cols-3 gap-4 mb-5">

          <div className="bg-gray-100 rounded-lg p-3">
            <p className="text-sm text-gray-500">
              Statut
            </p>
            <p className="font-bold">
              {order.status}
            </p>
          </div>


          <div className="bg-gray-100 rounded-lg p-3">
            <p className="text-sm text-gray-500">
              Paiement
            </p>
            <p className="font-bold">
              {order.paymentStatus}
            </p>
          </div>


          <div className="bg-gray-100 rounded-lg p-3">
            <p className="text-sm text-gray-500">
              Méthode
            </p>
            <p className="font-bold">
              {order.paymentMethod}
            </p>
          </div>

        </div>



        {/* Produits */}
        <div>

          <h3 className="text-lg font-bold text-gray-700 mb-3">
            Produits commandés
          </h3>


          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-blue-950 text-white">

                <th className="p-3 text-left">
                  Produit
                </th>
                <th className="p-3 text-left">
                  Couleur
                </th>
                <th className="p-3">
                  Quantité
                </th>

                <th className="p-3">
                  Prix
                </th>

              </tr>
            </thead>
            <tbody>
              {order.items?.map((item,index)=>(
                <tr
                  key={index}
                  className="border-b"
                >
                  <td className="p-3">
                    {item.name}
                  </td>
                  
                  <td className="p-3">
                    {item.couleur}
                  </td>


                  <td className="p-3 text-center">
                    {item.quantity}
                  </td>
                  <td className="p-3 text-center">
                    {item.price} €
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="text-right mt-5">
          <span className="text-xl font-bold text-blue-950">
            Total : {order.total?.toFixed(2)} €
          </span>
        </div>
      </div>
    </div>
  );
};


export default OrderDetails;