import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import App from "./App";
import { UsernameInputPage } from "./pages/InputUsers";
import { MatchPage } from "./pages/Match";
import { CreditsPage } from "./pages/Credits";
import "./index.css";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <UsernameInputPage />,
      },
      {
        path: "match",
        element: <MatchPage />,
      },
      {
        path: "credits",
        element: <CreditsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
