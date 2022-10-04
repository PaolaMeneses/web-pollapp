import { createBrowserRouter, Outlet } from "react-router-dom";
import Layout from "./components/Layout";
import RouteAuth from "./components/RouteAuth";
import Home from "./pages/Home";
import Login from "./pages/Login";
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
        element: (
          <RouteAuth pageOpts={{ headerText: "Inicio" }}>
            <Home />
          </RouteAuth>
        ),
        children: [],
      },
      {
        path: "/matches",
        element: (
          <RouteAuth pageOpts={{ headerText: "Partidos" }}>
            <Matches />
          </RouteAuth>
        ),
        children: [],
      },
      {
        path: "/positions",
        element: (
          <RouteAuth pageOpts={{ headerText: "Posiciones" }}>
            <Positions />
          </RouteAuth>
        ),
        children: [],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
