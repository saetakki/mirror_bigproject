import styled from "@emotion/styled"
import { useRecoilValue } from "recoil"
import { userInfoAtom } from "../../../atoms"

export const PageHeader = ({page}) => {
  const username = useRecoilValue(userInfoAtom).username
  const txt = {
    "연습기록" : `${username}님의 연습기록을 모아봤어요.`,
    "북마크 목록" : `${username}님의 북마크한 연습내용을 모아봤어요.`,
  }
  
  return (
    <HeadContainer>
      <strong>{page}</strong>
      <Quotes>
        <span>{txt?.[page] || null}</span>
        <GridLine/>
      </Quotes>
    </HeadContainer>
  )
}

export default PageHeader

const HeadContainer = styled.div`
  margin: 24px 0;
  strong {
    font-size: 24px;
  }
`

const Quotes = styled.div`
  margin-top: 12px;
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