import { Outlet, useLocation } from "react-router-dom";
import Head from "./components/Head";
import { useState } from "react";
function App() {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
   function side() {
    setSideBarOpen(!sidebarOpen);
  }

  // Determine based on current pathname
  const sidePlay1 = location.pathname.startsWith("/videos/");
  const varient = sidePlay1?"play":""
  return (
    <>
      <Head side={side} searchTerm={searchTerm} setSearchTerm={setSearchTerm} sidebarOpen = {sidebarOpen} sidePlay1={!sidePlay1} />
      <Outlet context={{ sidebarOpen, setSideBarOpen, searchTerm, setSearchTerm ,varient}}/>
    </>
  )
}

export default App
