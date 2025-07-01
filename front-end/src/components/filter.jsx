import { useEffect, useRef,useState } from "react";
import defaultCategories from "../utils/categories";
import axios from "axios";

function Filter({ sidebarOpen, onCategorySelect, selectedCategory }) {
  const scrollRef = useRef(null);
  const leftBtnRef = useRef(null);
  const rightBtnRef = useRef(null);
  const [allCategories, setAllCategories] = useState([]);

  // List of video categories
   useEffect(() => {
    const fetchVideosAndBuildCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/videos");
        const videos = res.data;

        // Get unique categories used in videos
       // Normalize by lowercasing and trimming
        const usedCategories = Array.from(
          new Set(
            videos.map((video) =>
            video.category.trim().toLowerCase()
            )
         )
        );

      // Merge with defaultCategories (also normalize them)
      const normalizedDefaults = defaultCategories.map(c => c.toLowerCase());

      const merged = [...new Set([...normalizedDefaults, ...usedCategories])];

// Capitalize for display (optional formatting step)
      const formattedCategories = merged.map(cat =>
      cat
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    );

      setAllCategories(formattedCategories);

      } catch (err) {
        console.error("Error loading video categories", err);
        setAllCategories(defaultCategories); // fallback
      }
    };

    fetchVideosAndBuildCategories();
  }, []);

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
        {allCategories.map((category) => (
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
