import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER_URL } from 'src/config/config';
import { TeamType } from 'src/models/teams';
import { getToken } from 'src/utils/utils';

export interface TeamsState {
  loadingGetList: boolean;
  teamsList: TeamType[];
}

const initialState: TeamsState = {
  loadingGetList: false,
  teamsList: []
};

export const getTeamsAction = createAsyncThunk(
  'teams/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SERVER_URL}/teams`, {
        headers: {
          Authorization: getToken()
        }
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTeamsAction.pending, (state) => {
      state.loadingGetList = true;
    });
    builder.addCase(getTeamsAction.fulfilled, (state, { payload }) => {
      state.loadingGetList = false;
      state.teamsList = payload as TeamType[];
    });
    builder.addCase(getTeamsAction.rejected, (state, { error }) => {
      state.loadingGetList = false;
    });
  }
});

export const {} = teamsSlice.actions;

export default teamsSlice.reducer;
