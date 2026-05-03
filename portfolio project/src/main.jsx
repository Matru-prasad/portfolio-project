import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/globals.css";
import { PortfolioProvider } from "./context/PortfolioContext";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <PortfolioProvider>
        <App />
      </PortfolioProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found. Make sure <div id=\"root\"></div> exists in index.html.");
}