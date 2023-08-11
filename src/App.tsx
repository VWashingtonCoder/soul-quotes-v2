import { useState } from "react";
import "./App.css";
import Navbar from "./frontend/components/Navbar";
import HomePage from "./frontend/pages/HomePage/HomePage";
import AccountsPage from "./frontend/pages/AccountsPage/AccountsPage";
import FavoritesPage from "./frontend/pages/FavoritesPage/FavoritesPage";

function App() {
  const [pageView, setPageView] = useState("accounts");

  return (
    <>
      <Navbar page={pageView} changePage={setPageView} />

      {pageView === "home" && <HomePage />}
      {pageView === "accounts" && <AccountsPage changePage={setPageView} />}
      {pageView === "favorites" && <FavoritesPage />}
    </>
  );
}

export default App;
