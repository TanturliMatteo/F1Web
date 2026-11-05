import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Only the reset: every component and utility style lives in index.css
import "bootstrap/dist/css/bootstrap-reboot.min.css";
// Fonts are bundled and served from our own domain: no request to Google,
// so visitors' IP addresses are never sent to a third party for typography
import "@fontsource/audiowide";
import "@fontsource/bungee-outline";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
