import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/auth";
import { axiosInstance } from "@/services/axiosInstance";
import { endpoints } from "@/services/endpoints";

import { IUser } from "@/types/IUser";
import { getToken, removeToken, setToken } from "@/utils/secureStore";
import {
  type PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

export const actionFetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkApi) => {
    try {
      const refreshToken = await getToken(REFRESH_TOKEN);
      if (!refreshToken) throw new Error("UNAUTHORIZE");
      const response = await axiosInstance.get(endpoints.ME);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: (error as Error).message,
      });
    }
  }
);

interface Auth {
  loading: boolean;
  user: IUser | null;
  loggingOut: boolean;
}

const initialState: Auth = {
  user: null,
  loading: true,
  loggingOut: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    actionLogout: (state) => {
      state.user = null;
      removeToken(ACCESS_TOKEN);
      removeToken(REFRESH_TOKEN);
    },
    actionLogin: (
      _,
      action: PayloadAction<{
        access_token: string;
        refresh_token: string;
      }>
    ) => {
      setToken(ACCESS_TOKEN, action.payload.access_token);
      setToken(REFRESH_TOKEN, action.payload.refresh_token);
    },
    actionSetUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(actionFetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(actionFetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(actionFetchUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { actionLogout, actionLogin, actionSetUser } = authSlice.actions;

export default authSlice.reducer;
