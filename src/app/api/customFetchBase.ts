import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';

import { 
  logout,
  setToken
} from '../../pages/Login/authSlice';

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_SERVER_ENDPOINT}`,
  prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');

      if (token) {
          headers.set('authorization', `Bearer ${token}`)
      }

      return headers
  }
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if ((result.error?.data as any)?.detail === 'Not authenticated') {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery({
            url: '/users/refresh-token', 
            method: 'POST',
            body: {
              username: localStorage.getItem('username'),
              refreshToken: localStorage.getItem('refreshToken'),
              appId: process.env.REACT_APP_APP_ID,
              appSecret: process.env.REACT_APP_APP_SECRET
            }
          },
          api,
          extraOptions
        )

        if (refreshResult.data) {
          api.dispatch(setToken(refreshResult.data));

          // Retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
          window.location.href = '/login';
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export default customFetchBase;