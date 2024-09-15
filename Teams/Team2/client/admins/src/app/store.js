import { configureStore } from "@reduxjs/toolkit";

//  import userSlice from "../features/user/userSlice";
import userSlice from "../sharedPages/userSlice";

export const store = configureStore({
    reducer: {
       
        user:userSlice,
        
    }
})