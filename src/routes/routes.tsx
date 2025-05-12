// src/routes/routes.tsx
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

// Lazy loaded pages
const Home = lazy(() => import("@/pages/Home"));
// const About = lazy(() => import("../pages/About"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  //   {
  //     path: "/about",
  //     element: <About />,
  //   },
];

export default routes;
