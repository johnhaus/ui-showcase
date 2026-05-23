import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPostsApi = async ({ page, query, signal, limit = 20 }) => {
  if (!page || page < 1) {
    throw new Error('Page must be greater than 0');
  }

  const response = await axios.get(POSTS_URL, {
    params: {
      _page: page,
      _limit: limit,
      ...(query && { q: query }),
    },
    signal,
  });

  return response.data;
};
