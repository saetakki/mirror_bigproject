import { customAxios, getCookie } from './Api';
import axios from 'axios';
import audio from './audio.mp3';
import test3 from './test3.mp3';
import test2 from './test2.mp3';

const csrftoken = getCookie('csrftoken');

export const requestSetPersona = async ({
  persona_name,
  age,
  gender,
  position,
  department,
  state,
}) => {
  const persona = {
    persona_name: persona_name,
    age: parseInt(age),
    gender: gender,
    position: position,
    department: department,
    state: state,
  };
  const token = getCookie('csrftoken');

  const res = await axios.post(
    'http://localhost:8000/chatapi/set_persona/',
    persona,
    { withCredentials: true }
  );
  return res.data;
};

/* voice 입력 받고 서버로 보내는 함수*/

export const sendUserVoice = async (id) => {
  const URL = `http://localhost:8000/chatapi/audio_to_text/${id}/`;

  // 오디오 파일 불러오기
  const fileURL = test3;

  try {
    const response = await fetch(fileURL);
    const fileBlob = await response.blob();

    const formData = new FormData();
    formData.append('audio_file', fileBlob, 'audio.mp3');

    const config = {
      withCredentials: true,
    };

    const res = await axios.post(URL, formData, config);

    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

/* text 입력 받고 서버로 보내는 함수 */
export const sendUserText = async (id, text) => {
  const res = await axios.post(
    `http://localhost:8000/chatapi/get_text/${id}/`,
    { text: text },
    { withCredentials: true }
  );

  return res.data;
};

export const requestGetAnswerToGpt = async (id) => {
  const URL = `http://localhost:8000/chatapi/get_ChatGPT_response/${id}/`;

  const headers = {
    'X-CSRFToken': csrftoken,
  };

  const config = {
    withCredentials: true,
    headers: headers,
  };

  try {
    const res = await axios.post(URL, {}, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const requestGenerateVoiceAnswer = () => {
  const res = customAxios.post('chatapi/get_ChatGPT_response/625/', {
    headers: { 'X-CSRFToken': csrftoken },
  });
  return res.data;
};

export const requestGenerateReport = async (id) => {
  const URL = `http://localhost:8000/chatapi/make_report/${id}/`;

  const config = {
    withCredentials: true,
  };

  const res = await axios.post(URL, {}, config);
  return res.data;
};

export const requestSuggestion = async (id) => {
  const URL = `http://localhost:8000/chatapi/make_sample_question/${id}/`;
  const config = {
    withCredentials: true,
  };
  const res = await axios.post(URL, {}, config);
  return res.data;
};
