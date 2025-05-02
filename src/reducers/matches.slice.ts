import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER_URL } from 'src/config/config';
import { MatchType } from 'src/models/matches';
import { OddsType } from 'src/models/odds';
import { getToken } from 'src/utils/utils';

export interface MatchesState {
  loadingGetList: boolean;
  matchesList: MatchType[];
  oddsList: OddsType[];
}

const initialState: MatchesState = {
  loadingGetList: false,
  matchesList: [],
  oddsList: []
};

export const getMatchesAction = createAsyncThunk(
  'matches/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SERVER_URL}/matches`, {
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

export const getMatchesByOddStatusAction = createAsyncThunk(
  'matches/getByOddStatus',
  async ({ tipValid }: { tipValid: boolean }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SERVER_URL}/matches/odd-status`, {
        headers: {
          Authorization: getToken()
        },
        params: {
          tipValid
        }
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateMatchDataAction = createAsyncThunk(
  'matches/update',
  async (data: MatchType, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${SERVER_URL}/matches/${data.id}`,
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

export const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMatchesAction.pending, (state) => {
      state.loadingGetList = true;
    });
    builder.addCase(getMatchesAction.fulfilled, (state, { payload }) => {
      state.loadingGetList = false;
      state.matchesList = payload as MatchType[];
    });
    builder.addCase(getMatchesAction.rejected, (state, { error }) => {
      state.loadingGetList = false;
    });

    builder.addCase(getMatchesByOddStatusAction.pending, (state) => {
      state.loadingGetList = true;
    });
    builder.addCase(
      getMatchesByOddStatusAction.fulfilled,
      (state, { payload }) => {
        state.loadingGetList = false;
        state.oddsList = payload.odds as OddsType[];
        state.matchesList = payload.matches as MatchType[];
      }
    );
    builder.addCase(
      getMatchesByOddStatusAction.rejected,
      (state, { error }) => {
        state.loadingGetList = false;
      }
    );
  }
});

export const {} = matchesSlice.actions;

export default matchesSlice.reducer;
