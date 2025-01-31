import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../utils/auth";
import { BsFillPersonFill } from "react-icons/bs";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const url = "http://localhost:5000/api/users/profile";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        if (response.data.rol === "admin") {
          navigate("/admin-dashboard");
        }
      } catch (error) {
        console.error(error);
        signOut();
        navigate("/");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
        {user ? (
          <>
            <div className="flex items-center mb-4">
              <BsFillPersonFill className="text-gray-500 mr-2" size={30} />
              <p className="text-lg">Email: {user.correo}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Out
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
