import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { requestPages } from "@apis";
import { PageHeader } from "@organisms";
import { Container } from "@styles"

import { userInfoAtom } from "../../atoms"
import { useRecoilValue } from "recoil"
import { Thumnail, InfoBox } from "@organisms"



const Log = () => {
  const where = useParams().id
  const [isUpload, setIsUpload] = useState(false)
  const [date, setDate] = useState("")
  const [persona, setPersona] = useState({})
  const [chatLog, setChatLog] = useState([])
  const [report, setReport] = useState({})

  const [isOpen, setIsOpen] = useState(false)
  const { email, id, profile_img, real_name, username } = useRecoilValue(userInfoAtom)
  const requestHistoryLog = (e) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }
  console.log('@@@@', typeof report)

  useEffect(() => {
    requestHistoryLog(where)
      .then(res => {
        console.log(res)
        setDate(res.date)
        setPersona(Object.values(res.persona))
        setChatLog(res.chat_log)
        setReport(res.report)
        setIsUpload(true)
      })
      .catch(err => console.log(err))
  }, [])

  return (

    <Container>
      <Logwrap>
      <PageHeader page={where} />
        <ProPerWrap>
        <ProfileWrap>
          <CardContainer className="card-container">
            <CardWrapper>
              <CardUpper />
              <CardLower />
              <Thumnail
                profileImg={profile_img}
                username={real_name}
                uid={id}
              />
            </CardWrapper>
          </CardContainer>
        </ProfileWrap>
        <PersonaWrap>
          <Persona>
            <h1>persona</h1>
            {isUpload && persona.map((item, idx) => {
              return (
                <div key={idx}>{item}</div>
              )
            })}
          </Persona>
        </PersonaWrap>
        </ProPerWrap>
        <ChatLogWrap>
          
          <ChatLog>
            <ChatLogName>채팅기록</ChatLogName>
            {chatLog.map((chat, index) => (
              <ChatList key={index}>{`${chat.role}: ${chat.content}`}</ChatList>
            ))}
          </ChatLog>
        </ChatLogWrap>
        <ReportWrap>
          <Report>
            <ReportName>보고서</ReportName>
            <ReportList>정리:블라블라</ReportList>
            <ReportList>잘한점:블라블라</ReportList>
            <ReportName>보고서</ReportName>
            <ReportList>정리:블라블라</ReportList>
            <ReportList>잘한점:블라블라</ReportList>
            <ReportName>보고서</ReportName>
            <ReportList>정리:블라블라</ReportList>
            <ReportList>잘한점:블라블라</ReportList>
            <ReportName>보고서</ReportName>
            <ReportList>정리:블라블라</ReportList>
            <ReportList>잘한점:블라블라</ReportList>
          </Report>
        </ReportWrap>
      </Logwrap>
    </Container>
  )
}

export default Log;

const Logwrap = styled.div`
  margin-top: 50px;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;

  left: 50%;
  transform: translate(-50%, 0);

  overflow: hidden;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  `
const ProPerWrap = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: row;
`

const Persona = styled.div`
  margin: 0px;
`
//카드 감싼 박스
const CardContainer = styled.div` 
  margin-top: 50px;
  width: 80%;
  margin: 0 auto;
  height: 20em;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  
`

const CardWrapper = styled.div`
  display: inline-block;
  border-radius: 30px 30px 0 0;
  overflow: hidden;
  position: relative;
  background-color: #e9e9e9;
  width: 100%;
  height: 23em;
`
//카드 전체 색상 변경 가능
const CardUpper = styled.div`
  background-color: aqua;
  width: 100%;
  height: 25em;
`
//사진 아래쪽 이름.ID 관련 css
const CardLower = styled.div`
  z-index: 1;
  position: absolute;
  bottom: 0px;
  background-color: #fff;
  width: 100%;
  height: 15em;
  border-radius: 0 0 30px 30px;
`

const ProfileWrap = styled.div`
  width: 80%;
  margin: 0px;
  margin-right: 50px;
`
const PersonaWrap = styled.div`
  width: 80%;
  margin: 10px;
  margin-left: 50px;
`

const ChatLog = styled.div`
  margin: 0px;
  
  width: 100%;
  
  
`

const Report = styled.div`
  margin: 0px;
`

const ChatLogWrap = styled.div`
  margin: 0px;
  margin-top: 80px;
  margin-left: 50px;
  
  
`

const ReportWrap = styled.div`
  margin: 0px;
  margin-top: 80px;
  margin-left: 50px;
`
const ChatLogName = styled.div`
  margin: 0px;
  font-size: 24px;
  font-weight: bold;
`
const ChatList = styled.div`
  margin: 0px;
  margin-top: 20px;
  margin-left: 50px;
`
const ReportName= styled.div`
  margin: 0px;
  font-size: 24px;
  font-weight: bold;
