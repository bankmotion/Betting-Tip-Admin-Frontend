import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { SERVER_URL } from '../config/config';
import { AllergenType } from 'src/models/allergen';
import { getToken, toastMsg } from 'src/utils/utils';
import { ToastStatus } from 'src/models/basic';

export interface AllergenesState {
  loadingCreate: boolean;
  allergenesList: AllergenType[];
  loadingGetList: boolean;
}

const initialState: AllergenesState = {
  loadingCreate: false,
  allergenesList: [],
  loadingGetList: false
};

export const createAllergenesAction = createAsyncThunk(
  'allergenes/create',
  async (
    { name, logo, sortingNr }: { name: string; logo: File; sortingNr: number },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('logo', logo);
      formData.append('sortingNr', sortingNr.toString());

      const response = await axios.post(`${SERVER_URL}/allergenes`, formData, {
        headers: {
          'Content-Type': '/multipart/form-data',
          Authorization: getToken()
        }
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateAllergenseAction = createAsyncThunk(
  'allergenes/update',
  async (
    {
      id,
      name,
      logo,
      sortingNr
    }: { id: number; name: string; logo: File; sortingNr: number },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append('id', id.toString());
      formData.append('name', name);
      formData.append('logo', logo);
      formData.append('sortingNr', sortingNr.toString());

      const response = await axios.put(`${SERVER_URL}/allergenes`, formData, {
        headers: {
          'Content-Type': '/multipart/form-data',
          Authorization: getToken()
        }
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteAllergenseAction = createAsyncThunk(
  'allergenes/delete',
  async ({ id }: { id: number }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${SERVER_URL}/allergenes/${id}`, {
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

export const getAllergenesAction = createAsyncThunk(
  'allergenes/getList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SERVER_URL}/allergenes`, {
        headers: {
          Authorization: getToken()
        }
      });

      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const allergenesSlice = createSlice({
  name: 'allergenes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createAllergenesAction.pending, (state) => {
      state.loadingCreate = true;
    });
    builder.addCase(createAllergenesAction.fulfilled, (state, { payload }) => {
      toastMsg('Successfully created', ToastStatus.Success);
      state.loadingCreate = false;
    });
    builder.addCase(createAllergenesAction.rejected, (state, { error }) => {
      toastMsg(
        'An error occurred while creating new allergen.',
        ToastStatus.Error
      );
      state.loadingCreate = false;
    });

    builder.addCase(updateAllergenseAction.pending, (state) => {
      state.loadingCreate = true;
    });
    builder.addCase(updateAllergenseAction.fulfilled, (state, { payload }) => {
      state.loadingCreate = false;
      toastMsg('Successfully updated', ToastStatus.Success);
    });
    builder.addCase(updateAllergenseAction.rejected, (state, { error }) => {
      state.loadingCreate = false;
      toastMsg('An error occurred while updating allergen.', ToastStatus.Error);
    });

    builder.addCase(getAllergenesAction.pending, (state) => {
      state.loadingGetList = true;
    });
    builder.addCase(getAllergenesAction.fulfilled, (state, { payload }) => {
      state.loadingGetList = false;
      state.allergenesList = payload;
    });
    builder.addCase(getAllergenesAction.rejected, (state, { error }) => {
      state.loadingGetList = false;
      toastMsg(
        'An error occurred while trying to retrieve the allergen list.',
        ToastStatus.Error
      );
    });

    builder.addCase(deleteAllergenseAction.pending, (state) => {
      state.loadingCreate = true;
    });
    builder.addCase(deleteAllergenseAction.fulfilled, (state, { payload }) => {
      state.loadingCreate = false;
      toastMsg('Successfully removed', ToastStatus.Success);
    });
    builder.addCase(deleteAllergenseAction.rejected, (state, { error }) => {
      state.loadingCreate = false;
      toastMsg('An error occurred while removing allergen.', ToastStatus.Error);
    });
  }
});

export const {} = allergenesSlice.actions;

export default allergenesSlice.reducer;
