import { customAxios, getCookie } from './Api';
import axios from 'axios';

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
    { withCredentials: true },
    {
      headers: {
        'X-CSRFToken': token,
        Authorization: `Token ${localStorage.getItem('sessionId')}`,
      },
    }
  );
  return res.data;
};

export const sendUserVoice = async (voice) => {
  const header = { headers: { 'Contetn-Type': 'audio/wav' } };
  const res = await customAxios.post('persona/voice/', voice, header);
  return res.data;
};

export const sendUserText = async (text) => {
  const res = await customAxios.post('persona/text/', text, {
    headers: {
      'X-CSRFToken': csrftoken,
    },
  });
  return res.data;
};

export const requestGetAnswerToGpt = () => {
  const res = customAxios.post('chatapi/get_ChatGPT_resopnse/606/', {
    headers: { 'X-CSRFToken': csrftoken },
  });
  return res.data;
};

export const requestGenerateVoiceAnswer = () => {
  const res = customAxios.post('chatapi/get_ChatGPT_resopnse/625/', {
    headers: { 'X-CSRFToken': csrftoken },
  });
  return res.data;
};

export const requestGenerateReport = () => {
  const res = customAxios.post('chatapi/get_ChatGPT_resopnse/606/', {
    headers: { 'X-CSRFToken': csrftoken },
  });
  return res.data;
};
