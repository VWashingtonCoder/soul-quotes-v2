import { useState } from "react";
import "./App.css";
import Navbar from "./frontend/components/Navbar";

function App() {
  const [pageView, setPageView] = useState("home"); 
  
  console.log(pageView);

  return (
    <>
        <Navbar page={pageView} changePage={setPageView} />
    </>
  )
}

export default App
