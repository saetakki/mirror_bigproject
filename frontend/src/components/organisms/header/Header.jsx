import styled from "@emotion/styled";
import logo from '@assets/logo.png'
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Tab } from "@organisms";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Container } from "@styles";

const Header = () => {

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' })
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const onClickDropDownHandler = () => {
    console.log('click')
    setIsMenuOpen(!isMenuOpen);
  };

  const onClickHandler = (e) => {
    e.preventDefault()
    const location = e.target.textContent.toLowerCase()

    navigate(location === "home" ? "/" : `/${location}`)
    setIsMenuOpen(!isMenuOpen)
  }


  return (
    <HeadNavigation>
      <LeftContainer>
        <img className="w-10 h-8" src={logo} alt={logo}/>
      </LeftContainer>
      {!isMobile ? (
        <RightContainer>
          <Tab/>
        </RightContainer>
      ) : (
        <RightContainerMobile>
          <RxHamburgerMenu size={30} onClick={onClickDropDownHandler} />
          {isMenuOpen && (
            <DropdownMenu className={isMenuOpen ? 'open' : ''}>
              <ul className="py-4">
                <li className="px-4 py-2 border-b" onClick={onClickHandler}>HOME</li>
                <li className="px-4 py-2 border-b" onClick={onClickHandler}>HISTORY</li>
                <li className="px-4 py-2 border-b" onClick={onClickHandler}>BOOKMARK</li>
                <li className="px-4 py-2 border-b" onClick={onClickHandler}>PROFILE</li>
              </ul>
            </DropdownMenu>
          )}
        </RightContainerMobile>
      )}
    </HeadNavigation>
  )
}

const HeadNavigation = styled(Container)`
  height: 80px;
  background-color: #fff;
  display: flex;
  align-items: center;
  ::-webkit-scrollbar {
    display: none;
  }
  margin-bottom: 1rem;
  padding: 0 1rem;
`;

const LeftContainer = styled.div`
  display: flex;
  margin: auto 0;
  width: 30%;
  height: 2rem;
`;

const RightContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;

const RightContainerMobile = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

const DropdownMenu = styled.div`
  position: absolute;
  z-index: 10;
  left: 0;
  right: 0;
  top: calc(100% + 5rem);
  background-color: #fff;
  transform: translateY(-100%);
  transition: all 0.5s ease-in-out;
  height: 0;

  &.open {
    height: 100vh;
  }

  ul {
    padding: 1rem;
    border-top: 1px solid #ddd;
  }
`;

export default Header;
