import { useState } from "react";
import "./App.css";
import Navbar from "./front-end/components/Navbar";
import Home from "./front-end/pages/Home/Home";

function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      <header className="app-header">
        <Navbar page={page} changePage={setPage} />
      </header>

      {page === "home" && <Home />}
    </>
  );
}

export default App;
