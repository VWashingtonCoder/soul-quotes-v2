import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { FavoritesProvider } from "./backend/providers/FavoritesProvider.tsx";
import { QuotesProvider } from "./backend/providers/QuotesProvider.tsx";
import { UsersProvider } from "./backend/providers/UsersProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UsersProvider>
      <QuotesProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </QuotesProvider>
    </UsersProvider>
  </React.StrictMode>
);
