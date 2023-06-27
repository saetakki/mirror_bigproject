import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

const tabList = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: '연습 기록',
    path: '/history'
  },
  {
    name: '북마크',
    path: '/bookmark'
  },
  {
    name: 'TEST',
    path: '/test'
  },
  {
    name: 'Profile',
    path: '/profile'
  },
]

export const Tab = () => {
  const navigate = useNavigate();
  const onClickHandler = (e) => {
    const whereTo = e.target.className
    navigate(whereTo);
  };
  return(
    <ul>
      {tabList.map((tab) => {
        return(
          <Fragment key={tab.path}>
            <li className={tab.path} onClick={onClickHandler}>{tab.name}</li>
          </Fragment>
        )
      })}
    </ul>
  )
}


export default Tab;