require("dotenv").config();
const connectDB = require("./config/db");
const app = require("./app");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

// Conectar a la base de datos
connectDB();

// Configurar rutas
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/reservations", reservationRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto http://localhost:${port}`);
});
