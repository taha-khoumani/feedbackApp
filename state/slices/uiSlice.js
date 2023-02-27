import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    screenWidth:1000,
    isMenuOpen:false,
    logoHeight:0,
    isSortOpen:false,
    sortMethode:"Most Upvotes",
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
        toggleSort:(state,{payload})=>{
            state.isSortOpen = payload
        },
        setSortMethode:(state,{payload})=>{
            state.sortMethode = payload
        },
    }
})

export default uiSlice.reducer
export const {setScreenWidth,toggleMenu,setLogoHeight,toggleSort,setSortMethode} = uiSlice.actions