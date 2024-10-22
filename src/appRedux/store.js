import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { combineReducers } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'
import counterSlice from "./counterReducer";
// import storage from 'redux-persist/lib/storage'
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['apiProductSlice'],
}
export const rootReducers = combineReducers({
  counter: counterSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducers)
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
})
setupListeners(store.dispatch)

export default store




// import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
// import { combineReducers } from "@reduxjs/toolkit";
// import counterSlice from "./counterReducer";
// // import storage from "redux-persist/lib/storage";
// import createWebStorage from "redux-persist/lib/storage/createWebStorage";
// import {
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";

// const createNoopStorage = () => {
//   return {
//     getItem(_key) {
//       return Promise.resolve(null);
//     },
//     setItem(_key, value) {
//       return Promise.resolve(value);
//     },
//     removeItem(_key) {
//       return Promise.resolve();
//     },
//   };
// };

// const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

// const persistConfig = {
//   key: "root",
//   storage: storage,
// };

// export const rootReducers = combineReducers({
//   counter: counterSlice,
// });
// const persistedReducer = persistReducer(persistConfig, rootReducers);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });
// setupListeners(store.dispatch);

// export default store;


