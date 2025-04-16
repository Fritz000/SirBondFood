// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { axiosInstance, refreshAccessToken } from '../../utils/axiosInstance'; // Axios setup

// // Async thunk to handle login
// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post('/login/', { email, password });
//       return response.data; // Return user data and token
//     } catch (err) {
//       return rejectWithValue(err.response?.data || 'Login failed');
//     }
//   }
// );

// // Async thunk to fetch user profile
// export const fetchUser = createAsyncThunk(
//   'auth/fetchUser',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get('/profile/', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       return response.data; // Return user profile
//     } catch (error) {
//       if (error.response.status === 401 && error.response.data?.code === 'token_not_valid') {
//         try {
//           const newAccessToken = await refreshAccessToken(); // Refresh token
//           const retryResponse = await axiosInstance.get('/profile/', {
//             headers: { Authorization: `Bearer ${newAccessToken}` },
//           });
//           return retryResponse.data;
//         } catch (refreshError) {
//           console.error('Failed to refresh token:', refreshError.response?.data || refreshError.message);
//           throw rejectWithValue('Session expired. Please log in again.');
//         }
//       }
//       throw rejectWithValue(error.response?.data || 'Failed to fetch user');
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     token: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem('user');
//       localStorage.removeItem('token');
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Login action
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         localStorage.setItem('user', JSON.stringify(action.payload.user));
//         localStorage.setItem('token', action.payload.token);
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Login failed';
//       })
//       // Fetch user action
//       .addCase(fetchUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload; // Assuming the response is the user profile
//       })
//       .addCase(fetchUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to fetch user profile';
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;