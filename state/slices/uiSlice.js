import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    screenWidth:0,
    isMenuOpen:false,
}

const uiSlice = createSlice({
    name:"ui",
    initialState,
    reducers:{
        setScreenWidth:(state,{payload})=>{
            state.screenWidth = payload
        },
        toggleMenu:(state,{payload})=>{
            state.isMenuOpen = payload
        }
    }
})

export default uiSlice.reducer
export const {setScreenWidth,toggleMenu} = uiSlice.actions