import { createSlice } from "@reduxjs/toolkit"

    const initialState = {
    currentTransactionDetails:null
    }


const tradingSlice = createSlice({
    name: "trading",
    initialState,
    reducers: {
        saveCurrentTransactionDetails:(state,action) =>{
     state.currentTransactionDetails=action.payload;
      },
      resetCurrentTransactionDetails(state){
        state.currentTransactionDetails=null;
      }
    }
}
)

export const { saveCurrentTransactionDetails,resetCurrentTransactionDetails} = tradingSlice.actions;
export default tradingSlice.reducer;