import styled from "@emotion/styled"

const History = () => {
  return (
    <Head>
      <strong>연습기록</strong>
      <Quotes>
        <span>username님의 연습기록을 모아봤어요.</span>
        <GridLine/>
      </Quotes>
    </Head>
  )
}

export default History

const Head = styled.div`
  strong {
    font-size: 24px;
  }
`

const Quotes = styled.div`
  font-size: 12px;
  color: #9a9a9a;
  margin-bottom: 24px;
`

const GridLine = styled.div`
  width: 300%;
  height: 1px;
  background-color: #d9d9d9;
  margin-top: 12px;
  margin-bottom: 12px;
`