import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    screenWidth:0,
}

const uiSlice = createSlice({
    name:"ui",
    initialState,
    reducers:{
        setScreenWidth:(state,{payload})=>{
            state.screenWidth = payload
        }
    }
})

export default uiSlice.reducer
export const {setScreenWidth} = uiSlice.actions