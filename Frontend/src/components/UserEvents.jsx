import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken, signOut } from "../utils/auth";
import { toast } from "react-toastify";

function UserEvents() {
  const [events, setEvents] = useState([]);
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-4 text-center">Eventos</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event) => (
            <li key={event._id} className="bg-gray-200 p-4 rounded shadow-md">
              <h3 className="text-xl font-bold">{event.titulo}</h3>
              <p>Descripción: {event.descripcion}</p>
              <p>Fecha: {new Date(event.fecha).toLocaleString()}</p>
              <p>Ubicación: {event.ubicacion}</p>
              <p>Capacidad: {event.capacidad} personas</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserEvents;
