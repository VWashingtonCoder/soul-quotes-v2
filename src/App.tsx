import { useState } from "react";
import { useUsers } from "./backend/context-hooks";
import "./App.css";
import Navbar from "./frontend/components/Navbar";
import HomePage from "./frontend/pages/HomePage/HomePage";
import AccountsPage from "./frontend/pages/AccountsPage/AccountsPage";
import LoginNotification from "./frontend/components/LoginNotification";
import FavoritesPage from "./frontend/pages/FavoritesPage/FavoritesPage";

function App() {
  const { isUserLoggedIn } = useUsers();
  const [pageView, setPageView] = useState("favorites");

  return (
    <>
      <Navbar page={pageView} changePage={setPageView} />

      {pageView === "home" && <HomePage />}
      {pageView === "accounts" && <AccountsPage changePage={setPageView} />}

      {!isUserLoggedIn &&
        (pageView === "favorites" || pageView === "create") && (
          <LoginNotification page={pageView} />
        )
      }

      {isUserLoggedIn && pageView === "favorites" && <FavoritesPage />}
    </>
  );
}

export default App;
