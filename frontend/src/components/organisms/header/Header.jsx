import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mobile, Desktop} from "@hooks"
import { RxHamburgerMenu } from "react-icons/rx";
import logo from '../../../assets/logo.png'
import { useMediaQuery } from "react-responsive";
import { Tab } from "@organisms/tab";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({query: "(max-width: 767px)"});
  const navigate = useNavigate();

  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  const onClickDropDownHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  };


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
            <Tab />
          </Desktop>
          <Mobile>
              <MobileIconWrapper>
                <RxHamburgerMenu
                  size={30}
                  onClick={onClickDropDownHandler}
                />
                {isMenuOpen && (
                  <MobileDropdownMenu>
                    <Tab/>
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
  position: relative;


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
  background-color: #fff;
  z-index: 10;
  top: 60px;
  right: 0;
  width: 100vw;
  right: -24px;
  height: 100vh;

  ul {
      top: 35px;
      position: absolute;
      width: 100%;
      height: 60%;
      margin: 0 auto;
      list-style-type: none;
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
      justify-content: space-evenly;
  }

  li {
  padding: 10px 0;
  font-size: 36px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }

`


// const MobileDropdownMenu = styled.div`
//   position: absolute;
//   z-index: 10;
//   top: 60px;
//   right: -12px;
//   width: 100vw;
//   height: 100vh;
//   background-color: #fff;
//   border-radius: 4px;
//   box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

//   ul {
//     position: absolute;
//     width: 100%;
//     height: 60%;
//     margin: 0 auto;
//     list-style-type: none;
//     display: flex;
//     flex-direction: column;
//     text-align: center;
//     align-items: center;
//     justify-content: space-evenly;

//     li {
//       padding: 10px 0;
//       cursor: pointer;
//       &:hover {
//         background-color: #f2f2f2;
//       }
//     }
//   }
// `;

export default Header;