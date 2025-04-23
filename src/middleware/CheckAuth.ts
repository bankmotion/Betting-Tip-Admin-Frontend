import { Middleware } from '@reduxjs/toolkit';
import { ToastStatus } from 'src/models/basic';
import { toastMsg } from 'src/utils/utils';

interface Action<T = any> {
  type: string;
  payload?: T;
  meta?: any;
  error?: boolean;
}

export const checkAuthMiddleware: Middleware =
  (store) => (next) => (action: Action) => {
    const result = next(action);

    if (
      action.payload &&
      (action.payload.status === 401 || action.payload.status === 403)
    ) {
      toastMsg('Please try logging in again.', ToastStatus.Info);
      window.location.href = '/login';
    }

    return result;
  };
