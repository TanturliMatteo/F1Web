import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Only the reset: every component and utility style lives in index.css
import "bootstrap/dist/css/bootstrap-reboot.min.css";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
