import { useState, useEffect } from 'react';

export const useLogin = () => {
  const [error, setError] = useState('');

  const handleLogin = (userNameText, passwordText, setLoggedIn) => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (!userNameText || !passwordText) {
      setError('Please enter both username and password.');
      return;
    }

    if (!storedUsername || !storedPassword) {
      setError('No credentials found in localStorage.');
      return;
    }

    if (userNameText === storedUsername && passwordText === storedPassword) {
      setError('');
      setLoggedIn(true);
    } else {
      setError('Incorrect username or password.');
    }
  };

  return {
    error,
    handleLogin,
  };
};

export const useCredentials = () => {
  const setCredentials = (userNameText, passwordText) => {
    localStorage.setItem('username', userNameText);
    localStorage.setItem('password', passwordText);
  };

  const removeCredentials = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  };

  return {
    setCredentials,
    removeCredentials,
  };
};

export const useSession = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    if (storedUsername && storedPassword) {
      setLoggedIn(true);
    }
  }, []);

  return {
    loggedIn,
    setLoggedIn,
  };
};

export const useSetupMode = () => {
  const [setupMode, setSetupMode] = useState(false);

  return {
    setupMode,
    setSetupMode,
  };
};
