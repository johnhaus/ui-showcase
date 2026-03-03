import { describe, it, expect } from 'vitest';
import { authReducer, initialState, MODES, emptyForm } from './authReducer';

describe('authReducer', () => {
  describe('SET_MODE', () => {
    it('updates mode and clears feedback', () => {
      const state = {
        ...initialState,
        feedback: { type: 'error', message: 'oops' },
      };

      const result = authReducer(state, {
        type: 'SET_MODE',
        payload: MODES.CREATE,
      });

      expect(result.mode).toBe(MODES.CREATE);
      expect(result.feedback).toBeNull();
    });

    it('does not mutate original state', () => {
      const state = { ...initialState };
      const result = authReducer(state, {
        type: 'SET_MODE',
        payload: MODES.UPDATE,
      });

      expect(result).not.toBe(state);
    });
  });

  describe('SET_ACCOUNT', () => {
    it('sets account correctly', () => {
      const account = { username: 'test', password: '123' };

      const result = authReducer(initialState, {
        type: 'SET_ACCOUNT',
        payload: account,
      });

      expect(result.account).toEqual(account);
    });
  });

  describe('LOGIN_SUCCESS', () => {
    it('sets mode to LOGGED_IN', () => {
      const state = {
        ...initialState,
        form: {
          username: 'user',
          password: 'pass',
          retype: 'pass',
        },
      };

      const result = authReducer(state, { type: 'LOGIN_SUCCESS' });

      expect(result.mode).toBe(MODES.LOGGED_IN);
    });

    it('resets form to emptyForm', () => {
      const state = {
        ...initialState,
        form: {
          username: 'user',
          password: 'pass',
          retype: 'pass',
        },
      };

      const result = authReducer(state, { type: 'LOGIN_SUCCESS' });

      expect(result.form).toEqual(emptyForm);
      expect(result.form).not.toBe(emptyForm);
    });

    it('clears feedback', () => {
      const state = {
        ...initialState,
        feedback: { type: 'error', message: 'bad input' },
      };

      const result = authReducer(state, { type: 'LOGIN_SUCCESS' });

      expect(result.feedback).toBeNull();
    });
  });

  describe('UPDATE_FIELD', () => {
    it('updates only the specified field', () => {
      const result = authReducer(initialState, {
        type: 'UPDATE_FIELD',
        field: 'username',
        value: 'newUser',
      });

      expect(result.form.username).toBe('newUser');
      expect(result.form.password).toBe('');
      expect(result.form.retype).toBe('');
    });

    it('clears feedback when field updates', () => {
      const state = {
        ...initialState,
        feedback: { type: 'error', message: 'bad input' },
      };

      const result = authReducer(state, {
        type: 'UPDATE_FIELD',
        field: 'password',
        value: '123',
      });

      expect(result.feedback).toBeNull();
    });

    it('does not mutate previous form object', () => {
      const state = { ...initialState };
      const result = authReducer(state, {
        type: 'UPDATE_FIELD',
        field: 'username',
        value: 'test',
      });

      expect(result.form).not.toBe(state.form);
    });
  });

  describe('UPDATE_ACCOUNT', () => {
    it('updates account and resets mode to LOGIN', () => {
      const account = { username: 'new', password: 'pass' };

      const result = authReducer(initialState, {
        type: 'UPDATE_ACCOUNT',
        payload: {
          account,
          type: 'success',
          message: 'Updated',
        },
      });

      expect(result.account).toEqual(account);
      expect(result.mode).toBe(MODES.LOGIN);
    });

    it('resets form to emptyForm', () => {
      const state = {
        ...initialState,
        form: {
          username: 'abc',
          password: '123',
          retype: '123',
        },
      };

      const result = authReducer(state, {
        type: 'UPDATE_ACCOUNT',
        payload: {
          account: { username: 'new', password: 'pass' },
          type: 'success',
          message: 'Updated',
        },
      });

      expect(result.form).toEqual(emptyForm);
    });

    it('sets feedback correctly', () => {
      const result = authReducer(initialState, {
        type: 'UPDATE_ACCOUNT',
        payload: {
          account: { username: 'new', password: 'pass' },
          type: 'success',
          message: 'Saved',
        },
      });

      expect(result.feedback).toEqual({
        type: 'success',
        message: 'Saved',
      });
    });
  });

  describe('SET_FEEDBACK', () => {
    it('sets feedback object', () => {
      const result = authReducer(initialState, {
        type: 'SET_FEEDBACK',
        payload: { type: 'error', message: 'Invalid' },
      });

      expect(result.feedback).toEqual({
        type: 'error',
        message: 'Invalid',
      });
    });
  });

  describe('RESET_ACCOUNT', () => {
    it('clears account and sets mode to LOGIN', () => {
      const state = {
        ...initialState,
        account: { username: 'user', password: '123' },
      };

      const result = authReducer(state, {
        type: 'RESET_ACCOUNT',
        payload: {
          type: 'success',
          message: 'Deleted',
        },
      });

      expect(result.account).toBeNull();
      expect(result.mode).toBe(MODES.LOGIN);
    });

    it('resets form', () => {
      const state = {
        ...initialState,
        form: {
          username: 'x',
          password: 'y',
          retype: 'y',
        },
      };

      const result = authReducer(state, {
        type: 'RESET_ACCOUNT',
        payload: {
          type: 'success',
          message: 'Deleted',
        },
      });

      expect(result.form).toEqual(emptyForm);
    });

    it('sets feedback correctly', () => {
      const result = authReducer(initialState, {
        type: 'RESET_ACCOUNT',
        payload: {
          type: 'success',
          message: 'Deleted',
        },
      });

      expect(result.feedback).toEqual({
        type: 'success',
        message: 'Deleted',
      });
    });
  });

  describe('default case', () => {
    it('returns the same state for unknown action type', () => {
      const state = { ...initialState };

      const result = authReducer(state, {
        type: 'UNKNOWN_ACTION',
      });

      expect(result).toBe(state);
    });
  });
});
