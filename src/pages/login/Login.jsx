import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../shared/Button/Button';
import { useLogin, useSession, useCredentials, useSetupMode } from './loginUtils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
`;

const Card = styled.div`
  width: 90%;
  max-width: 600px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  box-shadow: 0 0px 12px ${({ theme }) => theme.colors.white};
  margin-bottom: 24px;
`;

const StatusContainer = styled(Card)`
  height: 40px;
  margin-top: 24px;
`;

const LoginContainer = styled(Card)``;

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

const Login = () => {
  const { loggedIn, setLoggedIn } = useSession();
  const { error, handleLogin } = useLogin();
  const { setCredentials, removeCredentials } = useCredentials();
  const { setupMode, setSetupMode } = useSetupMode();
  const [userNameText, setUserNameText] = useState('');
  const [passwordText, setPasswordText] = useState('');

  const handleLogout = () => {
    removeCredentials();
    setLoggedIn(false);
  };

  const resetPassword = () => {
    removeCredentials();
    setLoggedIn(false);
    setSetupMode(true);
  };

  const handleSetCredentials = () => {
    setCredentials(userNameText, passwordText);
    setLoggedIn(true);
    setSetupMode(false);
  };

  return (
    <Container>
      <StatusContainer>
        {loggedIn ? 'Logged in' : 'Logged out'}
      </StatusContainer>
      <LoginContainer>
        <InputWrapper>
          {!loggedIn && (
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
              {error && <div style={{ color: 'red' }}>{error}</div>}
            </>
          )}

          {loggedIn ? (
            <>
              <Button onClick={handleLogout} text="Logout" />
              <Button onClick={resetPassword} text="Reset Password" />
            </>
          ) : (
            <>
              {!setupMode ? (
                <>
                  <Button onClick={() => handleLogin(userNameText, passwordText, setLoggedIn)} text="Login" />
                  <Button onClick={() => setSetupMode(true)} text="Create Account" />
                  <Button onClick={resetPassword} text="Reset Password" />
                </>
              ) : (
                <>
                  <Button onClick={handleSetCredentials} text="Create Account" />
                  <Button onClick={() => setSetupMode(false)} text="Back" />
                </>
              )}
            </>
          )}
        </InputWrapper>
      </LoginContainer>
    </Container>
  );
};

export default Login;
