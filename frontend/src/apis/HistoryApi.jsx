import { customAxios, getCookie } from './Api';

const csrftoken = getCookie('csrftoken');

export const requestPages = async (isHistory = true, pageNum) => {
  const URL = isHistory
    ? `history/?page=${pageNum}`
    : `history/bookmarked/?page=${pageNum}`;
  const res = await customAxios.get(URL, {
    headers: {
      'X-CSRFToken': csrftoken,
    },
  });
  return res.data;
};

export const requestDeleteHistory = async (historyId) => {
  const res = await customAxios.delete(`history/${historyId}/`, {
    headers: { 'X-CSRFToken': csrftoken },
  });
  return res.data;
};

export const requestHistoryLog = async (historyId) => {
  const res = await customAxios.get(`history/${historyId}/`, {
    headers: { 'X-CSRFToken': csrftoken },
  });
  return res.data;
};

export const requestBookmark = async (historyId) => {
  const res = await customAxios.post(`history/${historyId}/bookmark/`, {
    headers: { 'X-CSRFToken': csrftoken },
  });
  return res.data;
};

// export const getHistoryPagination = async (page) => {
//   const res = await customAxios.get(`history/?page=${page}`);
//   return res.data;
// };

// export const getBookmarkHistoryPagination = async (param) => {
//   const res = await customAxios.get(`history/${param}/`);
//   return res.data;
// };
