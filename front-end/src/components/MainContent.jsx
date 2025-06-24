import Content from "./Content";
import Filter from "./filter";
import { useOutletContext } from "react-router-dom";
function MainContent(){
    const {sidebarOpen,searchTerm} = useOutletContext()
    return(
         <div className="app-layout">
        <main className="main-content">
          < Filter sidebarOpen={sidebarOpen} />
          <div className={`content ${sidebarOpen ? "expanded" : ""}`}>
            <Content searchTerm={searchTerm} varient=""/>
          </div>
        </main>
      </div>
    )

}
export default MainContent