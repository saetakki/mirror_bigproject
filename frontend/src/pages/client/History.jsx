import styled from "@emotion/styled"
import { Container } from "@styles"
import { IndexItem, PageHeader } from "@organisms"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { requestPages } from "@apis/HistoryApi"
import { useMediaQuery } from "react-responsive"
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci"


import ReactDOMServer from "react-dom/server";

const History = () => {
  const [isLoad, setIsLoad] = useState(false)
  const [pageNum, setPageNum] = useState(1)
  const [history, setHistory] = useState([])
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" })
  const navigate = useNavigate()

  useEffect(() => {
    requestPages(true, pageNum)
      .then((res) => { setHistory(res.results) })
      .catch((err) => console.log(err))
    setIsLoad(true)
  }, [pageNum])

  //console.log('@@@', history)

  const navigateHandler = (e) => {
    navigate(`${e}`)
  }
  const [content, setContent] = useState(null);
  const onClickHandler = (e, item) => {
    //console.log(typeof e)
    //navigate(`${e}`)
    setContent(
      <>
        <GridPersonaTitle>No.{ReactDOMServer.renderToStaticMarkup(e)}</GridPersonaTitle>
        <GridPersonaFont>QUICK VIEW</GridPersonaFont>
        <GridPersonaTitle>Name 페르소나</GridPersonaTitle>
        <GridPersonaFont>{Object.values(item.persona['persona_name'])}</GridPersonaFont>
        <GridPersonaFont>{Object.values(item.persona['age'])}</GridPersonaFont>
        <GridPersonaFont>{Object.values(item.persona['gender'])}</GridPersonaFont>
        <GridPersonaFont>{Object.values(item.persona['position'])}</GridPersonaFont>
        <GridPersonaFont>{Object.values(item.persona['department'])}</GridPersonaFont>
        <GridPersonaFont>{Object.values(item.persona['state'])}</GridPersonaFont>
        <GridPersonaTitle>SUMMARY</GridPersonaTitle>
        {/*<GridPersonaFont>{Object.values(item.report['overall'])}</GridPersonaFont>*/}
      </>)
  }

  return (
    (isLoad ?
      (<Container>
        <GridContainer>
          {!isMobile ?
            <GridPageHeaderWrap>
              <PageHeader page='HISTORY' />
            </GridPageHeaderWrap> :
            <MGridPageHeaderWrap>
              <PageHeader page='HISTORY' />
            </MGridPageHeaderWrap>}
          {!isMobile ?
            (<GridQuickView>
              {content}
            </GridQuickView>)
            : null}
          {!isMobile ?
            <GridHistoryList>
              <IndexItem isHeader={true} />
              {history.map((item) => (
                <BtnLayer key={item.id} onClick={() => navigateHandler(item.id)} onMouseOver={() => onClickHandler(item.id, item)}>
                  <IndexItem
                    id={item.id}
                    date={item.date}
                    persona={Object.values(item.persona)}
                    isBooked={item.bookmark}
                    isMobile={isMobile}
                  />
                </BtnLayer>
              ))}
            </GridHistoryList> :
            <MGridHistoryList>
              <IndexItem isHeader={true} />
              {history.map((item) => (
                <BtnLayer key={item.id} onClick={() => navigateHandler(item.id)} onMouseOver={() => onClickHandler(item.id, item)}>
                  <IndexItem
                    id={item.id}
                    date={item.date}
                    persona={Object.values(item.persona)}
                    isBooked={item.bookmark}
                    isMobile={isMobile}
                  />
                </BtnLayer>
              ))}
            </MGridHistoryList>}
          {!isMobile ?
            <GridPaginationWrap>
              <Pagination>
                <Page>
                  <PageButton onClick={() => setPageNum(pageNum - 1)} disabled={pageNum === 1}>
                    <CiCircleChevLeft />
                  </PageButton>
                  <span>{pageNum} / inf</span>
                  <PageButton onClick={() => setPageNum(pageNum + 1)} disabled={pageNum === 5}>
                    <CiCircleChevRight />
                  </PageButton>
                </Page>
              </Pagination>
            </GridPaginationWrap> :
            <MGridPaginationWrap>
              <Pagination>
                <Page>
                  <PageButton onClick={() => setPageNum(pageNum - 1)} disabled={pageNum === 1}>
                    <CiCircleChevLeft />
                  </PageButton>
                  <span>{pageNum} / inf</span>
                  <PageButton onClick={() => setPageNum(pageNum + 1)} disabled={pageNum === 5}>
                    <CiCircleChevRight />
                  </PageButton>
                </Page>
              </Pagination>
            </MGridPaginationWrap>}
        </GridContainer>
      </Container>
      )
      :
      <div>loading...</div>
    ))
}

export default History
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

const MGridPageHeaderWrap = styled.div`
  padding: 20px;
  grid-column: 1 / 16;
  grid-row: 1;
  background-color: #f9f9f9;
  border-radius: 30px;
  
`

const GridHistoryList = styled.div`
  padding: 20px 20px;
  grid-column: 4 / 16;
  grid-row: 2 / 8;
  background-color: #f9f9f9;
  border-radius: 30px;

`

const MGridHistoryList = styled.div`
  padding: 20px 20px;
  grid-column: 1 / 16;
  grid-row: 2 / 8;
  background-color: #f9f9f9;
  border-radius: 30px;

`

const GridPaginationWrap = styled.div`
  grid-column: 4 / 16;
  grid-row: 8;
`
const MGridPaginationWrap = styled.div`
  grid-column: 1 / 16;
  grid-row: 8;
`

const BtnLayer = styled.div`
  width: 100%;
`

const Pagination = styled(Container)`
  height: 120px;
  display: flex;
  justify-content: center;
`

const Page = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
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
