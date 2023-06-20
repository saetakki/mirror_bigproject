import styled from '@emotion/styled'
import Profile from '@assets/profile.png'
import { useNavigate } from 'react-router-dom'
import { Desktop } from "@hooks"
import { IndexRow } from "@organisms";
import { Container } from "@styles"


const Home = () => {

  const navigate = useNavigate();

  return(
    <Container className="Base">
      <HomeWrapper>
          <GNB>
            <Left>
              <ImgContainer onClick={()=>navigate("/Profile")}>
                <ProfileImg src={Profile} alt="profile image"/>
              </ImgContainer>
              <TextContainer>
                안녕하세요<br/>
                <strong>username님</strong>
              </TextContainer>
            </Left>
            <Desktop>
              <Right>
                <span>오늘도 연습을 시작해볼까요?</span>
                  <PracticeBtn onClick={()=>navigate('/history')}> 연습 시작</PracticeBtn>
              </Right>
            </Desktop>
          </GNB>
          <UserChatListContainer>
            <strong>username 님의 연습 기록</strong>
            <Quotes>
              <p>1만가지 방법이 효과가 없어도 실패한 게 아니다.<br/>
              이런 시도는 모두 전진을 위한 전 단계일 뿐이다.
              <br/><br/>-토머스 에디슨</p>
            </Quotes>

            {/* 전체 메세지 기록 중 최근 5개 */}
            <BoardContainer>
                <BoardHead>
                  <IndexRow id="CHAT ID" date="DATE" persona="PERSONA"/>
                </BoardHead>
                <GridLine/>
                <ItemListContainer>
                {[false, false, true, false, true].map((booked, idx) => (
                    <ItemContainer key={idx}>
                      <IndexRow id="CHAT ID" date="DATE" persona="PERSONA" isBooked={booked} />
                    </ItemContainer>
                  ))}
                </ItemListContainer>
            </BoardContainer>
            
            {/* 전체 북마크 기록 중 최근 5개 */}
            <strong>username 님의 북마크 기록</strong>
            <Quotes>
              <p>1만가지 방법이 효과가 없어도 실패한 게 아니다.<br/>
              이런 시도는 모두 전진을 위한 전 단계일 뿐이다.
              <br/><br/>-토머스 에디슨</p>
            </Quotes>
            <BoardContainer>
                <BoardHead>
                  <IndexRow id="CHAT ID" date="DATE" persona="PERSONA"/>
                </BoardHead>
                <GridLine/>
                 {/* 전체 북마크 기록 중 최근 5개 */}
                <ItemListContainer>
                {[1, 2, 3, 4,5].map((_, idx) => (
                    <ItemContainer key={idx}>
                      <IndexRow id="CHAT ID" date="DATE" persona="PERSONA" isBooked={true} />
                    </ItemContainer>
                  ))}
                </ItemListContainer>
            </BoardContainer>
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

const PracticeBtn = styled.button`
  margin-top: 10px;
  width: 140px;
  height: 40px;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  background-color: #000000;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  onClick = {() => {console.log("hi")}}
  &:hover {
    background-color: #000000;
    color: #ffffff;
    transform: scale(1.1);
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
font-size: 14px;
display: flex;
flex-direction: column;
justify-content: center;
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
const BoardContainer = styled.div`
  width: 100%;
  height: 50%;
  margin: 0 auto 42px auto;
`


const Quotes = styled.div`
  font-size: 12px;
  color: #9a9a9a;
  margin-bottom: 24px;
`


const BoardHead = styled.div`
  width: 100%;
  height:28px;
  display: flex;
  flex-direction: row;
  `

const GridLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
  margin-top: 12px;
  margin-bottom: 12px;
  `

const ItemListContainer = styled.div`
  width: 100%;
  `

const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  position:relative;
  flex-direction: row;
  margin: 3px 0;

  border-radius: 5px;
  
  & > :first-of-type {
    border-right: 2px solid #d9d9d9; 
    border-radius: 5px 0 0 5px;
    background-color: #f5f5f5;
  }
`

export default Home