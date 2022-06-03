import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import formUserReducer from './slices/formUserSlice';

const reducers = combineReducers({
  formUser: formUserReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default reducers;

export type AppDispatch = typeof store.dispatch;
export type State = ReturnType<typeof reducers>;
export type RootState = ReturnType<typeof store.getState>;
