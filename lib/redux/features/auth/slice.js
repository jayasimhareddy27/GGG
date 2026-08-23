import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './state';
import { 
  setCredentials as setCredentialsReducer, 
  clearCredentials as clearCredentialsReducer 
} from './reducers';


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: setCredentialsReducer,
    clearCredentials: clearCredentialsReducer,
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
