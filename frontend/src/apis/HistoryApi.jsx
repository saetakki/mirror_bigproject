import { customAxios } from "./Api";

export const getHistoryPagination = async (page) => {
  const res = await customAxios.get(`history/?page=${page}`);
  return res.data;
};

export const getHistoryItem = async (param) => {
  const res = await customAxios.get(`history/${param}/`);
  return res.data;
};