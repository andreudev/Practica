const express = require("express");
const Event = require("../models/Event");
const { protectRoute, adminRoute } = require("../middlewares/authMiddleware");

const router = express.Router();

// Crear un evento (Admin)
router.post("/", protectRoute, adminRoute, async (req, res) => {
  const { titulo, descripcion, fecha, ubicacion, capacidad } = req.body;
  const event = new Event({
    titulo,
    descripcion,
    fecha,
    ubicacion,
    capacidad,
    organizador: req.user.id,
  });
  const savedEvent = await event.save();
  res.status(201).json(savedEvent);
});

// Listar todos los eventos
router.get("/", async (req, res) => {
  const events = await Event.find({}).populate("organizador", "nombre");
  res.status(200).json(events);
});

// Editar un evento (Admin)
router.put("/:id", protectRoute, adminRoute, async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, fecha, ubicacion, capacidad } = req.body;
  const updatedEvent = await Event.findByIdAndUpdate(
    id,
    { titulo, descripcion, fecha, ubicacion, capacidad },
    { new: true }
  );
  res.status(200).json(updatedEvent);
});

// Eliminar un evento (Admin)
router.delete("/:id", protectRoute, adminRoute, async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ mensaje: "Evento no encontrado" });
    }
    res.status(200).json({ mensaje: "Evento eliminado" });
  } catch (error) {
    console.error("Error al eliminar evento:", error);
    res.status(500).json({ mensaje: "Error en el servidor." });
  }
});

module.exports = router;
