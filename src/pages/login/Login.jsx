import { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import Button from '../../shared/button/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
`;

const LoginContainer = styled.div`
  width: 90%;
  max-width: 600px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background.surface};
  color: ${({ theme }) => theme.colors.text.onSurface};
  box-shadow: 0 0px 12px ${({ theme }) => theme.colors.emphasis.high};
  margin-bottom: 24px;
`;

const StatusContainer = styled(LoginContainer)`
  height: 40px;
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorContainer = styled.div`
  color: ${({ theme }) => theme.colors.intent.destructive};
`;

const InputWrapper = styled.form`
  padding: 20px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: none;
  font-size: 16px;

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.focus.ring};
  }
`;

const ButtonColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  gap: 12px;
`;

const MODES = {
  LOGIN: 'login',
  CREATE: 'create',
  LOGGED_IN: 'loggedIn',
  UPDATE: 'update',
};

const emptyForm = {
  username: '',
  password: '',
  retype: '',
};

const initialState = {
  mode: MODES.LOGIN,
  account: null,
  form: { ...emptyForm },
  error: '',
};

function authReducer(state, action) {
  switch (action.type) {
    case 'SET_MODE':
      return {
        ...state,
        mode: action.payload,
        error: '',
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
        error: '',
      };

    case 'UPDATE_FIELD':
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        },
        error: '',
      };

    case 'UPDATE_ACCOUNT':
      return {
        ...state,
        account: action.payload,
        mode: MODES.LOGIN,
        form: { ...emptyForm },
        error: 'Changes saved, please log in to continue',
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'CLEAR_FORM':
      return {
        ...state,
        form: { ...emptyForm },
      };

    case 'RESET_ACCOUNT':
      return {
        ...state,
        account: null,
        mode: MODES.LOGIN,
        form: { ...emptyForm },
        error: 'Your account has been deleted',
      };

    default:
      return state;
  }
}

/**
 * ⚠️ DEMO-ONLY AUTHENTICATION
 *
 * This component intentionally stores credentials in localStorage
 * for demonstration purposes only.
 *
 * This is NOT secure:
 * - Passwords are stored in plain text
 * - localStorage is accessible via JavaScript (XSS risk)
 * - There is no hashing, encryption, or backend validation
 *
 * In a real application:
 * - Authentication must be handled server-side
 * - Passwords should be hashed and never stored in the browser
 * - Use secure HTTP-only cookies or proper token handling
 */

const Login = () => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { mode, account, form, error } = state;

  useEffect(() => {
    const stored = localStorage.getItem('account');
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      dispatch({ type: 'SET_ACCOUNT', payload: parsed });
    } catch {
      localStorage.removeItem('account');
    }
  }, []);

  const isValidText = (value) =>
    typeof value === 'string' && /^\S+$/.test(value);

  const accountLogin = () => {
    if (!account) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'No account found, please create an account',
      });
      return;
    }

    if (
      account.username === form.username &&
      account.password === form.password
    ) {
      dispatch({ type: 'LOGIN_SUCCESS' });
    } else {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Invalid credentials, please try again',
      });
    }
  };

  const updateCredentials = () => {
    const username = form.username.trim();
    const password = form.password.trim();
    const retype = form.retype.trim();

    if (!isValidText(username)) {
      dispatch({ type: 'SET_ERROR', payload: 'Invalid username' });
      return;
    }

    if (!isValidText(password)) {
      dispatch({ type: 'SET_ERROR', payload: 'Invalid password' });
      return;
    }

    if (password !== retype) {
      dispatch({ type: 'SET_ERROR', payload: 'Passwords do not match' });
      return;
    }
    const newAccount = { username, password };

    localStorage.setItem('account', JSON.stringify(newAccount));
    dispatch({ type: 'UPDATE_ACCOUNT', payload: newAccount });
  };

  const changeAccountCredentials = () => {
    if (mode !== MODES.LOGGED_IN && account) {
      dispatch({
        type: 'SET_ERROR',
        payload:
          'An account already exists, please login or reset your account...',
      });
      return;
    }

    dispatch({
      type: 'SET_MODE',
      payload: mode === MODES.LOGGED_IN ? MODES.UPDATE : MODES.CREATE,
    });
  };

  const resetAccount = () => {
    localStorage.removeItem('account');
    dispatch({ type: 'RESET_ACCOUNT' });
  };

  const accountLogout = () => {
    dispatch({ type: 'SET_MODE', payload: MODES.LOGIN });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    switch (mode) {
      case MODES.LOGIN:
        return accountLogin();
      case MODES.CREATE:
      case MODES.UPDATE:
        return updateCredentials();
    }
  };

  return (
    <Container>
      <StatusContainer>
        {(mode === MODES.LOGGED_IN || mode === MODES.UPDATE) && account
          ? `Logged in as ${account.username}`
          : 'Logged out'}
      </StatusContainer>

      <LoginContainer>
        <InputWrapper onSubmit={handleSubmit}>
          {mode !== MODES.LOGGED_IN && (
            <>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                value={form.username}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_FIELD',
                    field: 'username',
                    value: e.target.value,
                  })
                }
                placeholder="Enter Username..."
                autoComplete="username"
                required
              />

              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                value={form.password}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_FIELD',
                    field: 'password',
                    value: e.target.value,
                  })
                }
                placeholder="Enter Password..."
                autoComplete={
                  mode === MODES.LOGIN ? 'current-password' : 'new-password'
                }
                required
              />

              {(mode === MODES.CREATE || mode === MODES.UPDATE) && (
                <>
                  <Label htmlFor="retypePassword">Retype Password</Label>
                  <Input
                    type="password"
                    id="retypePassword"
                    value={form.retype}
                    onChange={(e) =>
                      dispatch({
                        type: 'UPDATE_FIELD',
                        field: 'retype',
                        value: e.target.value,
                      })
                    }
                    placeholder="Retype Password..."
                    autoComplete="new-password"
                    required
                  />
                </>
              )}
              {error && <ErrorContainer>{error}</ErrorContainer>}
            </>
          )}

          {mode === MODES.LOGIN && (
            <ButtonColumn>
              <Button type="submit" text="Login" size="sm" />
              <Button
                onClick={changeAccountCredentials}
                text="Create An Account"
                size="sm"
              />
              {account && (
                <Button onClick={resetAccount} text="Reset Account" size="sm" />
              )}
            </ButtonColumn>
          )}

          {mode === MODES.CREATE && (
            <ButtonColumn>
              <Button type="submit" text="Create Account" size="sm" />
              <Button
                onClick={() =>
                  dispatch({ type: 'SET_MODE', payload: MODES.LOGIN })
                }
                text="Back"
                size="sm"
              />
            </ButtonColumn>
          )}

          {mode === MODES.LOGGED_IN && (
            <ButtonColumn>
              <Button onClick={accountLogout} text="Logout" size="sm" />
              <Button
                onClick={() =>
                  dispatch({ type: 'SET_MODE', payload: MODES.UPDATE })
                }
                text="Update Account"
                size="sm"
              />
            </ButtonColumn>
          )}

          {mode === MODES.UPDATE && (
            <ButtonColumn>
              <Button type="submit" text="Update" size="sm" />

              <Button
                onClick={() =>
                  dispatch({ type: 'SET_MODE', payload: MODES.LOGGED_IN })
                }
                text="Back"
                size="sm"
              />
              <Button onClick={resetAccount} text="Delete Account" size="sm" />
            </ButtonColumn>
          )}
        </InputWrapper>
      </LoginContainer>
    </Container>
  );
};

export default Login;
