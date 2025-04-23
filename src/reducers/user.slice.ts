import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { SERVER_URL } from '../config/config';
import { toastMsg } from 'src/utils/utils';
import { ToastStatus } from 'src/models/basic';

export interface UserState {
  userId: number;
  loadingLogin: boolean;
  token: string;
}

const initialState: UserState = {
  userId: -1,
  loadingLogin: false,
  token: ''
};

export const loginAction = createAsyncThunk(
  'user/login',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post(`${SERVER_URL}/auth/login`, {
      email,
      password
    });

    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.loadingLogin = true;
    });
    builder.addCase(loginAction.fulfilled, (state, { payload }) => {
      const { token, user } = payload;
      state.token = token;
      state.loadingLogin = false;
      state.userId = user;
      toastMsg('Login successfully', ToastStatus.Success);
    });
    builder.addCase(loginAction.rejected, (state, { payload, error }) => {
      state.loadingLogin = false;
      toastMsg('Login failed. Please try again.', ToastStatus.Error);
    });
  }
});

export const {} = userSlice.actions;

export default userSlice.reducer;
