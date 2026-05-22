import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPostsApi = async ({ page, query, signal, limit = 20 }) => {
  const params = new URLSearchParams({
    _page: page,
    _limit: limit,
  });

  if (query) {
    params.append('q', query);
  }

  const response = await axios.get(`${POSTS_URL}?${params.toString()}`, {
    signal,
  });

  return response.data;
};
