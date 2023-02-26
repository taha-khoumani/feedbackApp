import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    screenWidth:0,
    isMenuOpen:false,
    logoHeight:0,
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
        },
        setLogoHeight:(state,{payload})=>{
            state.logoHeight = payload
        },
    }
})

export default uiSlice.reducer
export const {setScreenWidth,toggleMenu,setLogoHeight} = uiSlice.actions