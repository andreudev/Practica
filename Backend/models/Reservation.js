const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  eventoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  fecha_inicio: { type: Date, required: true },
  fecha_fin: { type: Date, required: true },
});

module.exports = mongoose.model("Reservation", reservationSchema);
