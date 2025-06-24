import { useState } from "react";
import Content from "./Content";
import Filter from "./filter";
import { useOutletContext } from "react-router-dom";

function MainContent() {
  const { sidebarOpen } = useOutletContext();
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="app-layout">
      <main className="main-content">
        <Filter sidebarOpen={sidebarOpen} onCategorySelect={setSelectedCategory} selectedCategory={selectedCategory} />
        <div className={`content ${sidebarOpen ? "expanded" : ""}`}>
          <Content category={selectedCategory} />
        </div>
      </main>
    </div>
  );
}

export default MainContent;
