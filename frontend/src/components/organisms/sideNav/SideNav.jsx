import styled from "@emotion/styled";
import defaultImg from "@assets/defaultImg.png"
import { useNavigate, useLocation } from "react-router-dom";
import { BiHomeAlt2, BiFolder, BiBookmark} from "react-icons/bi";


const SideNav = () => {

  const tabList = [
    {
      name: 'HOME',
      path: '/'
    },
    {
      name: 'HISTORY',
      path: '/history'
    },
    {
      name: 'BOOKMARK',
      path: '/bookmark'
    },
    {
      name: 'PROFILE',
      path: '/profile'
    },
    {
      name: 'TTS',
      path: '/tts'
    },
  ]
  
  const location = useLocation().pathname.replace("/", "").toUpperCase();
  const isHome = location === '' ? true : false;
  const isLocate = tabList.map((tab) => tab.name === location ? tab.name : null)
  const navigate = useNavigate()

  const onClickHandler = (e) => {
    e.preventDefault();
    const btnId = e.currentTarget.id;
    const tab = tabList.find((tab) => tab.path === btnId);
    if (tab && tab.path !== location) {
      navigate(tab.path);
    }
  }


  return(
    <SideNavContainer>
      <div className="w-full h-48 my-auto flex flex-col justify-between items-center">
        <Btn
        id={tabList[0].path} 
        className={`home w-full font-regular ${isHome ? 'font-bold text-blue-500' : 'text-[#292929]'}`}
        onClick={onClickHandler}
        >
          <div className={ `${isHome ? 'absolute left-4 h-10 w-1 bg-blue-500' : "hidden"}`} />
          <BiHomeAlt2 size={30} /> 
          {/* <Txt>HOME</Txt> */}
        </Btn>
        <Btn 
        id={tabList[1].path}
        className={`history ${isLocate.includes("HISTORY") ? 'font-bold text-blue-500' : 'text-[#292929]'}`}
        onClick={onClickHandler}
        >
          <div className={ `${isLocate.includes("HISTORY") ? 'absolute left-4 h-10 w-1 bg-blue-500' : "hidden"}`} />
          <BiFolder size={30} />
          {/* <Txt>HISTORY</Txt> */}
        </Btn>
        <Btn 
        id={tabList[2].path}
        className={`bookmark w-full ${isLocate.includes("BOOKMARK") ? 'font-bold text-blue-500' : 'text-[#292929]'}`}
        onClick={onClickHandler}
        >
          <div className={ `${isLocate.includes("BOOKMARK") ? 'absolute left-4 h-10 w-1 bg-blue-500' : "hidden"}`} />
          <BiBookmark size={30} />
          {/* <Txt className="text-sm">BOOKMARK</Txt> */}
        </Btn>
      </div>
      <div id={tabList[3].path} className=' h-30 flex items-center my-auto mx-auto' onClick={onClickHandler}>
        <img className="h-12 w-12" src={defaultImg} alt="defaultImg" />
      </div>
    </SideNavContainer>
  )
}

export default SideNav;

const SideNavContainer = styled.div`
  width: 5em;
  height: calc(100vh - 112px);
  margin-left: 1rem;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-bottom:80px;
`

const Btn = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

`

const Txt = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`
