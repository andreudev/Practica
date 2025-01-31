import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { signIn } from "../utils/auth";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { toast } from "react-toastify";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const url = "http://localhost:5000/api/users/login";
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/profile");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(url, {
        correo: email,
        contraseña: password,
      });
      signIn(response.data.token);
      setIsLoggedIn(true);
      if (response.data.rol === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data.mensaje) {
        setError(error.response.data.mensaje);
        toast.error(error.response.data.mensaje);
      } else {
        setError("Error al iniciar sesión");
        toast.error("Error al iniciar sesión");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center">
            <AiOutlineUser className="text-gray-500 mr-2" size={20} />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <RiLockPasswordLine className="text-gray-500 mr-2" size={20} />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2"
          >
            Login
          </button>
          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
