import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "./App";
import Layout from "./components/Layout";
import Matches from "./pages/Matches";
import Positions from "./pages/Positions";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    errorElement: <div>Page not found</div>,
    children: [
      {
        path: "/",
        element: <App />,
        children: [],
      },
      {
        path: "/matches",
        header: "aa",
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
