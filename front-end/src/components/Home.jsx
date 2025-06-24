import Head from "./Head";
import MainContent from "./MainContent";
import { useState } from "react";
function Home() {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const sidePlay1 = true
  function side() {
    setSideBarOpen(!sidebarOpen);
  }
  return (
    <>
      <div className="container1">
        <Head side={side} searchTerm={searchTerm} setSearchTerm={setSearchTerm} sidebarOpen = {sidebarOpen} sidePlay1={sidePlay1}/>
      </div>
      <MainContent sidebarOpen={sidebarOpen} searchTerm={searchTerm}/>
    </>
  );
}

export default Home;
