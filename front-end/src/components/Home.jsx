import Content from "./Content";
import Head from "./Head";
import Sidebar from "./Sidebar";
import { useState, useRef, useEffect } from "react";

function Home() {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const scrollRef = useRef(null);
  const leftBtnRef = useRef(null);
  const rightBtnRef = useRef(null);

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
      rightBtnRef.current.style.display =
        scrollLeft >= Math.ceil(maxScrollLeft - threshold) ? "none" : "block";
    }
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    scrollContainer.addEventListener("scroll", updateButtons);
    updateButtons();

    return () => {
      scrollContainer.removeEventListener("scroll", updateButtons);
    };
  }, [sidebarOpen]);

  function side() {
    setSideBarOpen(!sidebarOpen);
  }
  const sidePlay1 = true

  return (
    <>
      <div className="container1">
        <Head side={side} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className="app-layout">
        <aside className={`asidebar ${sidebarOpen ? "expanded" : ""}`}>
          <Sidebar sidebarOpen={sidebarOpen} s = {sidePlay1}/>
        </aside>

        <main className="main-content">
          <div className={`filterButton ${sidebarOpen ? "expanded" : ""}`}>
            <button ref={leftBtnRef} className="scroll-btn left" onClick={scrollLeft}>
              {"<"}
            </button>

            <div className="scroll-container" ref={scrollRef}>
              <button>All</button>
              <button>Music</button>
              <button>Telugu cinema</button>
              <button>Tamil movies</button>
              <button>Recruitment</button>
              <button>Mixes</button>
              <button>T Series</button>
              <button>Data Structures</button>
              <button>JavaScript</button>
              <button>Java</button>
              <button>4k Resolution</button>
              <button>Villages</button>
              <button>Lakes</button>
              <button>Python</button>
              <button>Bollywood Music</button>
              <button>Theme music</button>
              <button>Dramedy</button>
              <button>Recently uploaded</button>
              <button>Watched</button>
              <button>New to you</button>
            </div>

            <button ref={rightBtnRef} className="scroll-btn right" onClick={scrollRight}>
              {">"}
            </button>
          </div>

          <div className={`content ${sidebarOpen ? "expanded" : ""}`}>
            <Content searchTerm={searchTerm} varient=""/>
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;
