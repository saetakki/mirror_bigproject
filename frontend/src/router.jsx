import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@templates";
import { LogIn, Home, History, BookMark, Profile } from "@pages/client";

const routerList = [
  {
    id:0,
    path:'/login',
    element: <LogIn/>,
    widhAuth: false,
  },
  {
    id:1,
    path:'/',
    element: <Home/>,
    withAuth: true
  },
  {
    id: 2,
    path: '/history',
    element: <History/>,
    withAuth: true
  },
  {
    id:3,
    path:'/bookmark',
    element: <BookMark/>,
    withAuth: true
  },
  {
    id:4,
    path:'/profile',
    element: <Profile/>,
    withAuth: true
  }
]

const Auth = localStorage.getItem('Auth');

export const router = createBrowserRouter(
  routerList.map((route) => {
    if(Auth){
      return {
        path:route.path,
        element: <Layout>{route.element}</Layout>,
      }
    } else {
      return {
        path:route.path,
        element: <LogIn />
      }
    }
  }
))

export default router;