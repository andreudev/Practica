const express = require("express");
const Reservation = require("../models/Reservation");
const { protectRoute, adminRoute } = require("../middlewares/authMiddleware");

const router = express.Router();

// Crear una reserva para un evento
router.post("/", protectRoute, async (req, res) => {
  const { eventoId, fecha_inicio, fecha_fin } = req.body;

  const reservation = new Reservation({
    usuarioId: req.user.id,
    eventoId,
    fecha_inicio,
    fecha_fin,
  });
  const savedReservation = await reservation.save();

  // Poblar los datos del evento en la reserva
  const populatedReservation = await Reservation.findById(
    savedReservation._id
  ).populate("eventoId");

  res.status(201).json(populatedReservation);
});

// Listar las reservas del usuario
router.get("/", protectRoute, async (req, res) => {
  const reservations = await Reservation.find({
    usuarioId: req.user.id,
  }).populate("eventoId");
  res.status(200).json(reservations);
});

// Listar todas las reservas (Admin)
router.get("/all", protectRoute, adminRoute, async (req, res) => {
  const reservations = await Reservation.find({}).populate(
    "eventoId usuarioId"
  );
  res.status(200).json(reservations);
});

// Editar una reserva
router.put("/:id", protectRoute, async (req, res) => {
  const { id } = req.params;
  const { fecha_inicio, fecha_fin } = req.body;

  const updatedReservation = await Reservation.findByIdAndUpdate(
    id,
    { fecha_inicio, fecha_fin },
    { new: true }
  ).populate("eventoId");
  res.status(200).json(updatedReservation);
});

// Eliminar una reserva
router.delete("/:id", protectRoute, async (req, res) => {
  const { id } = req.params;
  await Reservation.findByIdAndDelete(id);
  res.status(200).json({ mensaje: "Reserva eliminada" });
});

module.exports = router;
