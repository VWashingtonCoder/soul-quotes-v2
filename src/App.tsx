import { useState } from "react";
import "./App.css";
import Navbar from "./frontend/components/Navbar";

function App() {
  const [pageView, setPageView] = useState("home"); 
  
  return (
    <>
      <header>
        <Navbar page={pageView} changePage={setPageView} />
      </header>
    </>
  )
}

export default App
