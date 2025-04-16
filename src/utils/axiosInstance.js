// import axios from 'axios';

// // Create an axios instance with default settings
// const axiosInstance = axios.create({
//   baseURL: 'https://bondfood.vercel.app/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Function to refresh the access token
// const refreshAccessToken = async () => {
//     try {
//       const refreshToken = localStorage.getItem('refreshToken'); // Retrieve refresh token
//       if (refreshToken) {
//         const response = await axiosInstance.post('/token_refresh/', { refresh: refreshToken });
//         const newAccessToken = response.data.access;
  
//         localStorage.setItem('token', newAccessToken); // Store new access token
//         return newAccessToken;
//       }
//       throw new Error('No refresh token available');
//     } catch (error) {
//       console.error('Error refreshing token:', error.response?.data || error.message);
//       throw error; // Handle session expiration or logout
//     }
//   };

// // Add interceptors to the axios instance for request handling
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       if (error.response.status === 401 && error.response.data?.code === 'token_not_valid') {
//         try {
//           const newAccessToken = await refreshAccessToken();
//           error.config.headers.Authorization = `Bearer ${newAccessToken}`; // Add new token to retry request
//           return axiosInstance.request(error.config); // Retry the failed request
//         } catch (refreshError) {
//           console.error('Token refresh failed:', refreshError.response?.data || refreshError.message);
//           localStorage.removeItem('token');
//           localStorage.removeItem('refreshToken');
//           alert('Session expired. Please log in again.');
//           window.location.href = '/signin'; // Redirect to login page
//         }
//       }
//       return Promise.reject(error);
//     }
//   );

// // Named export for axiosInstance and refreshAccessToken
// export { axiosInstance, refreshAccessToken };