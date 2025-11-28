import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./component/MainLayout";
import Home from "./pages/Home";
import Algorithm from "./pages/Algorithm";
import CompareAlgorithm from "./pages/CompareAlgorithm";
import Simulation from "./pages/Simulation";
import About from "./pages/About";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/simulator",
        element: <Simulation />,
      },
      {
        path: "/algorithm",
        element: <Algorithm />,
      },
      {
        path: "/compare",
        element: <CompareAlgorithm />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

export default routes;
