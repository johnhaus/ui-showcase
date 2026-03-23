export const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_POSTS: 'SET_POSTS',
  SET_HAS_MORE: 'SET_HAS_MORE',
  SET_SEARCH_INPUT: 'SET_SEARCH_INPUT',
  SET_ACTIVE_QUERY: 'SET_ACTIVE_QUERY',
};

export const initialState = {
  posts: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  searchInput: '',
  activeQuery: '',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };

    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload };

    case actionTypes.SET_POSTS:
      return {
        ...state,
        posts:
          state.page === 1
            ? action.payload
            : [...state.posts, ...action.payload],
        page: state.page + 1,
      };

    case actionTypes.SET_HAS_MORE:
      return { ...state, hasMore: action.payload };

    case actionTypes.SET_SEARCH_INPUT:
      return { ...state, searchInput: action.payload };

    case actionTypes.SET_ACTIVE_QUERY:
      return {
        ...state,
        activeQuery: action.payload,
        page: 1,
        posts: [],
        hasMore: true,
        error: null,
      };

    default:
      return state;
  }
};
