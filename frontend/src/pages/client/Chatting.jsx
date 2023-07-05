import styled from '@emotion/styled';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  personaAtom,
  currentHistoryIdAtom,
  sampleQuestionAtom,
} from '../../atoms';
import { Container } from '@styles';
import RecordMessage from '@organisms/tts/RecordMessage';
// import test2 from '../../assets/test2.wav';
import {
  sendUserText,
  sendUserVoice,
  requestGetAnswerToGpt,
  requestGenerateReport,
  requestSuggestion,
} from '@apis/ChatApi';

const Chatting = () => {
  const { persona_name, age, gender, position, department, state } =
    useRecoilValue(personaAtom);

  const [isSuggestionClicked, setIsSuggestionClicked] = useState(false);
  const [isClickedTab, setIsClickedTab] = useState('G');
  const [isDisable, setIsDisable] = useState(true);
  const [isSampleQuestion, setIsSampleQuestion] =
    useRecoilState(sampleQuestionAtom);

  const currentId = useRecoilState(currentHistoryIdAtom)[0];
  const navigate = useNavigate();

  const chatInputRef = useRef(null);
  const ChattingLogContainerRef = useRef(null);
  const [chunks, setChunks] = useState([]);
  const [stream, setStream] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const [isRecording, setRecording] = useState(false);
  const [saveMessage, setSaveMessages] = useState([]);

  // 채팅 메세지가 새로 등록되어 y값이 바뀔 경우 스크롤 제일 아래로 이동시키는 코드
  const scrollToBottom = () => {
    if (ChattingLogContainerRef.current) {
      const chatContainer = ChattingLogContainerRef.current;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  // 채팅 메세지가 새로 등록되는지를 감지하여 새로 등록됨이 감지될 경우 스크롤을 제일 아래로 이동시키는 함수 실행
  useEffect(() => {
    scrollToBottom();
    if (isDisable && isSampleQuestion) {
      setIsDisable(false);
    }
  }, [saveMessage, isDisable, isSampleQuestion]);

  const onSendButtonClickHandler = () => {
    const msg = chatInputRef.current.value;
    if (!msg) return;
    setSaveMessages((prevMessages) => [...prevMessages, { blob: false, msg }]);
    sendUserText(currentId, msg)
      .then((res) => console.log(res, 'sendUserText'))
      .then(() => requestAnswerHandler(currentId))
      .catch((err) => console.log(err));
    chatInputRef.current.value = '';
  };

  const requestAnswerHandler = (id) => {
    requestGetAnswerToGpt(id)
      .then((res) => {
        console.log('chatgpt', res);
        const chatAnswer = res.text;
        const emotion = res.emotion;
        const blobURL = res.blob_url;

        setSaveMessages((prevMessages) => [
          ...prevMessages,
          { blob: true, msg: chatAnswer, emotion: emotion, audioURL: blobURL },
        ]);
        // const answer = res;
        // setSaveMessages((prevMessages) => [
        //   ...prevMessages,
        //   { blob: false, msg: answer },
        // ]);
      })
      .catch((err) => console.log(err));
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

      const recordedChunks = [];

      mediaRecorder.addEventListener('dataavailable', (event) => {
        recordedChunks.push(event.data);
      });

      mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(recordedChunks, {
          type: 'audio/mp3; codecs=opus',
        });
        console.log('audioBlob', audioBlob);
        const audioURL = URL.createObjectURL(audioBlob);
        setAudioPreview(audioURL);

        setSaveMessages((prevMessages) => [
          ...prevMessages,
          { blob: true, audioURL },
        ]);
        setChunks(recordedChunks);
      });

      mediaRecorder.start();
    } catch (error) {
      console.error('음성 녹음에 실패했습니다:', error);
    }
  };

  const handleStopClick = () => {
    recorder.stop();
    stream.getTracks().forEach((track) => track.stop());

    sendUserVoice(currentId)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setRecorder(null);
    setStream(null);
    setRecording(false);
  };

  // 종료버튼 클릭시 보고서 생성 기능 실행
  const onExitButtonClickHandler = () => {
    requestGenerateReport(currentId)
      .then((res) => console.log(res))
      .then(() => navigate('/'))
      .catch((err) => console.log(err));
  };

  const onSuggestionButtonClickHandler = async () => {
    console.log('click');
    setIsSuggestionClicked(!isSuggestionClicked);
    try {
      const res = await requestSuggestion(currentId);
      setIsSampleQuestion(res);
      setIsDisable(false); // isSampleQuestion 값이 업데이트되면 버튼 활성화
    } catch (error) {
      console.log(error);
    }
  };

  const onSuggestionChooseHandler = (e) => {
    console.log(e.target.innerText);
    chatInputRef.current.value = e.target.innerText;
    setIsSuggestionClicked(false);
  };

  return (
    <MainContainer>
      <ChattingContainer>
        <div className='h-[10%] bg-blue-300 flex flex-col mb-4 relative'>
          <strong>
            {persona_name} {age} {gender}
          </strong>
          <span>
            {position} {department} {state}
          </span>
          <button
            className='w-24 h-8 rounded-[10px] absolute z-10 right-5 top-[25%] bg-slate-300'
            onClick={onExitButtonClickHandler}
          >
            종료
          </button>
        </div>
        <ChattingLogContainer ref={ChattingLogContainerRef}>
          {saveMessage.map((msg, index) =>
            msg.blob ? (
              <AudioWrap key={index}>
                {/* {console.log(msg)} */}
                <Audio id='audioPreview' src={msg.audioURL} controls />
              </AudioWrap>
            ) : (
              <MessageWrap key={index} textLength={msg.msg.length}>
                <h4>{msg.msg}</h4>
              </MessageWrap>
            )
          )}
        </ChattingLogContainer>
        <ChattingControlPanel className='flex items-center'>
          <SuggestionBtn
            className='h-[58px] w-[5%] rounded-[8px] mr-1'
            onClick={onSuggestionButtonClickHandler}
            disabled={isSampleQuestion === null}
          >
            ?
          </SuggestionBtn>
          {isSuggestionClicked && (
            <OpenUpTab className={isSuggestionClicked ? 'open' : ''}>
              <div className='px-[1rem] py-[20px] text-[20px]'>
                G R O W 상황 별 추천 질문을 골라보세요.
              </div>
              <ul className='py-4'>
                {['G', 'R', 'O', 'W'].map((char, index) => {
                  return (
                    <li
                      className={`px-4 py-2 font-bold text-lg  ${
                        isClickedTab === char
                          ? 'border-b-4 border-blue-400'
                          : ''
                      }`}
                      key={index}
                      onClick={() => setIsClickedTab(char)}
                    >
                      {char.toUpperCase()}
                    </li>
                  );
                })}
              </ul>
              {isSampleQuestion !== null ? (
                <div className='h-full mx-4 mb-[40px] bg-yellow-200'>
                  {isSampleQuestion.sample_question[isClickedTab].map(
                    (item, idx) => {
                      return (
                        <div key={idx} onClick={onSuggestionChooseHandler}>
                          {item}
                        </div>
                      );
                    }
                  )}
                </div>
              ) : (
                <div>Loading</div>
              )}
            </OpenUpTab>
          )}
          {isRecording === false ? (
            <RecordBtn onClick={handleRecordClick} disabled={!!stream}>
              녹음
            </RecordBtn>
          ) : (
            <RecordBtn onClick={handleStopClick} disabled={!stream}>
              중지
            </RecordBtn>
          )}
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
  width: 15%;
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

const SuggestionBtn = styled(RecordBtn)`
  display: flex;
  justify-content: center;
  width: 5%;
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

const OpenUpTab = styled.div`
  position: absolute;
  z-index: 10;
  width: calc(100% - 130px);
  bottom: 100px;
  right: 16px;
  background-color: #fff;
  transition: all 0.5s ease-in-out;
  height: 0;
  border-radius: 10px 10px 0 0;
  overflow: hidden;

  &.open {
    height: 60%;
  }

  ul {
    display: flex;
    justify-content: space-around;
    padding: 1rem;
  }
`;

export default Chatting;
