import { configureStore } from '@reduxjs/toolkit';
import authReducer from './feature/auth/authSlice';
import blogsReducer from './feature/blogs/blogFetchSlice';
import userReducer from './feature/user/userSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {

        auth:authReducer,
        user:userReducer,
        blogs:blogsReducer,

    }
  })
}



// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']