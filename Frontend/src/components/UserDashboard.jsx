import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserEvents from "./UserEvents";
import Reservations from "./Reservations";
import { signOut } from "../utils/auth";

function UserDashboard() {
  const [activeTab, setActiveTab] = useState("events");
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "events":
        return <UserEvents />;
      case "reservations":
        return <Reservations />;
      default:
        return <UserEvents />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-6xl mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">User Dashboard</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Logout
          </button>
        </div>
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setActiveTab("events")}
            className={`${
              activeTab === "events" ? "bg-blue-700" : "bg-blue-500"
            } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            Eventos
          </button>
          <button
            onClick={() => setActiveTab("reservations")}
            className={`${
              activeTab === "reservations" ? "bg-blue-700" : "bg-blue-500"
            } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            Reservas
          </button>
        </div>
        <div className="mt-4">{renderContent()}</div>
      </div>
    </div>
  );
}

export default UserDashboard;
