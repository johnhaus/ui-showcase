import { useEffect, useState } from 'react';
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
  const [mode, setMode] = useState('login');
  // 'login' | 'create' | 'loggedIn' | 'update'

  const [account, setAccount] = useState(null);
  const [userNameText, setUserNameText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [retypePasswordText, setRetypePasswordText] = useState('');
  const [error, setError] = useState('');

  const isLogin = mode === 'login';
  const isCreate = mode === 'create';
  const isLoggedIn = mode === 'loggedIn';
  const isUpdate = mode === 'update';
  const isAuthenticated = mode === 'loggedIn' || mode === 'update';

  useEffect(() => {
    const stored = localStorage.getItem('account');

    if (stored) {
      setAccount(JSON.parse(stored));
    }
  }, []);

  const clearFields = () => {
    setUserNameText('');
    setPasswordText('');
    setRetypePasswordText('');
  };

  const isValidText = (value) =>
    typeof value === 'string' && /^\S+$/.test(value);

  const accountLogin = () => {
    if (!account) {
      setError('No account found, please create an account');
      return;
    }

    if (
      account.username === userNameText &&
      account.password === passwordText
    ) {
      setMode('loggedIn');
      clearFields();
      setError('');
    } else {
      setError('Invalid credentials, please try again');
    }
  };

  const updateCredentials = () => {
    const username = userNameText.trim();
    const password = passwordText.trim();
    const retype = retypePasswordText.trim();

    if (!isValidText(username)) {
      setError('Invalid username');
      return;
    }

    if (!isValidText(password)) {
      setError('Invalid password');
      return;
    }

    if (password !== retype) {
      setError('Passwords do not match');
      return;
    }
    const newAccount = { username, password };

    localStorage.setItem('account', JSON.stringify(newAccount));
    setAccount(newAccount);

    clearFields();
    setMode('login');
    setError('Changes saved, please log in to continue');
  };

  const changeAccountCredentials = () => {
    const accountExists = !!account;

    if (!isLoggedIn && accountExists) {
      setError(
        'An account already exists, please login or reset your account...'
      );
      return;
    }

    setMode(isLoggedIn ? 'update' : 'create');
    setError('');
  };

  const resetAccount = () => {
    localStorage.removeItem('account');
    setAccount(null);
    setMode('login');
    clearFields();
    setError('Your account has been deleted');
  };

  const accountLogout = () => {
    setMode('login');
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === 'login') {
      accountLogin();
    }

    if (mode === 'create' || mode === 'update') {
      updateCredentials();
    }
  };

  return (
    <Container>
      <StatusContainer>
        {isAuthenticated && account
          ? `Logged in as ${account.username}`
          : 'Logged out'}
      </StatusContainer>

      <LoginContainer>
        <InputWrapper onSubmit={handleSubmit}>
          {!isLoggedIn && (
            <>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                value={userNameText}
                onChange={(e) => {
                  setUserNameText(e.target.value);
                  setError('');
                }}
                placeholder="Enter Username..."
                autoComplete="username"
                required
              />

              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                value={passwordText}
                onChange={(e) => {
                  setPasswordText(e.target.value);
                  setError('');
                }}
                placeholder="Enter Password..."
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                required
              />

              {(isCreate || isUpdate) && (
                <>
                  <Label htmlFor="retypePassword">Retype Password</Label>
                  <Input
                    type="password"
                    id="retypePassword"
                    value={retypePasswordText}
                    onChange={(e) => {
                      setRetypePasswordText(e.target.value);
                      setError('');
                    }}
                    placeholder="Retype Password..."
                    autoComplete="new-password"
                    required
                  />
                </>
              )}
              {error && <ErrorContainer>{error}</ErrorContainer>}
            </>
          )}

          {isLogin && (
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

          {isCreate && (
            <ButtonColumn>
              <Button type="submit" text="Create Account" size="sm" />
              <Button onClick={() => setMode('login')} text="Back" size="sm" />
            </ButtonColumn>
          )}

          {isLoggedIn && (
            <ButtonColumn>
              <Button onClick={accountLogout} text="Logout" size="sm" />
              <Button
                onClick={() => setMode('update')}
                text="Update Account"
                size="sm"
              />
            </ButtonColumn>
          )}

          {isUpdate && (
            <ButtonColumn>
              <Button type="submit" text="Update" size="sm" />

              <Button
                onClick={() => setMode('loggedIn')}
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
