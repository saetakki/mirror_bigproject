import axios from 'axios';

const { VITE_API_URL } = import.meta.env;

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
