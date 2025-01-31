import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken, signOut } from "../utils/auth";
import EditReservation from "./EditReservation";
import AddReservation from "./AddReservation";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function Reservations({ isAdmin }) {
  const [reservations, setReservations] = useState([]);
  const [editingReservation, setEditingReservation] = useState(null);
  const [showAddReservation, setShowAddReservation] = useState(false);
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchReservations = async () => {
      try {
        const url = isAdmin
          ? "http://localhost:5000/api/reservations/all"
          : "http://localhost:5000/api/reservations";
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReservations(response.data);
      } catch (error) {
        console.error(error);
        signOut();
        navigate("/");
      }
    };

    fetchReservations();
  }, [navigate, token, isAdmin]);

  const handleEdit = (reservation) => {
    setEditingReservation(reservation);
  };

  const handleUpdate = (updatedReservation) => {
    setReservations(
      reservations.map((reservation) =>
        reservation._id === updatedReservation._id
          ? updatedReservation
          : reservation
      )
    );
    setEditingReservation(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReservations(
        reservations.filter((reservation) => reservation._id !== id)
      );
      toast.success("Reserva eliminada exitosamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar la reserva");
    }
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirmar eliminación",
      message: "¿Estás seguro de que deseas eliminar esta reserva?",
      buttons: [
        {
          label: "Sí",
          onClick: () => handleDelete(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleCancel = () => {
    setEditingReservation(null);
  };

  const toggleAddReservation = () => {
    setShowAddReservation(!showAddReservation);
  };

  const handleAdd = (newReservation) => {
    setReservations([...reservations, newReservation]);
    setShowAddReservation(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-4 text-center">Reservas</h2>
        <button
          onClick={toggleAddReservation}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {showAddReservation ? "Cancelar" : "Agregar Reserva"}
        </button>
        {showAddReservation && <AddReservation onAdd={handleAdd} />}
        {editingReservation ? (
          <EditReservation
            reservation={editingReservation}
            onUpdate={handleUpdate}
            onCancel={handleCancel}
          />
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reservations.map((reservation) => (
              <li
                key={reservation._id}
                className="bg-gray-200 p-4 rounded shadow-md"
              >
                <h3 className="text-xl font-bold">
                  Evento: {reservation.eventoId.titulo}
                </h3>
                <p>
                  Inicio: {new Date(reservation.fecha_inicio).toLocaleString()}
                </p>
                <p>Fin: {new Date(reservation.fecha_fin).toLocaleString()}</p>
                <p>Usuario: {reservation.usuarioId.nombre}</p>
                <div className="flex justify-end mt-2 space-x-2">
                  <button
                    onClick={() => handleEdit(reservation)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => confirmDelete(reservation._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Reservations;
