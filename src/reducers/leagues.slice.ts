import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER_URL } from 'src/config/config';
import { LeagueType } from 'src/models/leagues';
import { getToken } from 'src/utils/utils';

export interface CountriesState {
  loadingGetList: boolean;
  leaguesList: LeagueType[];
}

const initialState: CountriesState = {
  loadingGetList: false,
  leaguesList: []
};

export const getLeaguesAction = createAsyncThunk(
  'leagues/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SERVER_URL}/leagues`, {
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

export const updateLeagueDataAction = createAsyncThunk(
  'leagues/update',
  async (data: LeagueType, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${SERVER_URL}/leagues/${data.id}`,
        data,
        {
          headers: {
            Authorization: getToken()
          }
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const leaguesSlice = createSlice({
  name: 'leagues',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLeaguesAction.pending, (state) => {
      state.loadingGetList = true;
    });
    builder.addCase(getLeaguesAction.fulfilled, (state, { payload }) => {
      state.loadingGetList = false;
      state.leaguesList = payload as LeagueType[];
    });
    builder.addCase(getLeaguesAction.rejected, (state, { error }) => {
      state.loadingGetList = false;
    });
  }
});

export const {} = leaguesSlice.actions;

export default leaguesSlice.reducer;
