import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

import "./locales/i18n.js";

import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
