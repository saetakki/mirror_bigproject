import { customAxios, getCookie } from "./Api";

const csrftoken = getCookie('csrftoken')


export const requestGetUserProfile = async () => {
  const res = await customAxios.get('profile/')
  return res.data
}

export const requestDeleteProfile = async () => {
  const res = await customAxios.delete('profile/')
  return res.data
}

export const requestEditProfile = async (data) => {
  const {real_name, email, password } = data
  const res = await customAxios.post('profile/', {real_name, email, password}, {headers: {'X-CSRFToken': csrftoken}})
  return res.data
}

export const requestEditProfileImage = async (data) => {
  const res = await customAxios.post('profile/', data, {headers: {'X-CSRFToken': csrftoken}})
  return res.data
}
