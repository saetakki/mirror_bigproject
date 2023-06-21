import axios from 'axios';

const { VITE_API_URL } = import.meta.env;

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length == 2) return parts.pop().split(';').shift();
};

const csrftoken = getCookie('csrftoken')

export const customAxios = axios.create({
  baseURL: VITE_API_URL,
});

export const getHistoryPagination = async (page) => {
  const res = await customAxios.get(`api/history/?page=${page}`);
  return res.data;
};

export const getBookMarkPagination = async (page) => {
  const res = await customAxios.get(`api/history/bookmarked/?page=${page}`);
  return res.data;
}

export const requestLogin = async () => {

  const body = {
    username : "a0000",
    password : "tjwnsgh000",
  }
  const res = await customAxios.post('api/login/', body, {headers: {'X-CSRFToken': csrftoken}})
  return res.data
}

export const requestSignIn = async (uid, pw, email, realname) => {
  const res = await axios.post('http://127.0.0.1:8000/api/signup/', {
    username : `${uid}`,
    password : `${pw}`,
    email : `${email}`,
    real_name : `${realname}`,
  })
  return res
}

