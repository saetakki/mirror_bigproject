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
    name: 'TEST',
    path: '/test'
  },
  {
    name: 'TTS',
    path: '/tts'
  },
  {
    name: 'PROFILE',
    path: '/profile'
  },
]

export const Tab = () => {

  const navigate = useNavigate();
  const onClickHandler = (e) => {
    const whereTo = e.target.id;
    navigate(whereTo);
  };
  

  const location = useLocation().pathname;


  return(
    <div className='flex w-[80%] justify-between items-center'>
      {tabList.map((tab, index) => (
        <div 
        key={index}
        id={tab.path} 
        className={`font-regular ${location === tab.path ? 'font-bold text-blue-500' : 'text-[#292929]'}`}
        onClick={onClickHandler}>{tab.name}</div>
      ))}
    </div>
  )
}





export default Tab;