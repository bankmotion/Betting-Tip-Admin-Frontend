import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER_URL } from 'src/config/config';
import { SettingID } from 'src/const/SettingConst';
import { ToastStatus } from 'src/models/basic';
import { SettingType } from 'src/models/tipOption';
import { toastMsg } from 'src/utils/utils';

export interface TipSettingState {
  defaultSettings: SettingType;
}

const initialState: TipSettingState = {
  defaultSettings: {
    minEV: 0,
    minOdds: 1.2,
    maxOdds: 10,
    minProbability: 50,
    minTimeBeforeMatch: 120,
    maxTipsPerDay: 10,
    allowedBetTypes: [],
    lowRisk: 70,
    mediumRisk: 55,
    highRisk: 55,
    overRound: false,
    enableHighOddAdjust: false,
    highOddSthreshold: 0,
    extraProbBoost: 0,
    scoreWeiPenalty: 0,
    scoreWeiEV: 0,
    scoreWeiProb: 0
  }
};

export const getTipSettingAction = createAsyncThunk(
  'tipSetting/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SERVER_URL}/settings`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateTipSettingAction = createAsyncThunk(
  'tipSetting/update',
  async (data: SettingType, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${SERVER_URL}/settings`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const tipSettingSlice = createSlice({
  name: 'tipSetting',
  initialState,
  reducers: {
    setDefaultSettings: (state, action) => {
      state.defaultSettings = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTipSettingAction.fulfilled, (state, action) => {
      const settings = action.payload;

      const allowedBetTypesStr = settings.find(
        (setting: any) => setting.id === SettingID.allowedBetTypes
      )?.value;
      const allowedBetTypes = allowedBetTypesStr
        ? allowedBetTypesStr.split(',').map(Number)
        : [];

      const updatedSettings = {
        minEV:
          parseFloat(
            settings.find((setting: any) => setting.id === SettingID.minEV)
              ?.value || 0
          ) || 0,
        minOdds:
          parseFloat(
            settings.find((setting: any) => setting.id === SettingID.minOdds)
              ?.value || 1.2
          ) || 1.2,
        maxOdds:
          parseFloat(
            settings.find((setting: any) => setting.id === SettingID.maxOdds)
              ?.value || 10
          ) || 10,
        minProbability:
          parseFloat(
            settings.find(
              (setting: any) => setting.id === SettingID.minProbability
            )?.value || 50
          ) || 50,
        minTimeBeforeMatch:
          parseFloat(
            settings.find(
              (setting: any) => setting.id === SettingID.minTimeBeforeMatch
            )?.value || 120
          ) || 120,
        maxTipsPerDay:
          parseFloat(
            settings.find(
              (setting: any) => setting.id === SettingID.maxTipsPerDay
            )?.value || 10
          ) || 10,
        allowedBetTypes: allowedBetTypes,
        lowRisk:
          parseFloat(
            settings.find((setting: any) => setting.id === SettingID.lowRisk)
              ?.value || 70
          ) || 70,
        mediumRisk:
          parseFloat(
            settings.find((setting: any) => setting.id === SettingID.mediumRisk)
              ?.value || 55
          ) || 55,
        highRisk:
          parseFloat(
            settings.find((setting: any) => setting.id === SettingID.highRisk)
              ?.value || 55
          ) || 55,
        overRound:
          settings.find((setting: any) => setting.id === SettingID.overRound)
            ?.value === 'true' || false,
        enableHighOddAdjust:
          settings.find(
            (setting: any) => setting.id === SettingID.enableHighOddAdjust
          )?.value === 'true' || false,
        highOddSthreshold:
          parseFloat(
            settings.find(
              (setting: any) => setting.id === SettingID.highOddSthreshold
            )?.value || 0
          ) || 0,
        extraProbBoost:
          parseFloat(
            settings.find(
              (setting: any) => setting.id === SettingID.extraProbBoost
            )?.value || 0
          ) || 0,
        scoreWeiPenalty:
          parseFloat(
            settings.find(
              (setting: any) => setting.id === SettingID.scoreWeiPenalty
            )?.value || 0
          ) || 0,
        scoreWeiEV:
          parseFloat(
            settings.find((setting: any) => setting.id === SettingID.scoreWeiEV)
              ?.value || 0
          ) || 0,
        scoreWeiProb:
          parseFloat(
            settings.find(
              (setting: any) => setting.id === SettingID.scoreWeiProb
            )?.value || 0
          ) || 0
      };

      state.defaultSettings = updatedSettings;
    });

    builder.addCase(updateTipSettingAction.fulfilled, (state, action) => {
      toastMsg(
        'Updated setting and filtered tips successfully',
        ToastStatus.Success
      );
    });
    builder.addCase(updateTipSettingAction.rejected, (state, action) => {
      toastMsg('Update tip setting failed', ToastStatus.Error);
    });
    builder.addCase(updateTipSettingAction.pending, (state, action) => {
      toastMsg('Updating and filtering tips...', ToastStatus.Info);
    });
  }
});

export default tipSettingSlice.reducer;
