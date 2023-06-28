import styled from "@emotion/styled"
import { useRecoilValue } from "recoil"
import { userInfoAtom } from "../../../atoms"

export const PageHeader = ({page}) => {
  const username = useRecoilValue(userInfoAtom).username
  const isLogPage = Number(page) ? true : false
  const newKey = `연습기록 > ${page}`

  const txt = {
    "HISTORY" : `${username}님의 연습기록을 모아봤어요.`,
    "BOOKMARK" : `${username}님의 북마크한 채팅기록들을 모아봤어요.`,
    
  }
  
  if(isLogPage) {
    txt[newKey] = `${username}님의 ${page}번째 연습기록을 불러왔어요.`
  }
  
  
  return (
    <Head>
      <strong>{isLogPage ? newKey : page}</strong>
      <Quotes>
        <span>{txt?.[isLogPage ? newKey : page] || null}</span>
      </Quotes>
    </Head>
  )
}

export default PageHeader

const Head = styled.div`
  margin: 5px 0 0 0;
  strong {
    font-size: 24px;
  }
`


const Quotes = styled.div`
  margin-top: 12px;
  font-size: 12px;
  color: #9a9a9a;
`

const GridLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
  margin-top: 12px;
`