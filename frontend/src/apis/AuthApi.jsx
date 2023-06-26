import { customAxios, getCookie } from "./Api";

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
    const res = await customAxios.post("logout/", {headers: {'X-CSRFToken': csrftoken}});
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
    const body = {
      username: username,
      email: email
    };
    const res = await customAxios.post("find_password/", body);
    return res.data;
  }
