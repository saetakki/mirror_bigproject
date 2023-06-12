import { useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()
  const pathList = ['/', '/test']
  const onClickHandler = (e) => {
    const whereTo = e.target.textContent
    navigate(`${whereTo}`)
  }


  return (
    <div>
      <ul>
        {pathList.map((path) => {
          return <li key={path} onClick={onClickHandler}>{path}</li>
        })}
      </ul>
    </div>
  )
}

export default Header