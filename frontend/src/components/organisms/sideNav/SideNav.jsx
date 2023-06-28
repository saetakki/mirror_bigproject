import styled from "@emotion/styled";
import { BiHomeAlt2, BiFolder, BiBookmark} from "react-icons/bi";


styled

const SideNav = () => {
  return(
    <SideNavContainer>
      <div className="my-auto mx-auto flex flex-col justify-between">
        <BiHomeAlt2 size={30} />
        <BiFolder size={30} />
        <BiBookmark size={30} />
      </div>
    </SideNavContainer>
  )
}

export default SideNav;

const SideNavContainer = styled.div`
  width: 166px;
  height: calc(100vh - 112px);
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  margin-bottom:80px;
`