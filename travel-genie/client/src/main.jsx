import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import { ThemeProvider } from "./context/ThemeContext.jsx";
import { LocalizationProvider } from "./context/LocalizationContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { TripProvider } from "./context/TripContext.jsx";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LocalizationProvider>
        <ThemeProvider>
          <AuthProvider>
            <TripProvider>
              <App />
            </TripProvider>
          </AuthProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </BrowserRouter>
  </StrictMode>,
);
