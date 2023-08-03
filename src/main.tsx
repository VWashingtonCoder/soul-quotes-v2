import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QuotesProvider } from "../backend/providers/QuotesProvider.tsx";
import { UsersProvider } from "../backend/providers/UsersProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QuotesProvider>
      <UsersProvider>
        <App />
      </UsersProvider>
    </QuotesProvider>
  </React.StrictMode>
);
