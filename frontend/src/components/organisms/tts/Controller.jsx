import { useState } from "react";
import Title from "./Title";
import axios from "axios";
import RecordMessage from "./RecordMessage";
import styled from "@emotion/styled";

const Controller = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [persona, setPersona] = useState(false);

  const [personaName, setPersonaName] = useState('홍길동');
  const [personaAge, setPersonaAge] = useState('32');
  const [personaGender, setPersonaGender] = useState('남자');
  const [personaPosition, setPersonaPosition] = useState('프론트');
  const [personaDepartmenet, setPersonaDepartmenet] = useState('IT');
  const [personaState, setPersonaState] = useState('연봉문제');

  //페르소나 설정 페이지에서 설정완료 버튼을 눌렀을때
  const submitHandle = () => {
    setPersona(true)
  }

  function createBlobURL(data) {
    const blob = new Blob([data], { type: "audio/mpeg" });
    const url = window.URL.createObjectURL(blob);
    return url;
  }
  const handleStop = async (blobUrl) => {
    setIsLoading(true);

    // Append recorded message to messages
    const myMessage = { sender: "me", blobUrl };
    const messagesArr = [...messages, myMessage];
    /*
    // convert blob url to blob object
    fetch(blobUrl)
      .then((res) => res.blob())
      .then(async (blob) => {
        // Construct audio to send file
        const formData = new FormData();
        formData.append("file", blob, "myFile.wav");

        // send form data to api endpoint
        
        await axios
          .post("http://localhost:8000/post-audio", formData, {
            headers: {
              "Content-Type": "audio/mpeg",
            },
            responseType: "arraybuffer", // Set the response type to handle binary data
          })
          .then((res) => {
            const blob = res.data;
            const audio = new Audio();
            audio.src = createBlobURL(blob);

            // Append to audio
            const rachelMessage = { sender: "rachel", blobUrl: audio.src };
            messagesArr.push(rachelMessage);
            setMessages(messagesArr);

            // Play audio
            setIsLoading(false);
            audio.play();
          })
          .catch((err) => {
            console.error(err);
            setIsLoading(false);
          });
      });*/
  };


  /*
    해야할 것 정리
    1. 사용자의 음성 메세지를 덮어씌우지 않고 출력
    2. 사용자 텍스트, 음성 각각 받아서 출력 
    3. 응답 부분은 음성, 텍스트 동시출력 음성바로아래 텍스트
    4.
  */



  const [message, setMessage] = useState('')
  const [stream, setStream] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const [isRecording, setRecording] = useState(false);

  const [saveMessage, setSaveMessages] = useState([]);

  const sendHandle = () => {
    setSaveMessages(prevMessages => [...prevMessages, message]);
    setMessage('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendHandle();
    }
  };


  const handleRecordClick = async () => {
    try {
      setRecording(true);
      const userMediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(userMediaStream);

      const mediaRecorder = new MediaRecorder(userMediaStream);
      setRecorder(mediaRecorder);

      const chunks = [];

      mediaRecorder.addEventListener('dataavailable', (event) => {
        chunks.push(event.data);
      });

      mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
        const audioURL = URL.createObjectURL(audioBlob);
        setAudioPreview(audioURL);
        setSaveMessages(prevMessages => [...prevMessages, audioURL]);

      });

      mediaRecorder.start();
    } catch (error) {
      console.error('음성 녹음에 실패했습니다:', error);
    }
  };

  const handleStopClick = () => {
    recorder.stop();
    stream.getTracks().forEach(track => track.stop());

    setRecorder(null);
    setStream(null);
    setRecording(false);
  };



  let content = null;
  if (persona === true) {
    content =
      <ChattingWrap>
        <ChatPersonaWrap>
          <ChatPersona>{personaName + ' ' + personaAge + '살 ' + personaGender + ' ' + personaPosition + ' ' + personaDepartmenet + ' ' + personaState}</ChatPersona>
        </ChatPersonaWrap>
        <ChatDialogWrap>
          <>
            {audioPreview && <AudioWrap><Audio id="audioPreview" src={audioPreview} controls /></AudioWrap>}
            {saveMessage.map((msg, index) => (
              <MessageWrap key={index}><h4>{msg}</h4></MessageWrap>
            ))}
          </>
        </ChatDialogWrap>
        <SendWrap>
          {isRecording === false ? (<RecordBtn onClick={handleRecordClick} disabled={!!stream}>녹음 시작</RecordBtn>)
            : (<RecordBtn onClick={handleStopClick} disabled={!stream}>녹음 중지</RecordBtn>)}
          <ChatInput type="text" maxLength={500} placeholder="메시지를 입력하세요." value={message} onChange={(e) => { setMessage(e.target.value); }} onKeyPress={handleKeyPress} />
          <SendBtn onClick={sendHandle}>보내기</SendBtn>
        </SendWrap>
      </ChattingWrap>
  } else {
    content =
      <SettingPersona>
        <SetPersonaTitleWrap><SetPersonaTitle>페르소나 설정</SetPersonaTitle></SetPersonaTitleWrap>
        <InputTitle>이름</InputTitle>
        <InputWrap>
          <Input type="text" maxLength={100} placeholder="이름 ex) 홍길동" value={personaName} onChange={(e) => { setPersonaName(e.target.value); }} />
        </InputWrap>
        <InputTitle>나이</InputTitle>
        <InputWrap>
          <Input type="text" maxLength={100} placeholder="나이(숫자) ex) 20, 25" value={personaAge} onChange={(e) => { setPersonaAge(e.target.value); }} />
        </InputWrap>
        <InputTitle>성별</InputTitle>
        <InputWrap>
        <RadioBtnLabel><RadioBtn type="radio" name="Gender" value="남자" checked={personaGender === '남자'} onChange={(e) => { setPersonaGender(e.target.value); }}/>남자</RadioBtnLabel>
        <RadioBtnLabel><RadioBtn type="radio" name="Gender" value="여자" checked={personaGender === '여자'} onChange={(e) => { setPersonaGender(e.target.value); }}/>여자</RadioBtnLabel>
        </InputWrap>
        <InputTitle>직책</InputTitle>
        <InputWrap>
          <Input type="text" maxLength={100} placeholder="직책 ex) 프론트엔드, 백엔드" value={personaPosition} onChange={(e) => { setPersonaPosition(e.target.value); }} />
        </InputWrap>
        <InputTitle>부서</InputTitle>
        <InputWrap>
          <Input type="text" maxLength={100} placeholder="부서 ex) IT 부서" value={personaDepartmenet} onChange={(e) => { setPersonaDepartmenet(e.target.value); }} />
        </InputWrap>
        <InputTitle>고민, 상태</InputTitle>
        <InputWrap>
          <Input type="text" maxLength={100} placeholder="고민, 상태 ex) 연봉인상, 이직고려" value={personaState} onChange={(e) => { setPersonaState(e.target.value); }} />
        </InputWrap>
        <ButtonWrap>
          <PracticeBtn onClick={submitHandle}>설정완료</PracticeBtn>
        </ButtonWrap>
      </SettingPersona>
  }

  return (
    <div className=" flex justify-center items-center overflow-y-hidden">
      {content}
    </div>
  );
};


