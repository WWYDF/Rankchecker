import './core/logger'; // Initialize console interceptors before anything else

document.addEventListener('contextmenu', e => e.preventDefault());
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import App from "./App";
import { GetStartedPage } from "./pages/GetStarted";
import { MonitorPage } from "./pages/Monitor";
import { LoadingPage } from "./pages/Loading";
import { MatchPage } from "./pages/Match";
import { CreditsPage } from "./pages/Credits";
import "./index.css";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true,          element: <GetStartedPage /> },
      { path: "monitor",      element: <MonitorPage /> },
      { path: "loading",      element: <LoadingPage /> },
      { path: "match",        element: <MatchPage /> },
      { path: "credits",      element: <CreditsPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
