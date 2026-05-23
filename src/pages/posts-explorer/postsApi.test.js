import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { fetchPostsApi } from './postsApi';

vi.mock('axios');

describe('fetchPostsApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches posts with default limit and returns data', async () => {
    const mockData = [
      {
        id: 1,
        title: 'Test',
      },
    ];

    axios.get.mockResolvedValue({
      data: mockData,
    });

    const result = await fetchPostsApi({
      page: 1,
    });

    expect(axios.get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts',
      {
        params: {
          _page: 1,
          _limit: 20,
        },
        signal: undefined,
      }
    );

    expect(result).toEqual(mockData);
  });

  it('includes search query when provided', async () => {
    axios.get.mockResolvedValue({
      data: [],
    });

    await fetchPostsApi({
      page: 2,
      query: 'react hooks',
    });

    expect(axios.get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts',
      {
        params: {
          _page: 2,
          _limit: 20,
          q: 'react hooks',
        },
        signal: undefined,
      }
    );
  });

  it('uses custom limit when provided', async () => {
    axios.get.mockResolvedValue({
      data: [],
    });

    await fetchPostsApi({
      page: 3,
      limit: 5,
    });

    expect(axios.get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts',
      {
        params: {
          _page: 3,
          _limit: 5,
        },
        signal: undefined,
      }
    );
  });

  it('passes abort signal to axios', async () => {
    axios.get.mockResolvedValue({
      data: [],
    });

    const controller = new AbortController();

    await fetchPostsApi({
      page: 1,
      signal: controller.signal,
    });

    expect(axios.get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts',
      {
        params: {
          _page: 1,
          _limit: 20,
        },
        signal: controller.signal,
      }
    );
  });

  it('throws axios errors', async () => {
    const error = new Error('Network Error');

    axios.get.mockRejectedValue(error);

    await expect(
      fetchPostsApi({
        page: 1,
      })
    ).rejects.toThrow('Network Error');
  });

  it('throws an error when page is less than 1', async () => {
    await expect(
      fetchPostsApi({
        page: 0,
      })
    ).rejects.toThrow('Page must be greater than 0');

    expect(axios.get).not.toHaveBeenCalled();
  });
});
