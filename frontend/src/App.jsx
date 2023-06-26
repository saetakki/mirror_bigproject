import { router } from "../src/router/router"
import { RouterProvider } from "react-router-dom"
import { RecoilRoot } from "recoil"
import '../src/styles/reset.css'



function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router}/>
    </RecoilRoot>
  )
}

export default App
