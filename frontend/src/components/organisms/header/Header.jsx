import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mobile, Desktop} from "@hooks"
import { RxHamburgerMenu } from "react-icons/rx";
import logo from '../../../assets/logo.png'
import { useMediaQuery } from "react-responsive";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({query: "(max-width: 767px)"});

  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);


  const navigate = useNavigate();
  const onClickHandler = (e) => {
    const whereTo = e.target.className
    navigate(whereTo);
  };

  const onTouchHandler = () => {
    setIsMenuOpen(!isMenuOpen);
    if(isMenuOpen){
      setIsMenuOpen(false)
    }
  }


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
              <li className={'/bookmark'} onClick={onClickHandler}>북마크</li>
              <li className={'/profile'} onClick={onClickHandler}>Profile</li>
            </ul>
          </Desktop>
          <Mobile>
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
                      <li className={'/bookmark'} onClick={onClickHandler}>북마크</li>
                      <li className={'/profile'} onClick={onClickHandler}>Profile</li>
                    </ul>
                  </MobileDropdownMenu>
                )}
              </MobileIconWrapper>
          </Mobile>
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
  padding: 0 1.5rem;


  img  {
    width: 36px;
    height: 28px;
    margin: 10px 0;
  }

  .home-btn {
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
  height: 60px;


  display: ${Mobile ? 'flex' : 'none'};
  justify-content: flex-end;


  ul {
    width: 40vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
  }
`

const MobileIconWrapper = styled.div`
  position: relative;
  display:flex;
  justify-context: center;
  align-items: center;
`;

const MobileDropdownMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  width: 150px;
  height: 150px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  ul {
    position: absolute;
    width: 150px;
    height: 150px;
    right: 10px;
    widht: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: space-evenly;

    li {
      padding: 10px 0;
      cursor: pointer;

      &:hover {
        background-color: #f2f2f2;
      }
    }
  }
`;

export default Header;