import { router } from "../src/router/router"
import { RouterProvider } from "react-router-dom"
import { RecoilRoot } from "recoil"
import { isAuthAtom } from "./atoms"
import '../src/styles/reset.css'



function App() {
  console.log(isAuthAtom)


  return (
    <RecoilRoot>
      <RouterProvider router={router}/>
    </RecoilRoot>
  )
}

export default App
