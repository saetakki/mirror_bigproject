import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@templates";
import { Home, Test } from "@pages/client";

const routerList = [
  {
    id:0,
    path:'/',
    element: <Home/>,
  },
  {
    id: 1,
    path: '/test',
    element: <Test/>,
  }
]

export const router = createBrowserRouter(
  routerList.map((route) => {
    return {
      path:route.path,
      element: <Layout>{route.element}</Layout>,
    }
  })
)