const RadioBtnLabel = styled.label`
  margin-right: 5px;
`

const RadioBtn = styled.input`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  border: 1px solid #000;
  outline: none;
  margin-right: 5px;
  &:checked {
    background-color: #000;
  }
`


const Audio = styled.audio`
  height: 50px;
`
const AudioWrap = styled.div`
  margin:0px;
  margin-left:50%
`

const MessageWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid black;
  border-radius: 30px;
  margin: 5px 0;
  font-size: ${props => Math.min(16, 24 - Math.floor(props.textLength / 10))}px;
  word-break: break-word;
  border-radius:8px;
  background-color: white;
  border: 1px solid #e2e0e0;
  margin-left:50%
`

const ChatPersona = styled.h1`
  margin:0px;
`

const ChatPersonaWrap = styled.div`
  height: 30px;
  border-bottom: 1px solid black;

`

const ChattingWrap = styled.div`
  width: 80%;
  border : 1px solid rgb(225, 223, 223);
  border-radius : 30px;
  padding: 20px;
  box-shadow: 0px 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  margin-top: 10px;
  flex-direction: row;

`

const ChatDialogWrap = styled.div`
  margin: 5px 0;
  display: flex;
  flex-direction: column;
  height: 500px;
  padding: 20px;
  max-height: 500px;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`

const SendWrap = styled.div`
  display: flex;
  width: 100%;
`

const RecordBtn = styled.button`
  width: 20%;
  border-radius:8px;
  padding: 16px;
  background-color: white;
  border: 1px solid #e2e0e0;
`

const SendBtn = styled.button`
  width: 20%;
  border-radius:8px;
  padding: 16px;
  background-color: white;
  border: 1px solid #e2e0e0;
`

const ChatInput = styled.input`
  margin: 0 5px;
  width: 80%;
  border-radius:8px;
  padding: 16px;
  background-color: white;
  border: 1px solid #e2e0e0;
  &:focus-within{
    background-color: ivory;
  }
  `;








const InputWrap = styled.div`
  margin-top: 5px;
  display: flex;
  `;

const Input = styled.input`
  flex: 1;
  width: 100%;
  display: flex;
  border-radius:8px;
  padding: 16px;
  background-color: white;
  border: 1px solid #e2e0e0;
  &:focus-within{
    background-color: ivory;
  }
  `;
const SetPersonaTitleWrap = styled.div`
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  display: flex;
`

const SetPersonaTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: #262626;
`


const InputTitle = styled.div`
  margin-top: 30px;
  font-size: 15px;
  font-weight: 800;
  color: #262626;
  `

const SettingPersona = styled.div`
  width: 85%;
  border : 1px solid rgb(225, 223, 223);
  border-radius : 30px;
  padding: 20px;
  box-shadow: 0px 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  margin-top: 10px;
  flex-direction: row;
  `

const ButtonWrap = styled.div`
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  display: flex;
`

const PracticeBtn = styled.button`
  maring-top: 10px;
  width: 80%;
  height: 40px;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
&:hover {
  background-color: #2EE59D;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-2px);
}
`
export default Controller;
