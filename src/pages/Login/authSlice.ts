import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  authCode: string,
  accessToken: string,
  refreshToken: string
}

interface IAuthState {
    user: IUser | null;
}

const initialState: IAuthState = {
    user: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: () =>  {
            // localStorage.clear();

            return initialState;
        },
        setToken: (state, action: PayloadAction<any>) => {
            const {refreshToken, accessToken, username} = action.payload;

            console.log(action.payload)

            localStorage.setItem('token', accessToken);
            localStorage.setItem('username', username);
            localStorage.setItem('refreshToken', refreshToken);
        },
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        }
    },
});


export const { 
    logout,
    setUser,
    setToken
} = authSlice.actions;
export const selectUser = (state: any) => state.auth.user;

export default authSlice.reducer;