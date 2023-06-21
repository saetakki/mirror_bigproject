import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@templates";
import { Home, History, BookMark, Profile } from "@pages/client";

const routerList = [
  {
    id:0,
    path:'/',
    element: <Home/>,
  },
  {
    id: 1,
    path: '/history',
    element: <History/>,
  },
  {
    id:2,
    path:'/bookmark',
    element: <BookMark/>
  },
  {
    id:3,
    path:'/profile',
    element: <Profile/>
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