import styled from "@emotion/styled"
import { Container } from "@styles"
import { IndexItem, PageHeader } from "@organisms"
import { useEffect, useState } from "react"
import { requestPages } from "@apis"
import ReactDOMServer from "react-dom/server";
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci"
const BookMark = () => {
  const [isLoad, setIsLoad] = useState(false)
  const [pageNum, setPageNum] = useState(1)
  const [bookmark, setBookmark] = useState([])
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" })
  const navigate = useNavigate()

  useEffect(() => {
    requestPages(false, pageNum)
      // .then((res) => console.log(res))
      .then((res) => { setBookmark(res.results) })
      .catch((err) => console.log(err))
    setIsLoad(true)
  }, [pageNum])

  const navigateHandler = (e) => {
    navigate(`/history/${e.id}`)
  }
  const [content, setContent] = useState(null);
  const onClickHandler = (e) => {
    setContent(
      <>
        <GridPersonaTitle>No.{ReactDOMServer.renderToStaticMarkup(e.id)}</GridPersonaTitle>
        <GridPersonaFont>QUICK VIEW</GridPersonaFont>
        <br/>
        <GridPersonaTitle>PERSONA</GridPersonaTitle>
        {Object.values(e.persona).map((value) => (
          <>
            <GridPersonaFont>{value}</GridPersonaFont>
          </>
        ))}
        <br/>
        <GridPersonaTitle>SUMMARY</GridPersonaTitle>
        {
          Object.values(e.persona['persona_name']).includes('준') && Object.values(e.persona['persona_name']).includes('호') ? (
            <GridPersonaFont>{Object.values(e.report['Overview'])}</GridPersonaFont>
          ) : (
            <GridPersonaFont>{Object.values(e.report['overall'])}</GridPersonaFont>
          )
        }
        <br/><hr/><br/>
      </>)
  }

  return (
    (isLoad ?
      (<Container>
        <GridContainer>
          {!isMobile ?
          <GridPageHeaderWrap>
            <PageHeader page="BOOKMARK" />
          </GridPageHeaderWrap>:
          <MGridPageHeaderWrap>
          <PageHeader page="BOOKMARK" />
          </MGridPageHeaderWrap>}
          {!isMobile ?
            <GridQuickView>
              {content}
              <strong>Chatgpt와 함께하는 리더 코칭 훈련</strong>
              <ul>
                <GridQuickViewLi> - 코칭 사전 훈련</GridQuickViewLi>
                <GridQuickViewLi> - 코칭 숙련 대상 확보</GridQuickViewLi>
                <GridQuickViewLi> - 리더들의 코칭역량 향상</GridQuickViewLi>
              </ul>
              <br/>
              <strong>지금까지 진행한 코칭 연습기록을 다시 확인해보세요!</strong>
            </GridQuickView> : null}
          {!isMobile ?
            <BoardContainer>
              <GridHistoryList>
                <IndexItem id="CHAT ID" isHeader={true} />
                <ItemListContainer>
                  {bookmark.map((booked) => (
                    <ItemContainer key={booked.id} onClick={() => navigateHandler(booked)} onMouseOver={() => onClickHandler(booked)}>
                      <IndexItem id={booked.id} date={booked.date} persona={booked.persona} isBooked={booked} />
                    </ItemContainer>
                  ))}
                </ItemListContainer>
              </GridHistoryList>
              <GridPaginationWrap>
                <Page>
                  <PageButton onClick={() => setPageNum(pageNum - 1)} disabled={pageNum === 1}>
                    <CiCircleChevLeft />
                  </PageButton>
                  <span>{pageNum} / inf</span>
                  <PageButton onClick={() => setPageNum(pageNum + 1)} disabled={pageNum === 5}>
                    <CiCircleChevRight />
                  </PageButton>
                </Page>
              </GridPaginationWrap>
            </BoardContainer> :
            <MBoardContainer>
              <GridHistoryList>
                <IndexItem id="CHAT ID" isHeader={true} />
                <ItemListContainer>
                  {bookmark.map((booked) => (
                    <ItemContainer key={booked.id} onClick={() => navigateHandler(booked)} onMouseOver={() => onClickHandler(booked)}>
                      <IndexItem id={booked.id} date={booked.date} persona={booked.persona} isBooked={booked} />
                    </ItemContainer>
                  ))}
                </ItemListContainer>
              </GridHistoryList>
              <GridPaginationWrap>
                <Page>
                  <PageButton onClick={() => setPageNum(pageNum - 1)} disabled={pageNum === 1}>
                    <CiCircleChevLeft />
                  </PageButton>
                  <span>{pageNum} / inf</span>
                  <PageButton onClick={() => setPageNum(pageNum + 1)} disabled={pageNum === 5}>
                    <CiCircleChevRight />
                  </PageButton>
                </Page>
              </GridPaginationWrap>
            </MBoardContainer>}
        </GridContainer>
      </Container>)
      :
      <div>loading...</div>
    )
  )
}

export default BookMark

const GridQuickViewLi = styled.li`
  font-size:14px;
`

const GridPersonaTitle = styled.strong`
  font-weight: bold; 
 `

const GridPersonaFont = styled.p`
  font-size : 12px; 
`

const GridQuickView = styled.div`
min-width: 300px;
max-width: 300px;
height: calc(100vh - 131px);
padding: 20px;
position: fixed;
left: 128px;
top: 116px;
background-color: #f9f9f9;
border-radius: 10px;
overflow: auto;
::-webkit-scrollbar {
  width: 0;
  height: 0;
}

@media (max-width: 1630px) {
  left: 128px;
  min-width: 200px;
  max-width: 200px;
}
@media (max-width: 1163px) {
  left: 128px;
  min-width: 120px;
  max-width: 120px;
}
`;


const GridContainer = styled.div`
  display: grid;
  padding: 20px 10px;
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows : repeat(8, 1fr);
  grid-gap: 24px;
  border: none; /* 바깥 선 제거 */
`

const GridPageHeaderWrap = styled.div`
  padding: 20px;
  grid-column: 4 / 17;
  grid-row: 1 / 2;
  background-color: #f9f9f9;
  border-radius: 10px;
`
const MGridPageHeaderWrap = styled.div`
  padding: 20px;
  grid-column: 1 / 16;
  grid-row: 1 / 2;
  background-color: #f9f9f9;
  border-radius: 10px;
`

const GridHistoryList = styled.div`
  padding: 20px 20px;
  grid-column: 3 / 17;
  grid-row: 2 / 8;
  background-color: #f9f9f9;
  border-radius: 10px;

`

const GridPaginationWrap = styled.div`
  grid-column: 5 / 16;
  grid-row: 8;
`

const BoardContainer = styled.div`
  width: 100%;
  height: 50%;
  grid-column: 4 / 17;
  grid-row: 2 / 9;
`
const MBoardContainer = styled.div`
  width: 100%;
  height: 50%;
  grid-column: 1 / 16;
  grid-row: 2 / 9;
`

const ItemListContainer = styled.div`
  width: 100%;
  `

const ItemContainer = styled.div`
  width: 100%;
  
  &:hover {
    background-color: #2EE59D;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
    border-radius: 10px;
  }
  
`

const Page = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  margin-top: 40px;
`


const PageButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  background-color: #f5f5f5;
  opacity: 1;
  margin: 0 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:disabled {
    background-color: #d9d9d9;
  }
`