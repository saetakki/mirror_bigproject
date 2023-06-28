import styled from '@emotion/styled'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { IndexItem } from "@organisms";
import { Container } from "@styles"
import { initalBookmarkLoadAtom, 
  initialHistoryLoadAtom,
  userInfoAtom } from '../../atoms'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom';



const Home = () => {

  const [isPractice, setIsPractice] = useState(true)
  const navigate = useNavigate()
  const isMobile = useMediaQuery({query: "(max-width: 767px)"}); 
  const initHistory = useRecoilValue(initialHistoryLoadAtom)
  const initBookmark = useRecoilValue(initalBookmarkLoadAtom)
  const uid = useRecoilValue(userInfoAtom).id

  const onClickHandler = (e) => {
    navigate(`${e}`)
  }

  const spreadTarget = isPractice ? initHistory : initBookmark

  return(
    <HomeContainer>
      <HomeWrapper>
          <GNB>
            <Left>
              <TextContainer>
                안녕하세요<br/>
                <strong className='text-black'>{uid}님</strong>
              </TextContainer>
            </Left>
              <Right>
                <span className='w-[6em] mb-2 break-normal flex text-center'>오늘도 연습을 시작해볼까요?</span>
                <PracticeBtn className='w-[9em]' onClick={()=>navigate('/history')}> 연습 시작</PracticeBtn>
              </Right>
          </GNB>
          <MainContents isMobile={isMobile}>
              <SectionLeftContainer width={isMobile ? null : "30%"}>
                <SectionLeft isMobile={isMobile} height={"300px"} isFirst={true}>
                  <div className='h-full flex flex-col justify-between'>
                    <div className='flex flex-col justify-between after:only:items-start'>
                      <strong>SUMMARY</strong>
                      <small>{uid}님의 활동을 요약했어요.</small>
                    </div>
                    <div className='break-normal my-auto h-[120px] flex flex-col justify-between'>
                      <span>{uid}님은</span>
                      <span>총 <strong>NUM번</strong>의 연습을 진행했고</span>
                      <span>총 <strong>NUM개</strong>의 연습을 북마크했어요.</span><br/>
                    </div>
                    <div>
                    </div>
                  </div>
                </SectionLeft>
                <SectionLeft isMobile={isMobile} height={"300px"} isLast={true} >
                 <div className='h-full flex flex-col justify-between'>
                    <div className='flex flex-col justify-between after:only:items-start'>
                      <strong>COMMUNITY</strong>
                    </div>
                    <div className='break-normal my-auto mx-auto h-[120px] flex flex-col justify-between'>
                      <small className='flex justify-between items-center'>COMMING SOON</small>
                    </div>
                </div>
                </SectionLeft>
              </SectionLeftContainer>
            <SectionRightContainer isMobile={isMobile}>
              <SectionRight className='h-full flex flex-col items-start' isLast={true}>
                <strong>MOST RECENT</strong>
                <small>{uid}님의 최근 활동 내역을 가져왔어요.</small>
              <div className='h-12 flex flex-row w-full my-[20px] items-center justify-between'>
                <div className={ `${isPractice ? "text-blue-500 font-bold" : null} w-[50%] text-center flex flex-col items-center`} onClick={()=>setIsPractice(!isPractice)}>최근 5개 연습
                  <div className={ `${isPractice ? 'h-1 w-[80%] bg-blue-500' : "hidden"}`} />
                </div>
                <div className={ `${!isPractice ? "text-blue-500 font-bold" : null} w-[50%] text-center flex flex-col items-center`} onClick={()=>setIsPractice(!isPractice)}>최근 5개 북마크
                  <div className={ `${!isPractice ? 'h-1 w-[80%] bg-blue-500' : "hidden"}`} />
                </div>
              </div>
              {spreadTarget.map((item) => (
                <BtnLayer key={item.id} onClick={()=>onClickHandler(item.id)}>
                  <IndexItem
                    id={item.id} 
                    date={item.date} 
                    persona={Object.values(item.persona)} 
                    isBooked={item.bookmark}
                    isMobile={isMobile}
                    />
                </BtnLayer>
                ))}
              </SectionRight>
            </SectionRightContainer>
          </MainContents>
      </HomeWrapper>
    </HomeContainer>
  )
}


const HomeContainer = styled(Container)`
  height: auto;
  padding: 0;
`
const HomeWrapper = styled.div`
  margin: 0 1rem;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`
const GNB = styled.div`
  width: 100%;
  display: flex;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  background-color: #9FD6D2;
  opacity: 0.6;
  padding: 20px 40px;
  border-radius: 10px;
`
const Left = styled.div`
display: flex;
justify-content: center;
align-items: center;
`
const TextContainer = styled.div`
font-weight: bold;
color: #828282;
height: 200px;
width: 140px;
display: flex;
flex-direction: column;
justify-content: center;

strong{
  color: #000;
  font-size: 24px;
}
`

const PracticeBtn = styled.button`
    maring-top: 10px;
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

const Right = styled.div`
height: 70px;
font-size: 14px;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
margin-bottom: 10px;

span{
  font-size: 14px;
  color: 9a9a9a
  margin-bottom: 10px;
}

`

const MainContents = styled.div`
  height: 100%;
  display: flex;
  flex: 1;
  width: 100%;
  ${props => props.isMobile ? "flex-direction: column;" : "flex-direction: row;"}
  justify-content: space-between;
  align-items: flex-start;
`

const SectionLeftContainer = styled(Container)`
  width: ${props => props.width || "100%"};
  height: calc(100% - 1rem);
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`

const SectionLeft = styled(Container)`
  width:100%;
  ${props => props.height ? `height: ${props.height};` : null}
  padding: 20px 10px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  ${props => props.isLast ? "margin-bottom: 1rem;": null }
  flex-direction: column;
  margin-top: 1rem;
`


const SectionRightContainer = styled(Container)`
  width: ${props => props.isMobile ? null : "calc(70% - 1rem)"};
  background-color: #fff;
  padding: 20px 10px;
  margin: 1rem 0;
  border-radius: 10px;
  height: calc(100% - 1rem);
`

const SectionRight = styled(Container)`
  width:100%;
  height: 100%;
  padding: 20px 10px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  ${props => props.isLast ? null : "height: 300px;"}
  ${props => props.isLast ? "margin-bottom: 1rem;": null }
  flex-direction: column;
  flex: 1;
  margin-top: 1rem;
`


const BtnLayer = styled.div`
  width: 100%;
`

export default Home