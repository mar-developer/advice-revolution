import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../pages/Login/authSlice';
import homeReducer from '../pages/Home/homeSlice';

import { authApi } from './api/auth';
import { tokenApi } from './api/token';
import { employeesApi } from './api/employees';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    [authApi.reducerPath]: authApi.reducer,
    [tokenApi.reducerPath]: tokenApi.reducer,
    [employeesApi.reducerPath]: employeesApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authApi.middleware,
      tokenApi.middleware,
      employeesApi.middleware
    ]),

});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
