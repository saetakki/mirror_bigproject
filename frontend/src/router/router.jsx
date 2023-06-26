import { createBrowserRouter } from "react-router-dom";
import { LogIn, Home, History, BookMark, Profile, Log, Test } from "@pages/client";
import { PrivateRoute } from "./PrivateRoute";

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
  },
  {
    id:5,
    path:'/history/:id',
    element: <Log/>,
    withAuth: true
  },
  {
    id:6,
    path:'/test',
    element: <Test/>,
    withAuth: false
  },
]


export const router = createBrowserRouter(
  routerList.map((router) => {
    return {
      path: router.path,
      element: <PrivateRoute withAuth={router.withAuth}>{router.element}</PrivateRoute>,
    };
  })
);
