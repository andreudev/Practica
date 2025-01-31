import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken, signOut } from "../utils/auth";
import AddUser from "./AddUser";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [rol, setRol] = useState("usuario");
  const [showAddUser, setShowAddUser] = useState(false);
  const navigate = useNavigate();
  const url = "http://localhost:5000/api/users";

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error(error);
        signOut();
        navigate("/");
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleEdit = (user) => {
    setEditingUser(user);
    setNombre(user.nombre);
    setCorreo(user.correo);
    setRol(user.rol);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = getToken();
    try {
      const response = await axios.put(
        `${url}/${editingUser._id}`,
        { nombre, correo, rol },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(
        users.map((user) =>
          user._id === response.data._id ? response.data : user
        )
      );
      setEditingUser(null);
      toast.success("Usuario actualizado exitosamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el usuario");
    }
  };

  const handleDelete = async (id) => {
    const token = getToken();
    try {
      await axios.delete(`${url}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== id));
      toast.success("Usuario eliminado exitosamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el usuario");
    }
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirmar eliminación",
      message: "¿Estás seguro de que deseas eliminar este usuario?",
      buttons: [
        {
          label: "Sí",
          onClick: () => handleDelete(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleCancel = () => {
    setEditingUser(null);
    setNombre("");
    setCorreo("");
    setRol("usuario");
  };

  const toggleAddUser = () => {
    setShowAddUser(!showAddUser);
  };

  const handleAdd = (newUser) => {
    setUsers([...users, newUser]);
    setShowAddUser(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-4 text-center">Usuarios</h2>
        <button
          onClick={toggleAddUser}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {showAddUser ? "Cancelar" : "Agregar Usuario"}
        </button>
        {showAddUser && <AddUser onAdd={handleAdd} />}
        {editingUser ? (
          <form onSubmit={handleUpdate} className="mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="correo"
              >
                Correo
              </label>
              <input
                type="email"
                id="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="rol"
              >
                Rol
              </label>
              <select
                id="rol"
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="usuario">Usuario</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Actualizar Usuario
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
            >
              Cancelar
            </button>
          </form>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.map((user) => (
              <li
                key={user._id}
                className="bg-gray-200 p-4 rounded shadow-md flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-bold">{user.nombre}</h3>
                  <p>{user.correo}</p>
                  <p>Rol: {user.rol}</p>
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(user)}
                    className="ml-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => confirmDelete(user._id)}
                    className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Users;
