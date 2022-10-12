import { createBrowserRouter, Outlet } from "react-router-dom";
import BoardProtected from "./components/BoardProtected";
import Layout from "./components/Layout";
import PageLogOutRequired from "./components/PageLogoutRequired";
import PageProtected from "./components/PageProtected";
import Board from "./pages/Board";
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
        path: "/board/:boardId",
        element: (
          <PageProtected pageOpts={{ headerText: "Board" }}>
            <BoardProtected>
              <Outlet />
            </BoardProtected>
          </PageProtected>
        ),
        children: [
          {
            path: "",
            element: <Board />,
          },
        ],
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
