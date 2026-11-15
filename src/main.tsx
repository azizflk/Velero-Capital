import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { PORTAL_ON, isAdminHost } from "./lib/portal";
import "./index.css";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Each page is prerendered to static HTML at build time and marked with the path it was rendered for.
// Hydrate when that is the page being opened; otherwise (the walkthrough, a query string that changes
// the first render, the 404 page served for an unknown address) render on the client.
const slash = (p: string) => (p.endsWith("/") ? p : `${p}/`);
// The admin address serves the panel whatever page the server happened to send.
if (root.dataset.path === slash(location.pathname) && !location.search && !(PORTAL_ON && isAdminHost())) hydrateRoot(root, app);
else createRoot(root).render(app);
