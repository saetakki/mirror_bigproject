import styled from '@emotion/styled'
import './Home.css'
import testImage from '../../assets/test.jpeg'
import { IndexRow } from "@organisms";
import { CiStar } from 'react-icons/ci'

const Home = () => {
  return(
    <div className='home-container'>
        <HomeWrapper>
          <GNB>
            <Left>
              <ImgContainer>
                <ProfileImg src={testImage} alt="profile image"/>
              </ImgContainer>
              <TextContainer>
                안녕하세요<br/>
                <span>username님</span>
              </TextContainer>
            </Left>
            <Right>
              오늘도 연습을 시작해볼까요?
              <PracticeBtn>연습 시작</PracticeBtn>
            </Right>
          </GNB>
          <UserChatListContainer>
            username 님의 연습 기록
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
                    <ItemContainer>
                      <Column width="120px" height="42px">CHAT ID</Column>
                      <BookMarked width="24px" height="24px">
                        <CiStar/>
                      </BookMarked>
                      <Column width="240px" height="42px">DATE</Column>
                      <Column flex="1" height="42px">PERSONA</Column>
                    </ItemContainer>
                </ItemListContainer>
            </BoardContainer>

            {/* 전체 북마크 기록 중 최근 5개 */}
            <BoardContainer>
              username 님의 북마크 기록
              <Quotes>
                <p>1만가지 방법이 효과가 없어도 실패한 게 아니다.<br/>
                이런 시도는 모두 전진을 위한 전 단계일 뿐이다.
                <br/><br/>-토머스 에디슨</p>
              </Quotes>
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
    </div>
  )
}

const HomeWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const GNB = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`


const TextContainer = styled.div`
width: 200px;
height: 300px;
display: flex;
flex-direction: column;
justify-content: center;
font-size: 16px;

span{
  font-size: 24px;
  font-weight: bold;
}
`


const ProfileImg = styled.img`
width: 180px;
height: 180px;
border-radius: 5px;
background-color: #000;
object-fit: cover;
object-position: center;
`

const ImgContainer = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  width: 220px;
  height: 300px;
`
const Left = styled.div`
  display: flex;
`

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 40px;
  `

const PracticeBtn = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 5px;
`

const UserChatListContainer = styled.section`
  width: 100%;
  hegith: 100vh;
`

const Quotes = styled.div`
  font-size: 12px;
  color: #9a9a9a;
`

const BoardContainer = styled.div`
  width: 90%;
  height: 520px;
  margin: 0 auto;
`

const BoardHead = styled.div`
  width: 100%;
  height:28px;
  display: flex;
  flex-direction: row;
  `

const Column = styled.div`
  display: flex;
  height: ${props => props.height};
  width: ${props => props.width};
  flex: ${props => props.flex};
  background-color : ${props => props.color};
  justify-content: center;
  align-items: center;
  font-size: 12px;
  border: 1px solid #d9d9d9;
`;


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
  background-color: #fff;
  border-radius: 5px;
  
  & > :first-child {
    border-right: 2px solid #d9d9d9; 
    border-radius: 5px 0 0 5px;
  }
`

const BookMarked = styled.div`
  position:absolute;
  height: ${props => props.height};
  width: ${props => props.width};
  flex: ${props => props.flex};
  top: 8px;
  left: 8px;

  display:flex;
  justify-content: center;
  align-items: center;
`

export default Home