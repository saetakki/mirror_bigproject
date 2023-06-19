import { router } from "./router"
import { RouterProvider } from "react-router-dom"
import '../src/styles/reset.css'



function App() {
  return (
      <RouterProvider router={router}/>
  )
}

export default App
