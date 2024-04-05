import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import authReducer from './authSlice';
import blogsFetchAllReducer from '../../lib/feature/blogs/blogFetchSlice';
import blogReducer from '../../lib/feature/blogs/blogsCreateSlice';
import userReducer from '../../lib/feature/user/userSlice';

// const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage: typeof window !== 'undefined' ? createWebStorage('local') : {
//       getItem() { return Promise.resolve(null); },
//       setItem() { return Promise.resolve(); },
//       removeItem() { return Promise.resolve(); },
//     },
//   };
const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    blogs: blogReducer,
    fetch_all_blogs:blogsFetchAllReducer,

});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck:{
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
// export const persistor = persistStore(store);
export default store;
