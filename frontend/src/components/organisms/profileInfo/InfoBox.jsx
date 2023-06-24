import styled from '@emotion/styled'
const InfoBox = ( props ) => {
  const username = props.username
  const historyCnt = 39
  const bookMarkCnt = 12


  return (
    <InfoContainer className="info-box">
      <InfoWrapper>
        <h1>사용 내역</h1>
        <SummaryWrapper>
          <div>
            <p>{username}님은 {historyCnt}번의 연습을 하였습니다.</p>
            <p>{username}님은 그 중 {bookMarkCnt}개를 북마크 하였습니다.</p>
          </div>
          <Practice>
            <p>조금 더 연습해볼까요?</p>
            <button className='btn'>연습하러가기</button>
          </Practice>
        </SummaryWrapper>
      </InfoWrapper>
    </InfoContainer>
  )
}

const InfoContainer = styled.section`
  width: 80%;
  background-color: #fff;
  margin: 0 auto;
  margin-top: 20px;
  height: 15em;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
`
const InfoWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 3rem;
`
const SummaryWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Practice = styled.div`
  position: absolute;
  right: 2rem;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin: 0 0 15px; 0
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 1.2rem;
  }

  .btn{
    padding: 0 auto;
    width: 80%;
    height: 40px;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
  }
  .btn:hover {
    background-color: #2EE59D;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
  
`



export default InfoBox