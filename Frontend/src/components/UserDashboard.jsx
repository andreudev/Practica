import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken, signOut } from "../utils/auth";

function UserEvents() {
  const [events, setEvents] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
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

  const handleClearFilters = () => {
    setFilterDate("");
    setFilterLocation("");
  };

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.fecha).toISOString().slice(0, 10);
    const matchesDate = filterDate ? eventDate === filterDate : true;
    const matchesLocation = filterLocation
      ? event.ubicacion.toLowerCase().includes(filterLocation.toLowerCase())
      : true;
    return matchesDate && matchesLocation;
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-4 text-center">Eventos</h2>
        <div className="mb-4 flex justify-between items-end">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Filtrar por Fecha
            </label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Filtrar por Ubicación
            </label>
            <input
              type="text"
              placeholder="Buscar ubicación"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleClearFilters}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Limpiar Filtros
          </button>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEvents.map((event) => (
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
