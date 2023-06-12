import { useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()
  const onClickHandler = (e) => {
    const whereTo = e.target.textContent
    const path = whereTo === "Home" ? "/" : `/${whereTo.toLowerCase()}`
    navigate(`${path}`)
  }


  return (
    <div>
      <ul>
        <li onClick={onClickHandler}>Home</li>
        <li onClick={onClickHandler}>Test</li>
      </ul>
    </div>
  )
}

export default Header