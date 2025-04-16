// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Function to fetch the user profile
//   const fetchUser = async () => {
//     try {
//       const response = await axios.get('/api/profile/', { withCredentials: true });
//       setUser(response.data); // Set user data if authenticated
//       setLoading(false); // Stop loading once data is fetched
//     } catch (err) {
//       console.error('Failed to fetch user data:', err);
//       setUser(null);
//       setLoading(false);
//       setError('Failed to load user data, please log in.');
//     }
//   };

//   // Check if user is already authenticated (using cookies)
//   useEffect(() => {
//     fetchUser(); // Fetch user profile when component mounts
//   }, []); // Empty dependency array ensures it runs only once on mount

//   const login = async (username, password) => {
//     try {
//       const response = await axios.post(
//         '/api/login', 
//         { username, password },
//         { withCredentials: true } // Ensure cookies are sent along with request
//       );
//       fetchUser(); // After successful login, fetch user data
//     } catch (err) {
//       console.error('Login failed:', err);
//       setError('Invalid username or password.');
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.post('/api/logout', {}, { withCredentials: true });
//       setUser(null); // Clear the user state
//       setError(null);
//     } catch (err) {
//       console.error('Logout failed:', err);
//       setError('Logout failed, please try again.');
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, login, logout, loading, error }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
