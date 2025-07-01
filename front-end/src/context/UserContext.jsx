import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get("http://localhost:5000/api/user/profile", {
        headers: { Authorization: `JWT ${token}` },
      });

      const { UserName, Email, avtar } = res.data.user;
      setUser({ UserName, Email, avtar });
    } catch (err) {
      console.error("User fetch failed:", err);
      setUser(null);
      localStorage.removeItem("token");
      toast.error("Session expired.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout, fetchUserProfile, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext };
export default UserContext;
