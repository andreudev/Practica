import { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import { toast } from "react-toastify";

function AddReservation({ onAdd }) {
  const [eventos, setEventos] = useState([]);
  const [eventoId, setEventoId] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEventos = async () => {
      const token = getToken();
      try {
        const response = await axios.get("http://localhost:5000/api/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEventos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEventos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const token = getToken();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/reservations",
        { eventoId, fecha_inicio: fechaInicio, fecha_fin: fechaFin },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEventoId("");
      setFechaInicio("");
      setFechaFin("");
      toast.success("Reserva agregada exitosamente");
      onAdd(response.data);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data.mensaje) {
        setError(error.response.data.mensaje);
        toast.error(error.response.data.mensaje);
      } else {
        setError("Error al agregar la reserva");
        toast.error("Error al agregar la reserva");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h3 className="text-2xl font-bold mb-4 text-center">Agregar Reserva</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="eventoId"
          >
            Evento
          </label>
          <select
            id="eventoId"
            value={eventoId}
            onChange={(e) => setEventoId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Seleccione un evento</option>
            {eventos.map((evento) => (
              <option key={evento._id} value={evento._id}>
                {evento.titulo} - {evento.ubicacion}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fechaInicio"
          >
            Fecha de Inicio
          </label>
          <input
            type="datetime-local"
            id="fechaInicio"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fechaFin"
          >
            Fecha de Fin
          </label>
          <input
            type="datetime-local"
            id="fechaFin"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? "Agregando..." : "Agregar Reserva"}
        </button>
      </form>
    </div>
  );
}

export default AddReservation;
