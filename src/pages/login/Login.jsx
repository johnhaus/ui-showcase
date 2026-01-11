import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../shared/Button/Button';

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
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  box-shadow: 0 0px 12px ${({ theme }) => theme.colors.white};
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
  color: ${({ theme }) => theme.colors.red};
`;

const InputWrapper = styled.div`
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
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  font-size: 16px;

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.black};
  }
`;

const ButtonColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  gap: 12px;
`;

const Login = () => {
  const [userNameText, setUserNameText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [retypePasswordText, setRetypePasswordText] = useState('');
  const [changeCredentials, setChangeCredentials] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const clearFields = () => {
    setUserNameText('');
    setPasswordText('');
    setRetypePasswordText('');
  };

  const clearError = () => {
    setError('');
  };

  const accountLogin = () => {
    const userName = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    if (userName === userNameText && password === passwordText) {
      setLoggedIn(true);
      clearFields();
      clearError();
    } else {
      setError('Invalid credentials, please try again');
    }
  };

  const isValidText = (value) =>
    typeof value === 'string' && /^\S+$/.test(value);

  const updateCredentials = () => {
    const username = userNameText?.trim();
    const password = passwordText?.trim();
    const retype = retypePasswordText?.trim();

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
    localStorage.setItem('username', userNameText);
    localStorage.setItem('password', passwordText);
    clearFields();
    goBack();
    accountLogout();
    clearError();
    setError('Changes saved, please log in to continue');
  };

  const goBack = () => {
    clearError();
    setChangeCredentials(false);
    clearFields();
  };

  const changeAccountCredentials = () => {
    clearError();
    const userName = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    !loggedIn && (userName || password)
      ? setError(
          'An account already exists, please login or reset your account'
        )
      : setChangeCredentials(true);
  };

  const resetAccount = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    setLoggedIn(false);
    setError('Your account has been deleted');
    setChangeCredentials(false);
    clearFields();
  };

  const accountLogout = () => {
    clearError();
    setLoggedIn(false);
  };

  return (
    <Container>
      <StatusContainer>{loggedIn ? 'Logged in' : 'Logged out'}</StatusContainer>
      <LoginContainer>
        <InputWrapper>
          {(!loggedIn || changeCredentials) && (
            <>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                value={userNameText}
                onChange={(e) => setUserNameText(e.target.value)}
                placeholder="Enter Username..."
              />
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                value={passwordText}
                onChange={(e) => setPasswordText(e.target.value)}
                placeholder="Enter Password..."
              />
              {changeCredentials && (
                <>
                  <Label htmlFor="retype password">Retype Password</Label>
                  <Input
                    type="password"
                    id="retypePassword"
                    value={retypePasswordText}
                    onChange={(e) => setRetypePasswordText(e.target.value)}
                    placeholder="Retype Password..."
                  />
                </>
              )}
              {error && <ErrorContainer>{error}</ErrorContainer>}
            </>
          )}

          {loggedIn && changeCredentials && (
            <ButtonColumn>
              <Button
                onClick={() => updateCredentials()}
                text="Update"
                size="sm"
              />
              <Button onClick={() => goBack()} text="Back" size="sm" />
              <Button
                onClick={() => resetAccount()}
                text="Delete Account"
                size="sm"
              />
            </ButtonColumn>
          )}

          {!loggedIn && !changeCredentials && (
            <ButtonColumn>
              <Button onClick={() => accountLogin()} text="Login" size="sm" />
              <Button
                onClick={() => changeAccountCredentials()}
                text="Create An Account"
                size="sm"
              />
              <Button
                onClick={() => resetAccount()}
                text="Reset Account"
                size="sm"
              />
            </ButtonColumn>
          )}

          {!loggedIn && changeCredentials && (
            <ButtonColumn>
              <Button
                onClick={() => updateCredentials()}
                text="Create Account"
                size="sm"
              />
              <Button onClick={() => goBack()} text="Back" size="sm" />
            </ButtonColumn>
          )}

          {loggedIn && !changeCredentials && (
            <ButtonColumn>
              <Button onClick={() => accountLogout()} text="Logout" size="sm" />
              <Button
                onClick={() => changeAccountCredentials()}
                text="Update Account"
                size="sm"
              />
            </ButtonColumn>
          )}
        </InputWrapper>
      </LoginContainer>
    </Container>
  );
};

export default Login;
