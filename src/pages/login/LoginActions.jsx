import React from 'react';
import Button from '../../shared/button/Button';
import { MODES } from './authReducer';

const LoginActions = ({
  mode,
  account,
  dispatch,
  changeAccountCredentials,
  resetAccount,
  accountLogout,
}) => {
  switch (mode) {
    case MODES.LOGIN:
      return (
        <>
          <Button type="submit" text="Login" size="sm" />

          {!account && (
            <Button
              onClick={changeAccountCredentials}
              text="Create An Account"
              size="sm"
            />
          )}

          {account && (
            <Button onClick={resetAccount} text="Reset Account" size="sm" />
          )}
        </>
      );

    case MODES.CREATE:
      return (
        <>
          <Button type="submit" text="Create Account" size="sm" />

          <Button
            onClick={() =>
              dispatch({
                type: 'SET_MODE',
                payload: MODES.LOGIN,
              })
            }
            text="Back"
            size="sm"
          />
        </>
      );

    case MODES.LOGGED_IN:
      return (
        <>
          <Button onClick={accountLogout} text="Logout" size="sm" />

          <Button
            onClick={() =>
              dispatch({
                type: 'SET_MODE',
                payload: MODES.UPDATE,
              })
            }
            text="Update Account"
            size="sm"
          />
        </>
      );

    case MODES.UPDATE:
      return (
        <>
          <Button type="submit" text="Update" size="sm" />

          <Button
            onClick={() =>
              dispatch({
                type: 'SET_MODE',
                payload: MODES.LOGGED_IN,
              })
            }
            text="Back"
            size="sm"
          />

          <Button onClick={resetAccount} text="Delete Account" size="sm" />
        </>
      );

    default:
      return null;
  }
};

export default LoginActions;
