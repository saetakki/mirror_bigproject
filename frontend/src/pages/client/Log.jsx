import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { requestPages, requestHistoryLog } from "@apis";
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

  useEffect(() => {
    requestHistoryLog(where)
    .then(res => {
      setDate(res.date)
      setPersona(Object.values(res.persona))
      setChatLog(res.chat_log) 
      setReport(res.report)
      setIsUpload(true)
    })
    .catch(err => console.log(err))
}, [])

  const overView = report['Overview'];
  const good = report['What went well'];
  const bad = report['What could be improved'];

  return (
    <Container>
      <Logwrap>
        <PageHeader page={where} />
        <ProPerWrap>
          <PersonaWrap>
            <Persona>
              <PersonaTitle>페르소나</PersonaTitle>
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
            <ChatContainer>
              {chatLog.slice(1, chatLog.length).map((chat, index) => (
                <ChatProPerWrap key={index}>
                  {chat.role === 'user' ? (
                    <UserBubble>
                      <Message>{chat.content}</Message>
                    </UserBubble>
                  ) : (
                    <AssistantBubble>
                      <Message>{chat.content}</Message>
                    </AssistantBubble>
                  )}
                </ChatProPerWrap>
              ))}
            </ChatContainer>
          </ChatLog>
        </ChatLogWrap>
        <ReportWrap>
          <Report>
            <ReportName>보고서</ReportName>
            <ReportList>개요 및 평가 - {overView}</ReportList>
            <ReportList>잘한 점 - {good}</ReportList>
            <ReportList>보완할 점 - {bad}</ReportList>
          </Report>
        </ReportWrap>
      </Logwrap>
    </Container>
  )
}

export default Log;

const ChatContainer = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  max-height: 500px;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const ChatBubble = styled.div`
  display: inline-block;
  padding: 8px;
  margin: 8px;
  border-radius: 8px;
  max-width: 50%;
  word-break: break-word; 
`;

const UserBubble = styled(ChatBubble)`
  background-color: lightblue;
  align-self: flex-end;
  margin-left: 50%
  
`;

const AssistantBubble = styled(ChatBubble)`
  background-color: lightgray;
  align-self: flex-start;
`;

const Message = styled.div`
  text-align: ${({ align }) => align};
`;

const Logwrap = styled.div`
  margin-top: 50px;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  max-width: 100%;
  padding: 0 10%;

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

const ChatProPerWrap = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: row;
`
const ProPerWrap = styled.div`
  border : 1px solid rgb(225, 223, 223);
  border-radius : 30px;
  padding: 20px;
  box-shadow: 0px 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  margin-top: 30px;
  display: flex;
  flex-direction: row;
`
const PersonaTitle = styled.div`
  margin: 0px;
  font-size: 24px;
  font-weight: bold;
`

const Persona = styled.div`
  margin: 0px;
`

const PersonaWrap = styled.div`
  width: 80%;
  margin: 10px;
`

const ChatLog = styled.div`
  margin: 0px;
  width: 100%;
`

const Report = styled.div`
  margin: 0px;
`

const ChatLogWrap = styled.div`
  border : 1px solid rgb(225, 223, 223);
  border-radius : 30px;
  padding: 20px;
  box-shadow: 0px 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
 
  margin: 0px;
  margin-top: 30px;
  
  
`

const ReportWrap = styled.div`
  border : 1px solid rgb(225, 223, 223);
  border-radius : 30px;
  box-shadow: 0px 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  margin: 0px;
  margin-top: 30px;
  margin-bottom: 50px;
  padding: 20px;
`
const ChatLogName = styled.div`
  margin: 0px;
  font-size: 24px;
  font-weight: bold;
`
const ReportName = styled.div`
  margin: 0px;
  font-size: 24px;
  font-weight: bold;
`
const ReportList = styled.div`
  margin: 0px;
  margin-top: 20px;

`