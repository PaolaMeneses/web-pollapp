import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "./App";
import Matches from "./pages/Matches";
import Positions from "./pages/Positions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <div>Page not found</div>,
    children: [
      {
        path: "/",
        element: <App />,
        children: [],
      },
      {
        path: "/matches",
        element: <Matches />,
        children: [],
      },
      {
        path: "/positions",
        element: <Positions />,
        children: [],
      },
    ],
  },
]);

export default router;
