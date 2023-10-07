// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import globalReducer from "../state/index";
import { setupListeners } from "@reduxjs/toolkit/query";

//import {api} from "../state/index";

const store = configureStore({
    reducer: {
        user: userReducer,
        global:globalReducer,
       // [api.reducerPath]:api.reducer,
      
    },
    //middleware:(getDeault)=> getDeault().concat(api.middleware)
});
setupListeners(store.dispatch)

export default store;
