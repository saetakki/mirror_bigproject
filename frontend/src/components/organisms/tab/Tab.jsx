import styled from '@emotion/styled';
import { useNavigate, useLocation } from 'react-router-dom';


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
  }
]


export const Tab = () => {

  const navigate = useNavigate();
  const onClickHandler = (e) => {
    const whereTo = e.target.id;
    navigate(whereTo);
  };
  

  const location = useLocation().pathname;


  return(
    <div className='flex grow shrink basis-0 w-[80%] justify-between items-center'>
      {tabList.map((tab, index) => (
        <div 
        key={index}
        id={tab.path} 
        className={`font-regular ${location === tab.path ? 'font-bold text-blue-500' : 'text-[#292929]'}`}
        onClick={onClickHandler}>{tab.name}</div>
      ))}
      <PracticeBtn
      onClick={onClickHandler}>연습하기</PracticeBtn>
    </div>
  )
}

const PracticeBtn = styled.button`
    maring-top: 10px;
    width: 20%;
    height: 40px;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
  &:hover {
    background-color: #2EE59D;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
`




export default Tab;