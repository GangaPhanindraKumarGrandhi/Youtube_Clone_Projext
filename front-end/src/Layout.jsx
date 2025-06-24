// Layout.jsx
import { Outlet } from "react-router-dom";
import Head from "./components/Head";
import Sidebar from "./components/Sidebar";
import { useState } from "react";


function Layout() {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  function side() {
    setSideBarOpen(!sidebarOpen);
  }

  return (
    <>
      <div className="container1">
        <Head side={side} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className="app-layout">
        <aside className={`asidebar ${sidebarOpen ? "expanded" : ""}`}>
          <Sidebar sidebarOpen={sidebarOpen} />
        </aside>

        <main className="main-content">
          <Outlet context={{ searchTerm }} />
        </main>
      </div>
    </>
  );
}

export default Layout;
