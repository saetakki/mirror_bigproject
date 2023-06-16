import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@templates";
import { Home, MyPage, Test, Profile } from "@pages/client";

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
  },
  {
    id: 2,
    path: '/mypage',
    element: <MyPage/>,
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