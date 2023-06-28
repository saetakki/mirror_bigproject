import styled from "@emotion/styled";
import logo from '@assets/logo.png'
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Tab } from "@organisms";
import { useMediaQuery } from "react-responsive";
import { Container } from "@styles"

const Header = () => {

  const breakPoint = useMediaQuery({ query: '(min-width: 834px)' })
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onClickDropDownHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeadNavigation>
      <LeftContainer>
        <img className="w-8 h-8" src={logo} alt={logo}/>
      </LeftContainer>
        <RightContainer>
      { breakPoint
        ? <Tab />
        : <RxHamburgerMenu size={30} onClick={onClickDropDownHandler} /> }
        </RightContainer>
    </HeadNavigation>
  )
}


const HeadNavigation = styled(Container)`
  height: 80px;
  background-color: #fff;
  display: flex;
  allign-items: center;
  ::-webkit-scrollbar {
    display: none;
  }
  margin-bottom: 1rem;
`

const LeftContainer = styled.div`
  display: flex;
  margin: auto 0;
  width: 40%;
  height: 2rem;
`

const RightContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end
`

export default Header;