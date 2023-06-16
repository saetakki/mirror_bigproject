import styled from '@emotion/styled'
import './Home.css'
import testImage from '../../assets/test.jpeg'
import { CiStar } from 'react-icons/ci'

const Home = () => {
  return(
    <div className='home-container'>
        <HomeWrapper>
            <UserInfo>
              <Left className="Left">
                <ProfileImg src={testImage} alt ="profile-image"/>
                <Greeting>
                  안녕하세요<br/>
                  <span>username 님</span>
                </Greeting>
              </Left>
              <Right>
                <PracticeButtonContainer>
                  오늘도 연습을 시작해볼까요?
                  <PracticeButton>
                    연습 시작하기
                  </PracticeButton>
                </PracticeButtonContainer>            
              </Right>
            </UserInfo>

          <UserChatListContainer>
            username 님의 연습 기록
            <Quotes>
              <p>1만가지 방법이 효과가 없어도 실패한 게 아니다.<br/>
              이런 시도는 모두 전진을 위한 전 단계일 뿐이다.
              <br/><br/>-토머스 에디슨</p>
            </Quotes>
            <BoardContainer>
                <BoardHead>
                  <Column width="120px" height="28px">CHAT ID</Column>
                  <Column width="240px" height="28px">DATE</Column>
                  <Column flex="1" height="28px">PERSONA</Column>
                </BoardHead>
                <GridLine/>
                <ItemListContainer>
                    <ItemContainer>
                      <Column width="120px" height="42px">CHAT ID</Column>
                      <Column width="240px" height="42px">DATE</Column>
                      <Column flex="1" height="42px">PERSONA</Column>
                    </ItemContainer>
                    <ItemContainer>
                      <Column width="120px" height="42px">CHAT ID</Column>
                      <Column width="240px" height="42px">DATE</Column>
                      <Column flex="1" height="42px">PERSONA</Column>
                    </ItemContainer>
                    <ItemContainer>
                      <Column width="120px" height="42px">CHAT ID</Column>
                      <Column width="240px" height="42px">DATE</Column>
                      <Column flex="1" height="42px">PERSONA</Column>
                    </ItemContainer>
                    <ItemContainer>
                      <Column width="120px" height="42px">CHAT ID</Column>
                      <Column width="240px" height="42px">DATE</Column>
                      <Column flex="1" height="42px">PERSONA</Column>
                    </ItemContainer>
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

const UserInfo = styled.section`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: row;
`


const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #000;
  margin-right: 10px;
  margin-bottom: 10px;
  object-fit: cover;
  object-position: center;
  `
  const Greeting = styled.div`
    width: 300px;
    font-weight: regular;
    font-size: 1.5rem;
    line-height: 125%;
    text-align: left;
    letter-spacing: -0.03em;
    color: #000;
    margin: 1rem 0 0;
  
    & span {
      font-weight: bold;
    }
  `


  const Left = styled.div` {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  `

  const Right = styled.div`{
    width: 50%;
  }`


const PracticeButtonContainer = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const PracticeButton = styled.button`
  width: 140px;
  height: 36px;
  background-color: #000;
  color: #fff;
  border-radius: 5px;
`

const UserChatListContainer = styled.section`
  width: 100%;
  height: 520px;
  background-color: tan
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
`;


const GridLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
  margin-bottom: 24px;
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