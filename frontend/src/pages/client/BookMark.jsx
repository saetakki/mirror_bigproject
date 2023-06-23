import styled from "@emotion/styled"
import { Container } from "@styles"
import { IndexRow, PageHeader } from "@organisms"
import { useEffect, useState } from "react"
import { getBookMarkPagination } from "@apis"


const BookMark = () => {
  const [isLoad, setIsLoad] = useState(false)
  const [pageNum, setPageNum] = useState(1)
  const [bookmark, setBookmark] = useState([])

  useEffect(()=> {
    getBookMarkPagination(pageNum)
    .then((res)=> {setBookmark(res)})
    .catch((err)=> console.log(err))
    setIsLoad(true)
  },[pageNum])



  return (
    (isLoad ?
    (<Container>
      <Head>
        <PageHeader page="북마크 목록" />
        <BoardContainer>
          <BoardHead>
            <IndexRow id="CHAT ID" isHeader={true} date="DATE" persona="PERSONA"/>
          </BoardHead>
          <GridLine/>
          <ItemListContainer>
          {bookmark.map((booked) => (
              <ItemContainer key={booked.id}>
                <IndexRow id={booked.id} date={booked.date} persona={booked.persona} isBooked={booked} />
              </ItemContainer>
            ))}
          </ItemListContainer>
          <Page>
            <PageButton onClick={()=> setPageNum(pageNum-1)} disabled={pageNum===1}>이전</PageButton>
            <span>{pageNum} / inf</span>
            <PageButton onClick={()=> setPageNum(pageNum+1)} disabled={pageNum===5}>다음</PageButton>
          </Page>
        </BoardContainer>
      </Head>
    </Container>)
    :
    <div>loading...</div>
    )
  )
}

export default BookMark

const Head = styled.div`
  margin: 24px 0;
  strong {
    font-size: 24px;
  }
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