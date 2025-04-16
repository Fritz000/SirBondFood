// import axios from 'axios';

// export const loginUser = async (username, password) => {
//   try {
//     const response = await axios.post('/api/login', { username, password }, { withCredentials: true });
//     console.log('Login Success:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Login Error:', error);
//     throw error;  // Throwing the error so it can be caught in your Signin page
//   }
// };

// export const getUserProfile = async () => {
//   try {
//     const response = await axios.get('/api/profile/', { withCredentials: true });
//     console.log('User Profile:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching profile:', error);
//     throw error; // Throwing error to handle it in the Signin page
//   }
// };
