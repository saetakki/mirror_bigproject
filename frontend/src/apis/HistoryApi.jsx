import { customAxios } from "./Api";

export const getHistoryItem = async (param) => {
  const res = await customAxios.get(`api/history/${param}/`);
  return res.data;
};