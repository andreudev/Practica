import { useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import { toast } from "react-toastify";

function EditReservation({ reservation, onUpdate, onCancel }) {
  const [fechaInicio, setFechaInicio] = useState(
    new Date(reservation.fecha_inicio).toISOString().slice(0, 16)
  );
  const [fechaFin, setFechaFin] = useState(
    new Date(reservation.fecha_fin).toISOString().slice(0, 16)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const token = getToken();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/reservations/${reservation._id}`,
        { fecha_inicio: fechaInicio, fecha_fin: fechaFin },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onUpdate(response.data);
      toast.success("Reserva actualizada exitosamente");
    } catch (error) {
      console.error(error);
      setError("Error al actualizar la reserva");
      toast.error("Error al actualizar la reserva");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h3 className="text-2xl font-bold mb-4 text-center">Editar Reserva</h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
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
          {loading ? "Actualizando..." : "Actualizar Reserva"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default EditReservation;
