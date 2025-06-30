import { useEffect, useRef } from "react";

function Filter({ sidebarOpen, onCategorySelect, selectedCategory }) {
  const scrollRef = useRef(null);
  const leftBtnRef = useRef(null);
  const rightBtnRef = useRef(null);

  // List of video categories
  const categories = [
    "All", "Music", "Hindi Songs", "Indian Pop Music", "Movie", "CSS",
    "Education", "JavaScript", "Data Structures", "Recruitment",
    "Java", "Python", "Comedy Scenes", "Recently uploaded", "New To You",
  ];

  // Show/hide scroll buttons based on scroll position
  const updateButtons = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollLeft = scrollContainer.scrollLeft;
    const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const threshold = 1;

    if (leftBtnRef.current) {
      leftBtnRef.current.style.display = scrollLeft <= threshold ? "none" : "block";
    }

    if (rightBtnRef.current) {
      rightBtnRef.current.style.display = scrollLeft >= Math.ceil(maxScrollLeft - threshold) ? "none" : "block";
    }
  };

  // Scroll left and right smoothly
  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });

  // Attach scroll event listener when component mounts or sidebar state changes
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    scrollContainer.addEventListener("scroll", updateButtons);
    updateButtons(); // Initial check

    return () => scrollContainer.removeEventListener("scroll", updateButtons);
  }, [sidebarOpen]);

  return (
    <div className={`filterButton ${sidebarOpen ? "expanded" : ""}`}>
      {/* Scroll Left Button */}
      <button ref={leftBtnRef} className="scroll-btn left" onClick={scrollLeft}>
        {"<"}
      </button>

      {/* Scrollable Category Buttons */}
      <div className="scroll-container" ref={scrollRef}>
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active-category" : ""}
            onClick={() => onCategorySelect(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Scroll Right Button */}
      <button ref={rightBtnRef} className="scroll-btn right" onClick={scrollRight}>
        {">"}
      </button>
    </div>
  );
}

export default Filter;
