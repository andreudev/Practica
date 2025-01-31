const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: Date, required: true },
  ubicacion: { type: String, required: true },
  capacidad: { type: Number, required: true },
  estado: {
    type: String,
    enum: ["programado", "en-curso", "finalizado"],
    default: "programado",
  },
  organizador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Event", eventSchema);
