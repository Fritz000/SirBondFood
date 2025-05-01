import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // This is the default storage (localStorage)
import authReducer from '../features/auth/authSlice'; // Import your authSlice

// Create a persist config for the reducer you want to persist
const persistConfig = {
  key: 'auth', // Key used in the localStorage
  storage,      // Choose between localStorage or sessionStorage (storage)
};

// Create the persisted reducer by applying persistReducer to your auth reducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Configure the store
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Using the persisted reducer for auth
  },
  // Optional: If you need to add middleware or other store configurations
});

// Create a persistor
export const persistor = persistStore(store);
