import styled from "@emotion/styled"
import { Container } from "@styles"
import { IndexRow } from "@organisms"
import { useEffect, useState } from "react"
import { getHistoryPagination } from "@apis/HistoryApi"

const History = () => {
  
  const [pageNum, setPageNum] = useState(1)
  const [history, setHistory] = useState([])

  useEffect(()=> {
    getHistoryPagination(pageNum)
    .then((res)=> {
      setHistory(res)
    })},[pageNum])

  return (
    <Container>
      <Head>
        <strong>연습기록</strong>
        <Quotes>
          <span>username님의 연습기록을 모아봤어요.</span>
          <GridLine/>
        </Quotes>
      </Head>
        <BoardContainer>
          <BoardHead>
            <IndexRow id="CHAT ID" isHeader={true} date="DATE" persona="PERSONA"/>
          </BoardHead>
          <GridLine/>
          <ItemListContainer>
            {}
          {history.map((item) => (
              <ItemContainer key={item.id}>
                <IndexRow id={item.id} date={item.date} persona="PERSONA" isBooked={false} />
              </ItemContainer>
            ))}
          </ItemListContainer>
          <Page>
            <PageButton onClick={()=> setPageNum(pageNum-1)} disabled={pageNum===1}>이전</PageButton>
            <span>{pageNum} / inf</span>
            <PageButton onClick={()=> setPageNum(pageNum+1)} disabled={pageNum===5}>다음</PageButton>
          </Page>
        </BoardContainer>
    </Container>
  )
}

export default History

const Head = styled.div`
  margin: 24px 0;
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
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
  margin-top: 12px;
  margin-bottom: 12px;
`

const BoardContainer = styled.div`
  width: 100%;
  height: 50%;
  margin: 0 auto 42px auto;
`


const BoardHead = styled.div`
  width: 100%;
  height:28px;
  display: flex;
  flex-direction: row;
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

const Page = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
`


const PageButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  background-color: #f5f5f5;
  margin: 0 5px;
  cursor: pointer;
  &:disabled {
    background-color: #d9d9d9;
  }
`
