import { useState } from "react";
import Content from "./Content";
import Filter from "./filter";
import { useOutletContext } from "react-router-dom";

function MainContent() {
  const { sidebarOpen } = useOutletContext(); // Access sidebar state from layout
  const [selectedCategory, setSelectedCategory] = useState("All"); // Track selected video category

  return (
    <div className="app-layout">
      <main className="main-content">
        {/* Category Filter Section */}
        <Filter
          sidebarOpen={sidebarOpen}
          onCategorySelect={setSelectedCategory}
          selectedCategory={selectedCategory}
        />

        {/* Video Content Section */}
        <div className={`content ${sidebarOpen ? "expanded" : ""}`}>
          <Content category={selectedCategory} />
        </div>
      </main>
    </div>
  );
}

export default MainContent;
