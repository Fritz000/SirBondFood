import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://bondfood.vercel.app/api';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login/`, {
        email,
        password,
      });
      return response.data;  // This will include the token and user data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,  // Token is managed by Redux Persist
    user: null,   // User data from login
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');  // Remove token from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.access);  // Save token to localStorage
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  // Handle login error
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;