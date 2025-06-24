import { createContext, useState, useEffect } from "react";

// Create the context
const UserContext = createContext();
export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // user: { id, name, email, channelData }

  // Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save user to localStorage when user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("loggedUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("loggedUser");
    }
  }, [user]);

  // Logout handler
  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedUser");
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export {UserContext}
export default  UserContext
