import { useState } from "react";
import "./App.css";
import Navbar from "./frontend/components/Navbar";
import HomePage from "./frontend/pages/HomePage/HomePage";
import AccountsPage from "./frontend/pages/AccountsPage/AccountsPage";

function App() {
  const [pageView, setPageView] = useState("home");

  return (
    <>
      <Navbar page={pageView} changePage={setPageView} />

      {pageView === "home" && <HomePage />}
      {pageView === "accounts" && <AccountsPage />}
    </>
  );
}

export default App;
