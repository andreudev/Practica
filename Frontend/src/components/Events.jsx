import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken, signOut } from "../utils/auth";
import EditEvent from "./EditEvent";
import AddEvent from "./AddEvent";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const navigate = useNavigate();
  const url = "http://localhost:5000/api/events";

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/");
      return;
    }

    const fetchEvents = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error(error);
        signOut();
        navigate("/");
      }
    };

    fetchEvents();
  }, [navigate]);

  const handleEdit = (event) => {
    setEditingEvent(event);
  };

  const handleUpdate = (updatedEvent) => {
    setEvents(
      events.map((event) =>
        event._id === updatedEvent._id ? updatedEvent : event
      )
    );
    setEditingEvent(null);
  };

  const handleDelete = async (id) => {
    const token = getToken();
    try {
      await axios.delete(`${url}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(events.filter((event) => event._id !== id));
      toast.success("Evento eliminado exitosamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el evento");
    }
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirmar eliminación",
      message: "¿Estás seguro de que deseas eliminar este evento?",
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
    setEditingEvent(null);
  };

  const toggleAddEvent = () => {
    setShowAddEvent(!showAddEvent);
  };

  const handleAdd = (newEvent) => {
    setEvents([...events, newEvent]);
    setShowAddEvent(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-4 text-center">Eventos</h2>
        <button
          onClick={toggleAddEvent}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {showAddEvent ? "Cancelar" : "Agregar Evento"}
        </button>
        {showAddEvent && <AddEvent onAdd={handleAdd} />}
        {editingEvent ? (
          <EditEvent
            event={editingEvent}
            onUpdate={handleUpdate}
            onCancel={handleCancel}
          />
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((event) => (
              <li key={event._id} className="bg-gray-200 p-4 rounded shadow-md">
                <h3 className="text-xl font-bold">{event.titulo}</h3>
                <p>Descripción: {event.descripcion}</p>
                <p>Fecha: {new Date(event.fecha).toLocaleString()}</p>
                <p>Ubicación: {event.ubicacion}</p>
                <p>Capacidad: {event.capacidad} personas</p>
                <div className="flex justify-end mt-2 space-x-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => confirmDelete(event._id)}
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

export default Events;
