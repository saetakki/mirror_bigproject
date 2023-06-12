import { useNavigate } from "react-router-dom";
import { StyledHeader } from "./Header.styled";

const Header = () => {
  const navigate = useNavigate();
  const onClickHandler = (e) => {
    const whereTo = e.target.className
    console.log(whereTo)
    navigate(whereTo);
  };

  return (
    <StyledHeader>
      <div>
        <button onClick={()=>navigate('/')}className="home-btn">
          KT
        </button>
      </div>
      <div>
        <ul>
          <li className={'/'}onClick={onClickHandler}>Home</li>
          <li className={'/test'} onClick={onClickHandler}>Test</li>
          <li className={'/mypage'} onClick={onClickHandler}>My page</li>
        </ul>
      </div>
    </StyledHeader>
  );
};

export default Header;