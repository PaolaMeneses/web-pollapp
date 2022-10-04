import { createBrowserRouter, Outlet } from "react-router-dom";
import { useCurrentUserMutation } from "./api/auth";
import Layout from "./components/Layout";
import PageLogOutRequired from "./components/PageLogoutRequired";
import PageProtected from "./components/PageProtected";
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
          <PageProtected pageOpts={{ headerText: "Inicio" }}>
            <Home />
          </PageProtected>
        ),
      },
      {
        path: "/matches",
        element: (
          <PageProtected pageOpts={{ headerText: "Partidos" }}>
            <Matches />
          </PageProtected>
        ),
      },
      {
        path: "/positions",
        element: (
          <PageProtected pageOpts={{ headerText: "Posiciones" }}>
            <Positions />
          </PageProtected>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PageLogOutRequired>
        <Login />
      </PageLogOutRequired>
    ),
  },
]);

export default router;