`
const ReportList = styled.div`
  margin: 0px;
  margin-top: 20px;
  margin-left: 50px;
`

//테스트 GET 정보
const Chat = [{
  "id": 606,
  "persona": {
    "persona_name": "준호",
    "age": 20,
    "gender": "남자",
    "position": "신입",
    "department": "개발부서",
    "state": "연봉문제"
  },
  "chat_log": [
    {
      "role": "system",
      "content": "이제부터 상담 역할극을 할건데, 나는 상담하는 사람, 너는 상담 당하는 사람으로, 준호라는 이름의 20살 남자로 개발부서의 신입이고 연봉문제를 원하는 역할을 해줘. user는 준호. Keep responses under 40 words. 코칭역할을 잘 할 수 있도록 프롬프트 엔지니어링을 해야해"
    },
    {
      "role": "user",
      "content": "안녕하세요. 어떤 어려움을 겪고 계신가요?"
    },
    {
      "role": "assistant",
      "content": "안녕하세요. 연봉문제로 고민 중입니다. 개발 부서의 신입으로 입사했는데, 연봉 제안이 예상보다 낮아서 걱정입니다. 어떻게 해야할까요?"
    },
    {
      "role": "user",
      "content": "회사와 솔직한 대화를 시도해보세요. 성과와 역량을 강조하고 비슷한 역할과 경력 수준의 연봉을 언급해보세요. 가능하다면 추가 혜택이나 승진 가능성도 언급해 보세요."
    },
    {
      "role": "assistant",
      "content": "언급한 조언을 토대로 회사와 긍정적인 대화를 시도해볼게요. 제 실력과 경력 수준에 맞는 연봉을 원합니다. 추가 혜택이나 승진 가능성과 함께 노력하겠습니다. 감사합니다."
    },
    {
      "role": "user",
      "content": "성과와 역량을 강조하며, 비슷한 역할과 경력 수준에 맞는 연봉을 요구해보세요. 동시에 더 나은 결과를 위해 노력할 의지를 보여줘야 합니다. 회사가 적절한 대우를 해 줄 것이라 믿을 수 있게끔 전달해 보세요.\n"
    },
    {
      "role": "assistant",
      "content": "성과와 역량에 대해 강조하며 동시에 비슷한 역할과 경력 수준에 맞는 연봉을 요구합니다. 더 나은 결과를 위해 노력할 의지가 있습니다. 회사가 적절한 대우를 해 줄 것이라고 믿습니다. 함께 진심으로 협력하겠습니다."
    },
    {
      "role": "user",
      "content": "회사에 대한 노력과 협력을 하신다면, 결과에 합당한 연봉을 받을 수 있을거라 생각합니다. 혹시 더 도움드릴 사항 있을까요?"
    },
    {
      "role": "assistant",
      "content": "네, 감사합니다. 연봉협상에서 대처하는 방법을 제가 더 적극적으로 연습해보고 싶습니다. 어떻게 연습해 나가면 좋을까요?"
    },
    {
      "role": "user",
      "content": "회사에 대한 노력과 협력으로 결과에 합당한 연봉을 받을 수 있을 것입니다. 더 적극적인 연봉협상을 위해 연습해보세요. 자신의 요구를 명확히 표현하고 대화 시나리오를 연습하여 자신감을 갖추세요."
    },
    {
      "role": "assistant",
      "content": "자신의 요구를 명확하게 표현하고 대화 시나리오를 연습하여 더 적극적인 연봉협상을 할 수 있도록 노력해 보겠습니다. 더 자신감 있게 대화할 수 있도록 준비하겠습니다. 감사합니다."
    },
    {
      "role": "user",
      "content": "알겠습니다. 이것으로 상담을 마치겠습니다. 더 필요한 것이 있으면 언제든지 연락해주세요."
    },
    {
      "role": "assistant",
      "content": "네, 감사합니다. 도움이 많이 되었습니다. 필요하다면 언제든지 다시 연락드리겠습니다. 좋은 하루 되세요!"
    }
  ],
  "report": "{\n    \"개요\": \"연봉문제로 상담을 받았습니다. 회사와 솔직한 대화를 통해 결과에 합당한 연봉을 받기로 결정했고, 대화 시나리오를 연습하여 더 적극적인 연봉협상을 할 계획입니다.\",\n    \"잘한 점\": \"솔직한 대화를 시도하고, 성과와 역량을 강조하여 비슷한 역할과 경력 수준에 맞는 연봉을 요구했습니다. 또한, 더 나은 결과를 위해 노력할 의지를 보여주었습니다.\",\n    \"보완할 점\": \"더 적극적인 연봉협상을 위해 연습하는 것이 필요합니다. 대화 시나리오를 연습하여 자신감을 갖추고, 자신의 요구를 명확히 표현할 수 있도록 노력해야 합니다.\"\n}"
}]
