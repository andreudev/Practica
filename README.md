# Proyecto de Gestión de Eventos

Este proyecto es una aplicación completa de gestión de eventos que permite a los usuarios registrarse, iniciar sesión, ver eventos y reservar su asistencia a eventos. Los administradores pueden gestionar eventos, usuarios y reservas.

## Requisitos

- Node.js (v14 o superior)
- MongoDB (Atlas o local)

## Instalación

### Clonar el repositorio

```sh
git clone <URL_DEL_REPOSITORIO>
cd gestion-eventos
```

### Configuración del Backend

#### Instalar dependencias

```sh
cd Backend
npm install
```

#### Configurar variables de entorno

Crea un archivo `.env` en la carpeta `Backend` con el siguiente contenido:

```env
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/miBaseDeDatos
JWT_SECRET=tu_secreto
PORT=5000
```

_Asegúrate de reemplazar `<usuario>`, `<contraseña>` y `miBaseDeDatos` con tus credenciales de MongoDB Atlas._

#### Iniciar el servidor

```sh
npm start
```

El servidor debería estar corriendo en `http://localhost:5000`.

### Configuración del Frontend

#### Instalar dependencias

```sh
cd ../Frontend
npm install
```

#### Iniciar la aplicación

```sh
npm run dev
```

La aplicación debería estar corriendo en `http://localhost:3000`.

## Estructura del Proyecto

### Backend

- `app.js`: Configuración principal de Express.
- `server.js`: Punto de entrada del servidor.
- `db.js`: Configuración de la conexión a MongoDB.
- `authMiddleware.js`: Middleware de autenticación y autorización.
- `models/`: Modelos de Mongoose para `Event`, `Reservation` y `User`.
- `routes/`: Rutas de la API para `eventRoutes`, `reservationRoutes` y `userRoutes`.
- `sendEmail.js`: Utilidad para enviar correos electrónicos.
- `tests/`: Pruebas unitarias con Jest y Supertest.

### Frontend

- `App.jsx`: Configuración principal de React Router.
- `src/components/`: Componentes de React para la aplicación.
- `auth.js`: Utilidades de autenticación.
- `index.html`: Archivo HTML principal.
- `index.css`: Estilos globales.
- `tailwind.config.js`: Configuración de Tailwind CSS.
- `vite.config.js`: Configuración de Vite.

## Uso

### Funcionalidades del Usuario

- **Registro**: Los usuarios pueden registrarse proporcionando su nombre, correo electrónico y contraseña.
- **Inicio de Sesión**: Los usuarios pueden iniciar sesión con su correo electrónico y contraseña.
- **Ver Eventos**: Los usuarios pueden ver una lista de eventos disponibles.
- **Reservar Asistencia**: Los usuarios pueden reservar su asistencia a eventos.

### Funcionalidades del Administrador

- **Gestionar Eventos**: Los administradores pueden crear, editar y eliminar eventos.
- **Gestionar Usuarios**: Los administradores pueden ver, editar y eliminar usuarios.
- **Gestionar Reservas**: Los administradores pueden ver y eliminar reservas.
