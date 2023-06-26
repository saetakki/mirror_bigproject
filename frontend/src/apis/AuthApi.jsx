import { customAxios, getCookie } from "./Api";
import axios from "axios";
import logo from '../assets/logo.png'

const csrftoken = getCookie('csrftoken')

const requestSignUp = async ({ username, password, email, real_name }) => {
  const body = {
    username: username,
    password: password,
    email: email,
    real_name: real_name
  };

  const res = await customAxios.post("/signup/", body);
  return res.data;
  }

const requestLogIn = async ({ username, password }) => {
  const body = {
    username: username,
    password: password
  };
  const res = await customAxios.post("login/", body);
  return res.data;
  }

  const requestLogOut = async () => {
    const header = getCookie('csrftoken')
    const res = await customAxios.post("logout/", {headers: {'X-CSRFToken': header}});
    return res.data;
  }

  const requestFindId = async ({ email,password }) => {
    const body = {
      email: email,
      password: password
    };
    const res = await customAxios.post("find_id/", body);
    return res.data;
  }

  const requestFindPassword = async ({ username, email }) => {






// export const getProfile = async () => {
//   const res = await customAxios.get("/api/profile/");
//   return res.data;
// }


// export const getUserInfo = async () => {
//   const res = await customAxios.get("/api/profile/");
//   return res.data;
// }



// export const changeProfileInfo = async ({name, email, password}) => {

//   const data = {
//     real_name: name,
//     email: email,
//     password: password
//   }
//   const res = await customAxios.post("/api/profile/", data, {Header: {'Authorization': csrftoken}});
//   return res.data;
// }

// export const changeProfileImg = async () => {
//   const body = logo
//   const res = await customAxios.post("/api/profile/", body);
//   return res.data;
// }


// export const signUp = async ({ username, password, email, real_name }) => {
//   const csrftoken = getCookie('csrftoken'); // CSRF 토큰 가져오기

//   const body = {
//     username: username,
//     password: password,
//     email: email,
//     real_name: real_name
//   };

//   try {
//     const res = await axios.post('/api/signup/', body, {
//       headers: {
//         'X-CSRFToken': csrftoken, // CSRF 토큰 헤더에 포함
//         'Content-Type': 'application/json'
//       }
//     });
//     return res.data;
//   } catch (error) {
//     // 오류 처리 로직 추가
//     console.error('가입 실패:', error.response.data.error);
//     throw error;
//   }
// };




// export const signOut = async () => {

//   const header = {
//     'X-CSRFToken': csrftoken
//   }

//   const body = {
//     username : "a0000",
//     password : "tjwnsgh000",
//   }
//   const res = await customAxios.post(
//     "/api/logout/", 
//     body, 
//     header);
//   return res.data;
// }