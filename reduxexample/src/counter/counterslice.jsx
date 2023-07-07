import { createSlice }
 from "@reduxjs/toolkit";


 const counterslice=createSlice({
    name:'counter',
    initialState:0,
    reducers:{
        increment:(state)=>state + 1,
        decrement:(state) => state -1
    }
 })

 export const{increment,decrement} =counterslice.actions
 export default counterslice.reducer