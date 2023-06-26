import axios from 'axios';

const { VITE_API_URL } = import.meta.env;

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length == 2) return parts.pop().split(';').shift();
};

export const customAxios = axios.create({
  baseURL: VITE_API_URL,
});


export const getBookMarkPagination = async (page) => {
  const res = await customAxios.get(`history/bookmarked/?page=${page}`);
  return res.data;
}

export const requestLogin = async (id,pw) => {
  const body = {
    username : id,
    password : pw,
  }
  const res = await customAxios.post('login/', body)
  return res.data
}

export const requestSignIn = async () => {
  const res = await axios.post('http://127.0.0.1:8000/api/signup/', {
    username : "test1234",
    password : "test4567",
    email : "test@test.com",
    real_name : "test1234",
  })
  return res
}

export const requestFixProfile = async () => {

  console.log(VITE_API_URL)
  const header = getCookie('csrftoken')
  const body = {
    realname: "test1234",
    email: "newTest2@test.com",
    password: "test4567",
  }
  const res = await customAxios.post('profile/', body, {headers: {'X-CSRFToken': header}})
  return res
}
