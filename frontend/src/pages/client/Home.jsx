import styled from '@emotion/styled'
import Profile from '@assets/profile.png'
import { Desktop } from "@hooks"
import { useMediaQuery } from 'react-responsive'
import { IndexItem } from "@organisms";
import { Container } from "@styles"
import { initalBookmarkLoadAtom, 
  initialHistoryLoadAtom,
  userInfoAtom } from '../../atoms'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom';
import { requestFixProfile } from '@apis';



const Home = () => {

  const navigate = useNavigate()
  const isMobile = useMediaQuery({query: "(max-width: 767px)"}); 
  const initHistory = useRecoilValue(initialHistoryLoadAtom)
  const initBookmark = useRecoilValue(initalBookmarkLoadAtom)
  const uid = useRecoilValue(userInfoAtom).id


  const active = () =>{
    requestFixProfile()
    .then((res) => {
      console.log(res)
    })
    .catch((err) => console.log(err))
  }




  return(
    <Container>
      <HomeWrapper>
          <GNB>
            <button onClick={active}>프로필 변경</button>
            <Left>
            <Desktop>
                <ImgContainer onClick={()=>navigate('/profile')}>
                  <ProfileImg src={Profile} alt="profile image"/>
                </ImgContainer>
              </Desktop>
                <TextContainer>
                  안녕하세요<br/>
                  <strong>{uid}님</strong>
                </TextContainer>
            </Left>
              <Right>
                <span>오늘도 연습을 시작해볼까요?</span>
                  <PracticeBtn onClick={()=>navigate('/history')}> 연습 시작</PracticeBtn>
              </Right>
          </GNB>
          <UserChatListContainer>
            <BackgroundContainer>
              <strong>{uid} 님의 연습 기록</strong>
              {!isMobile 
              ? (
              <Quotes>
                <p>1만가지 방법이 효과가 없어도 실패한 게 아니다.<br/>
                이런 시도는 모두 전진을 위한 전 단계일 뿐이다.
                <br/><br/>-토머스 에디슨</p>
              </Quotes>)
              : null}
              {/* 전체 메세지 기록 중 최근 5개 */}
                  <ItemListContainer >
                  {initHistory.map((data) => (
                        <IndexItem
                        key={data.id} 
                        id={data.id} 
                        date={data.date} 
                        persona={Object.values(data.persona)} 
                        isBooked={data.bookmark} 
                        isMobile={isMobile} />
                    ))}
                  </ItemListContainer>
            </BackgroundContainer>           
            {/* 전체 북마크 기록 중 최근 5개 */}
            <BackgroundContainer>
            <strong>{uid} 님의 북마크 기록</strong>
            {!isMobile 
            ? (<Quotes>
              <p>1만가지 방법이 효과가 없어도 실패한 게 아니다.<br/>
              이런 시도는 모두 전진을 위한 전 단계일 뿐이다.
              <br/><br/>-토머스 에디슨</p>
            </Quotes>)
            : null}
                {/* 전체 북마크 기록 중 최근 5개 */}
                {initBookmark.slice(0,5).map((data) => (
                        <IndexItem 
                          key={data.id} 
                          id={data.id} 
                          date={data.date} 
                          persona={Object.values(data.persona)} 
                          isBooked={data.bookmark} 
                          isMobile={isMobile} />
                  ))}
            </BackgroundContainer>
          </UserChatListContainer>
      </HomeWrapper>
    </Container>
  )
}


const HomeWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const GNB = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Left = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const TextContainer = styled.div`
height: 200px;
width: 140px;
display: flex;
flex-direction: column;
justify-content: center;

strong{
  font-size: 1.5em;
}
`

const BackgroundContainer = styled.section`
  width: 100%;
  background-color: aqua;
  border-radius: 5px;
  padding: 1rem;
  margin: 24px 0;

  & strong {
    maring-bottom: 10px;
  }

`

const PracticeBtn = styled.button`
    maring-top: 10px;
    width: 80%;
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

const ProfileImg = styled.img`
width: 180px;
height: 180px;
border-radius: 5px;
object-fit: cover;
object-position: center;
background-color: aqua
`

const ImgContainer = styled.div`
display:flex;
align-items: center;
width: 220px;
height: 300px;
`

const Right = styled.div`
height: 80px;
font-size: 14px;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;

span{
  font-size: 14px;
  color: 9a9a9a
  margin-bottom: 20px;
}

`
const UserChatListContainer = styled.section`
  width: 100%;
  hegith: 100vh;
  strong {
    font-size: 24px;
    font-weight: bold;
    line-height: 150%;
  }
`



const Quotes = styled.div`
  font-size: 12px;
  color: #9a9a9a;
  margin-bottom: 24px;
`


const ItemListContainer = styled.div`
  margin-top: 21px;
  width: 100%;
  `


export default Home