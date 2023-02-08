import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {setUser, IUser} from  "../../pages/Login/authSlice"

export const tokenApi = createApi({
    reducerPath: 'tokenApi',
    baseQuery: fetchBaseQuery({baseUrl: `${process.env.REACT_APP_SERVER_ENDPOINT}`}),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        getToken: builder.mutation<IUser, {authCode: string}>({
            query: (data) => ({
                url: `/users/fetch-token`,
                method: 'POST',
                body: {
                    authCode: data.authCode,
                    appId: process.env.REACT_APP_APP_ID,
                    appSecret: process.env.REACT_APP_APP_SECRET
                }
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const {refreshToken, accessToken, username} = data;

                    localStorage.setItem('token', accessToken);
                    localStorage.setItem('username', username);
                    localStorage.setItem('refreshToken', refreshToken);

                    setUser(data);
                } catch (error) {}
            },
        })
    }),
});


export const {
    useGetTokenMutation
} = tokenApi;