import styled from "@emotion/styled"
import { Container } from "@styles"
import { IndexItem, PageHeader } from "@organisms"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { requestPages } from "@apis/HistoryApi"
import { useMediaQuery } from "react-responsive"
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci"

const History = () => {
  const [isLoad, setIsLoad] = useState(false)
  const [pageNum, setPageNum] = useState(1)
  const [history, setHistory] = useState([])
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" })
  const navigate = useNavigate()
  useEffect(()=> {
    requestPages(true,pageNum)
    .then((res)=> {setHistory(res.results)})
    .then(res => res.results)
    .catch((err)=> console.log(err))
    setIsLoad(true)
  },[pageNum])

  console.log(history)



  const onClickHandler = (e) => {
    navigate(`${e}`)
  }


  return (
    (isLoad ? 
    (<Container>
        <PageHeader page='연습기록'/>
          <IndexItem isHeader={true}/>
          {history.map((item) => (
            <BtnLayer key={item.id} onClick={()=>onClickHandler(item.id)}>
              <IndexItem
                id={item.id} 
                date={item.date} 
                persona={Object.values(item.persona)} 
                isBooked={item.bookmark}
                isMobile={isMobile}
                />
            </BtnLayer>
            ))}    
        <Pagination>
          <Page>
            <PageButton onClick={()=> setPageNum(pageNum-1)} disabled={pageNum===1}>
              <CiCircleChevLeft/>
            </PageButton>
            <span>{pageNum} / inf</span>
            <PageButton onClick={()=> setPageNum(pageNum+1)} disabled={pageNum===5}>
              <CiCircleChevRight/>
            </PageButton>
          </Page> 
        </Pagination>
    </Container>
  )
  :
  <div>loading...</div>
  ))   
}

export default History


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
  opacity: 0;
  margin: 0 5px;
  cursor: pointer;
  &:disabled {
    background-color: #d9d9d9;
  }
`
