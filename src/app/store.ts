import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import userSlice from '../reducers/user.slice';
import allergenesSlice from '../reducers/allergenes.slice';
import countriesSlice from '../reducers/countries.slice';
import leaguesSlice from '../reducers/leagues.slice';
import teamsSlice from '../reducers/teams.slice';
import { checkAuthMiddleware } from '../middleware/CheckAuth';
import matchesSlice from '../reducers/matches.slice';
import tipSettingSlice from '../reducers/tipSetting.slice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    allergenes: allergenesSlice,
    countries: countriesSlice,
    leagues: leaguesSlice,
    teams: teamsSlice,
    matches: matchesSlice,
    tipSetting: tipSettingSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(checkAuthMiddleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
