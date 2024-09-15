import { configureStore } from "@reduxjs/toolkit";

//  import userSlice from "../features/user/userSlice";
import userSlice from "../sharedPages/userSlice";
import tradingSlice from "../features/trading/tradingSlice";

export const store = configureStore({
    reducer: {
       
        user:userSlice,
        trading:tradingSlice,
        
    }
})