import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mobile, Desktop} from "@hooks"
import { RxHamburgerMenu } from "react-icons/rx";
import logo from '../../../assets/logo.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const onClickHandler = (e) => {
    const whereTo = e.target.className
    navigate(whereTo);
  };

  const onTouchHandler = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log(isMenuOpen)
  }


  console.log(isMenuOpen)


  return (
    <StyledHeader className="navigation">
      <div>
        <button onClick={()=>navigate('/')} className="home-btn">
          <img src={logo} alt='logo' />
        </button>
      </div>
      <div>
          <BtnContainer className="BtnContainer">
          <Desktop>
            <ul>
              <li className={'/'}onClick={onClickHandler}>Home</li>
              <li className={'/history'} onClick={onClickHandler}>연습 기록</li>
              <li className={'/mypage'} onClick={onClickHandler}>My page</li>
            </ul>
          </Desktop>
          {Mobile && (
            <MobileIconWrapper>
              <RxHamburgerMenu
                size={30}
                onClick={onTouchHandler}
                isOpen={isMenuOpen}
              />
              {isMenuOpen && (
                <MobileDropdownMenu>
                  <ul>
                    <li className={'/'}onClick={onClickHandler}>Home</li>
                    <li className={'/history'} onClick={onClickHandler}>연습 기록</li>
                    <li className={'/mypage'} onClick={onClickHandler}>My page</li>
                  </ul>
                </MobileDropdownMenu>
              )}
            </MobileIconWrapper>
          )}
        </BtnContainer>
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;


  img  {
    width: 36px;
    height: 28px;
    margin: 10px 0;
  }

  .home-btn {
    margin-left: 2rem;
    width: 100px;
    height: 60px;
    background-color: transparent;
    border: none;
    display: flex;
    justify-content: left;
    align-items: center;
  }
`


const BtnContainer = styled.div`
  width: 60vw;
  margin-right: 2rem;

  display: ${Mobile ? 'flex' : 'none'};
  justify-content: flex-end;


  ul {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
  }
`

const MobileIconWrapper = styled.div`
  position: relative;
`;

const MobileDropdownMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  width: 180px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      padding: 10px;
      cursor: pointer;

      &:hover {
        background-color: #f2f2f2;
      }
    }
  }
`;

export default Header;