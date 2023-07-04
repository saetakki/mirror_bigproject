import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { requestPages, requestHistoryLog } from "@apis";
import { PageHeader } from "@organisms";
import { Container } from "@styles"
import { useMediaQuery } from "react-responsive"
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
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" })
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
  // 페르소나
  const personaContent = (
    <>
      <PersonaWrap>
        <ChatLogName>내담자 정보</ChatLogName>
        <Persona>
          {isUpload && persona.map((item, idx) => {
            const labels = ['이름', '나이', '성별', '직책', '부서', '상태']; // 레이블 문자열 배열
            const labelIndex = idx % labels.length; // 레이블 인덱스 계산
            const label = labels[labelIndex]; // 현재 항목에 대한 레이블
            return (
              <div key={idx}><span>{label} :  </span>{item}</div>
            )
          })}
        </Persona>
      </PersonaWrap>
    </>
  );

  //채팅기록
  const chatLogContent = (
    <>
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
    </>
  );

  //보고서
  const evaluationData = report['GROW model evaluation'];
  const sections = ['Goal', 'Reality', 'Options', 'Will'];
  const reportContent = (
    <>
      <ReportName>보고서</ReportName>
      <Report>
        <ReportTitle>What Went Well</ReportTitle>
        {report['what went well'] && Object.entries(report['what went well']).map(([key, value]) => (
          <ReportList key={key}>- {value}</ReportList>
        ))}<br/>
        <ReportTitle>What Could Be Improved</ReportTitle>
        {report['what could be improved'] && Object.entries(report['what could be improved']).map(([key, value]) => (
          <ReportList key={key}>- {value}</ReportList>
        ))}<br/>
        <ReportTitle>GROW model evaluation</ReportTitle><br />
        {evaluationData && (
          sections.map((section) => (
            <div key={section}>
              <strong>{section.charAt(0)} : {section}</strong>
              {Object.entries(evaluationData[section]).map(([key, value]) => (
                <ReportList key={key}>- {key} : {value}</ReportList>
              ))}
            </div>
          ))
              )}<br/>
        <ReportTitle>Best Dialogue</ReportTitle>
        {report['best_dialogue'] && report['best_dialogue'].map((item) => (
          Object.entries(item).map(([key, value]) => (
            <ReportList key={key}> {key} - {value}</ReportList>
          ))
        ))}<br/>
        <ReportTitle>Worst Dialogue</ReportTitle>
        {report['worst_dialogue'] && report['worst_dialogue'].map((item) => (
          Object.entries(item).map(([key, value]) => (
            <ReportList key={key}> {key} - {value}</ReportList>
          ))
        ))}
      </Report>
    </>
  );

  //전체적인 화면 구성은 위에서 정의하고 return에서 PC, Mobile 여부 확인
  return (
    <Container>
      <GridContainer>
        <GridPageHeaderWrap>
          <PageHeader page={where} />
        </GridPageHeaderWrap>
        {!isMobile ?
          <ProPerWrap>
            {personaContent}
          </ProPerWrap> :
          <MProPerWrap>
            {personaContent}
          </MProPerWrap>}
        {!isMobile ?
          <ChatLogWrap>
            {chatLogContent}
          </ChatLogWrap> :
          <MChatLogWrap>
            {chatLogContent}
          </MChatLogWrap>}
        {!isMobile ?
          <ReportWrap>
            {reportContent}
          </ReportWrap> :
          <MReportWrap>
            {reportContent}
          </MReportWrap>}
      </GridContainer>
    </Container>
  );
}

export default Log;

const GridPageHeaderWrap = styled.div`
  padding: 20px;
  grid-column: 1 / 16;
  grid-row: 1;
  border : 1px solid rgb(225, 223, 223);
  border-radius: 10px;
  background-color: #f9f9f9;
  
`

const GridContainer = styled.div`
  display: grid;
  padding: 20px 10px;
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows : repeat(12, 1fr);
  grid-gap: 24px;
  max-height: 100%;
`

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

const ChatProPerWrap = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  
`
const ProPerWrap = styled.div`
  border : 1px solid rgb(225, 223, 223);
  border-radius : 10px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  grid-column: 1 / 9;
  grid-row: 2;
  background-color: #f9f9f9;
`

const MProPerWrap = styled.div`
  border : 1px solid rgb(225, 223, 223);
  border-radius : 10px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  grid-column: 1 / 16;
  grid-row: 2;
  background-color: #f9f9f9;
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
  overflow: scroll;
  height: 220px;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`

const ChatLogWrap = styled.div`
  border : 1px solid rgb(225, 223, 223);
  border-radius : 10px;
  padding: 20px;
  background-color: #f9f9f9;
  margin: 0px;
  grid-column: 9 / 16;
  grid-row: 2 / 17;
`
const MChatLogWrap = styled.div`
  border : 1px solid rgb(225, 223, 223);
  border-radius : 10px;
  padding: 20px;
  background-color: #f9f9f9;
  margin: 0px;
  grid-column: 1 / 16;
  grid-row: 3 / 28;
`

const ReportWrap = styled.div`
  border : 1px solid rgb(225, 223, 223);
  border-radius : 10px;
  background-color: #f9f9f9;
  margin: 0px;
  height: 313px;
  margin-bottom: 50px;
  padding: 20px;
  grid-column: 1 / 9;
  grid-row: 3 / 23;
`

const MReportWrap = styled.div`
  border : 1px solid rgb(225, 223, 223);
  border-radius : 10px;
  background-color: #f9f9f9;
  margin: 0px;
  height: 300px;
  margin-bottom: 50px;
  padding: 20px;
  grid-column: 1 / 16;
  grid-row: 28 / 33;
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
`

const ReportTitle = styled.strong`
  font-size: 18px;
`
