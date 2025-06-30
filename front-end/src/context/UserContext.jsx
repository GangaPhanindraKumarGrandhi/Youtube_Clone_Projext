import { createContext, useState, useEffect } from "react";

// Create a context for user authentication data
const UserContext = createContext();

// Context provider component to wrap around parts of the app needing access to user data
export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // `user` object could include id, name, email, channelData, etc.

  // On component mount, try to restore user data from localStorage (for persistence after refresh)
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Convert back from string to object
    }
  }, []);

  // On user state change, store or remove from localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("loggedUser", JSON.stringify(user)); // Save user data
    } else {
      localStorage.removeItem("loggedUser"); // Clear on logout
    }
  }, [user]);

  // Logout function clears both state and localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedUser");
  };

  return (
    // Provide `user`, `setUser`, and `logout` to children via context
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Export context and provider
export { UserContext };
export default UserContext;
