export const MODES = {
  LOGIN: 'login',
  CREATE: 'create',
  LOGGED_IN: 'loggedIn',
  UPDATE: 'update',
};

export const emptyForm = {
  username: '',
  password: '',
  retype: '',
};

export const initialState = {
  mode: MODES.LOGIN,
  account: null,
  form: { ...emptyForm },
  feedback: null,
};

export function authReducer(state, action) {
  switch (action.type) {
    case 'SET_MODE':
      return {
        ...state,
        mode: action.payload,
        feedback: null,
      };

    case 'SET_ACCOUNT':
      return {
        ...state,
        account: action.payload,
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        mode: MODES.LOGGED_IN,
        form: { ...emptyForm },
        feedback: null,
      };

    case 'UPDATE_FIELD':
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        },
        feedback: null,
      };

    case 'UPDATE_ACCOUNT':
      return {
        ...state,
        account: action.payload.account,
        mode: MODES.LOGIN,
        form: { ...emptyForm },
        feedback: {
          type: action.payload.type,
          message: action.payload.message,
        },
      };

    case 'SET_FEEDBACK':
      return {
        ...state,
        feedback: {
          type: action.payload.type,
          message: action.payload.message,
        },
      };

    case 'RESET_ACCOUNT':
      return {
        ...state,
        account: null,
        mode: MODES.LOGIN,
        form: { ...emptyForm },
        feedback: {
          type: action.payload.type,
          message: action.payload.message,
        },
      };

    default:
      return state;
  }
}
