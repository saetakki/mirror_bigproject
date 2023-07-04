import styled from '@emotion/styled';
import { useState, useRef, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { personaAtom } from '../../../atoms';
import { Container } from '@styles';
import RecordMessage from './RecordMessage';

const Chatting = () => {
  const { persona_name, age, gender, position, department, state } =
    useRecoilValue(personaAtom);

  const chatInputRef = useRef(null);
  const ChattingLogContainerRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const [isRecording, setRecording] = useState(false);
  const [saveMessage, setSaveMessages] = useState([]);

  const scrollToBottom = () => {
    if (ChattingLogContainerRef.current) {
      const chatContainer = ChattingLogContainerRef.current;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [saveMessage]);

  const onSendButtonClickHandler = () => {
    const msg = chatInputRef.current.value;
    if (!msg) return;
    setSaveMessages((prevMessages) => [...prevMessages, { blob: false, msg }]);
    chatInputRef.current.value = '';
  };

  const handleRecordClick = async () => {
    try {
      setRecording(true);
      const userMediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
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
        setSaveMessages((prevMessages) => [
          ...prevMessages,
          { blob: true, audioURL },
        ]);
      });

      mediaRecorder.start();
    } catch (error) {
      console.error('음성 녹음에 실패했습니다:', error);
    }
  };

  const handleStopClick = () => {
    recorder.stop();
    stream.getTracks().forEach((track) => track.stop());

    setRecorder(null);
    setStream(null);
    setRecording(false);
  };

  return (
    <MainContainer>
      <ChattingContainer>
        <div className='w-full h-[10%] bg-blue-300 flex flex-col mb-4 sticky'>
          <strong>
            {persona_name} {age} {gender}
          </strong>
          <span>
            {position} {department} {state}
          </span>
        </div>
        <ChattingLogContainer ref={ChattingLogContainerRef}>
          {saveMessage.map((msg, index) =>
            msg.blob ? (
              <AudioWrap key={index}>
                <Audio id='audioPreview' src={msg.audioURL} controls />
              </AudioWrap>
            ) : (
              <MessageWrap key={index} textLength={msg.msg.length}>
                <h4>{msg.msg}</h4>
              </MessageWrap>
            )
          )}
        </ChattingLogContainer>
        <ChattingControlPanel>
          {isRecording === false ? (
            <RecordBtn onClick={handleRecordClick} disabled={!!stream}>
              녹음 시작
            </RecordBtn>
          ) : (
            <RecordBtn onClick={handleStopClick} disabled={!stream}>
              녹음 중지
            </RecordBtn>
          )}
          {/* <RecordBtn onClick={onRecordClickHandler}>
            {isRecording ? '녹음 종료' : '녹음 시작'}
          </RecordBtn> */}
          <ChatInput
            style={{ backgroundColor: isRecording ? '#CCCCCC' : '' }}
            type='text'
            maxLength={500}
            placeholder={
              isRecording ? '녹음 중입니다.' : '메시지를 입력하세요.'
            }
            disabled={isRecording}
            ref={chatInputRef}
          />
          <SendBtn onClick={onSendButtonClickHandler}>전송</SendBtn>
        </ChattingControlPanel>
      </ChattingContainer>
    </MainContainer>
  );
};

const MainContainer = styled(Container)`
  width: calc(100% - 2rem);
  height: calc(100vh - 112px);
  margin: 0 1rem;
  padding: 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
`;

const ChattingContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 20px 10px;
  overflow: scroll;
`;

const ChattingLogContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: calc(90% - 94px);
  border: 1px solid;
  overflow-y: auto;
`;

const ChattingControlPanel = styled.div`
  margin-top: 1rem;
  width: 100%;
  height: 60px;
  display: flex;
`;

const RecordBtn = styled.button`
  width: 20%;
  border-radius: 8px;
  padding: 16px;
  background-color: white;
  border: 1px solid #e2e0e0;
`;

const ChatInput = styled.input`
  margin: 0 5px;
  width: 80%;
  border-radius: 8px;
  padding: 16px;
  background-color: white;
  border: 1px solid #e2e0e0;
  &:focus-within {
    background-color: ivory;
  }
`;

const SendBtn = styled.button`
  width: 20%;
  border-radius: 8px;
  padding: 16px;
  background-color: white;
  border: 1px solid #e2e0e0;
`;

const Audio = styled.audio`
  height: 50px;
`;
const AudioWrap = styled.div`
  margin: 0px;
  margin-left: 50%;
`;

const MessageWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid black;
  border-radius: 30px;
  margin: 5px 0;
  font-size: ${(props) =>
    Math.min(16, 24 - Math.floor(props.textLength / 10))}px;
  word-break: break-word;
  border-radius: 8px;
  background-color: white;
  border: 1px solid #e2e0e0;
  margin-left: 50%;
`;

export default Chatting;
