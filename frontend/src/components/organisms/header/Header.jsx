import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import logo from '../../../assets/logo.png'

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
        <button onClick={()=>navigate('/')} className="home-btn">
          <img src={logo} alt='logo' />
        </button>
      </div>
      <div>
        <ul>
          <li className={'/'}onClick={onClickHandler}>Home</li>
          <li className={'/history'} onClick={onClickHandler}>연습 기록</li>
          <li className={'/mypage'} onClick={onClickHandler}>My page</li>
        </ul>
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  width: 80vw;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;


  ul {
    display: flex;
    width: 60vw;
    align-items: right;
    justify-content: space-between;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  img  {
    width: 20px;
    height: 20px;
  }

  .home-btn {
    width: 100px;
    height: 40px;
    background-color: transparent;
    border: none;
  }
`


export default Header;