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
        <GridPersonaTitle>Name 페르소나</GridPersonaTitle>
        <GridPersonaFont>{Object.values(e.persona['persona_name'])}</GridPersonaFont>
        <GridPersonaFont>{Object.values(e.persona['age'])}</GridPersonaFont>
        <GridPersonaFont>{Object.values(e.persona['gender'])}</GridPersonaFont>
        <GridPersonaFont>{Object.values(e.persona['position'])}</GridPersonaFont>
        <GridPersonaFont>{Object.values(e.persona['department'])}</GridPersonaFont>
        <GridPersonaFont>{Object.values(e.persona['state'])}</GridPersonaFont>
        <GridPersonaTitle>SUMMARY</GridPersonaTitle>
        <GridPersonaFont>{Object.values(e.report['summary'])}</GridPersonaFont>
      </>)
  }

  return (
    (isLoad ?
      (<Container>
        <GridContainer>
          <GridPageHeaderWrap>
            <PageHeader page="BOOKMARK" />
          </GridPageHeaderWrap>
          {!isMobile ?
            <GridQuickView>
              {content}
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
const GridPersonaTitle = styled.p`
  font-size : 14px;
  font-weight: bold; 
`
const GridPersonaFont = styled.p`
  font-size : 12px; 
`

const GridQuickView = styled.div`
  padding: 20px;
  grid-column: 1 / 4;
  grid-row: 2 / 5;
  background-color: #f9f9f9;
  border-radius: 30px;
  overflow: auto;
    ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`

const GridContainer = styled.div`
  display: grid;
  padding: 20px 10px;
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows : repeat(8, 1fr);
  grid-gap: 24px;
`

const GridPageHeaderWrap = styled.div`
  padding: 20px;
  grid-column: 1 / 16;
  grid-row: 1;
  background-color: #f9f9f9;
  border-radius: 30px;
  
`

const GridHistoryList = styled.div`
  padding: 20px 20px;
  grid-column: 3 / 17;
  grid-row: 2 / 8;
  background-color: #f9f9f9;
  border-radius: 30px;

`

const GridPaginationWrap = styled.div`
  grid-column: 5 / 16;
  grid-row: 8;
`
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
  grid-column: 4 / 17;
  grid-row: 2 / 9;
`
const MBoardContainer = styled.div`
  width: 100%;
  height: 50%;
  grid-column: 1 / 16;
  grid-row: 2 / 9;
`


const BoardHead = styled.div`
  width: 100%;
  height:80px;
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

  border-radius: 5px;
  
  & > :first-of-type {
    border-right: 2px solid #d9d9d9; 
    border-radius: 5px 0 0 5px;
    background-color: #e9e9e9;
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