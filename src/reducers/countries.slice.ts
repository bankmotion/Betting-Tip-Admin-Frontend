import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER_URL } from 'src/config/config';
import { CountryType } from 'src/models/countries';
import { getToken } from 'src/utils/utils';

export interface CountriesState {
  loadingGetList: boolean;
  countriesList: CountryType[];
}

const initialState: CountriesState = {
  loadingGetList: false,
  countriesList: []
};

export const getCountriesAction = createAsyncThunk(
  'countries/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SERVER_URL}/countries`, {
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

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCountriesAction.pending, (state) => {
      state.loadingGetList = true;
    });
    builder.addCase(getCountriesAction.fulfilled, (state, { payload }) => {
      state.loadingGetList = false;
      state.countriesList = payload as CountryType[];
    });
    builder.addCase(getCountriesAction.rejected, (state, { error }) => {
      state.loadingGetList = false;
    });
  }
});

export const {} = countriesSlice.actions;

export default countriesSlice.reducer;
