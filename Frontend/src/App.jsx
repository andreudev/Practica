import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Events from "./components/Events";
import Reservations from "./components/Reservations";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import Users from "./components/Users";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login />} />
        <Route path="/events" element={isLoggedIn ? <Events /> : <Login />} />
        <Route
          path="/reservations"
          element={isLoggedIn ? <Reservations /> : <Login />}
        />
        <Route
          path="/admin-dashboard"
          element={isLoggedIn ? <AdminDashboard /> : <Login />}
        />
        <Route
          path="/user-dashboard"
          element={isLoggedIn ? <UserDashboard /> : <Login />}
        />
        <Route path="/users" element={isLoggedIn ? <Users /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
