import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  email: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{ email: string; accessToken: string }>
    ) {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.email = null;
      state.accessToken = null;
    },
    updateToken(state, action: PayloadAction<{ accessToken: string }>) {
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { loginSuccess, logout, updateToken } = authSlice.actions;
export default authSlice.reducer;
