import { Layout } from "@templates"

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
