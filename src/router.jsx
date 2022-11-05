import { createBrowserRouter, Outlet } from "react-router-dom";
import BoardHeader from "./components/BoardHeader";
import BoardProtected from "./components/BoardProtected";
import Layout from "./components/Layout";
import PageLogOutRequired from "./components/PageLogoutRequired";
import PageProtected from "./components/PageProtected";
import Board from "./pages/Board";
import Groups from "./pages/Groups";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MatchDetail from "./pages/MatchDetail";
import Matches from "./pages/Matches";
import Positions from "./pages/Positions";
import Signup from "./pages/Signup";

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
        path: "/groups",
        element: (
          <PageProtected pageOpts={{ headerText: "Grupos" }}>
            <Groups />
          </PageProtected>
        ),
      },
      {
        path: "/board/:boardId",
        element: (
          <PageProtected pageOpts={{ headerText: "Tabla Predicciones" }}>
            <BoardProtected>
              <Board />
            </BoardProtected>
          </PageProtected>
        ),
      },
      {
        path: "/board/:boardId/positions",
        element: (
          <PageProtected pageOpts={{ headerText: "Posiciones" }}>
            <BoardProtected>
              <Positions />
            </BoardProtected>
          </PageProtected>
        ),
      },
      {
        path: "/board/:boardId/match/:matchId",
        element: (
          <PageProtected pageOpts={{ headerText: "Partido" }}>
            <BoardProtected>
              <MatchDetail />
            </BoardProtected>
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
  {
    path: "/signup",
    element: (
      <PageLogOutRequired>
        <Signup />
      </PageLogOutRequired>
    ),
  },
]);

export default router;
