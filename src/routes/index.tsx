import Layout from "@/layout";
import MainPage from "@/pages/main";
import { createHashRouter, RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    id: "root",
    path: "/",
    element: <Layout />,
    children: [
      {
        id: "main-page",
        path: "/",
        element: <MainPage />,
      },
    ],
  },
];

export const router = createHashRouter(routes);
