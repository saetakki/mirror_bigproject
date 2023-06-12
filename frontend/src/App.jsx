import { Layout } from "@templates"
import {
  Home,
  Test
} from '@pages/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"



function App() {
  const router = createBrowserRouter([
    {
      path : '/',
      element: <Home/>,
    },
    {
      path : '/test',
      element: <Test/>,
    }
  ])


  return (
    <Layout>
      <RouterProvider router={router}/>
    </Layout>
  )
}

export default App
