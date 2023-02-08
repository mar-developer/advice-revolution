import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

type IUser = {
    username: string;
    email: string;
    token: string;
    authCode: string;
    refreshToken: string;
    data: any;
};

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: `${process.env.REACT_APP_SERVER_ENDPOINT}`}),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation<IUser, {username: string, password: string}>({
            query: (body) => ({
                url: `/users/login?appId=${process.env.REACT_APP_APP_ID}`,
                method: 'POST',
                body,
            })
        })
    }),
});

export const {
    useLoginMutation
} = authApi;