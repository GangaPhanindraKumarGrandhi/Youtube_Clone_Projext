import { useEffect,useRef } from "react";

function Filter({ sidebarOpen, onCategorySelect, selectedCategory }) {
  const scrollRef = useRef(null);
  const leftBtnRef = useRef(null);
  const rightBtnRef = useRef(null);

  const categories = [
    "All", "Music", "Movie", "CSS",
    "Education", "React", "JavaScript", "Data Structures", "4k Resolution", "Villages",
    "Lakes", "Python", "Bollywood Music", "Theme music", "Dramedy",
    "Recently uploaded", "Watched", "New to you"
  ];

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

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    scrollContainer.addEventListener("scroll", updateButtons);
    updateButtons();

    return () => scrollContainer.removeEventListener("scroll", updateButtons);
  }, [sidebarOpen]);

  return (
    <div className={`filterButton ${sidebarOpen ? "expanded" : ""}`}>
      <button ref={leftBtnRef} className="scroll-btn left" onClick={scrollLeft}>{"<"}</button>

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

      <button ref={rightBtnRef} className="scroll-btn right" onClick={scrollRight}>{">"}</button>
    </div>
  );
}

export default Filter;
