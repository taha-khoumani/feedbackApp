import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    screenWidth:null,
    isMenuOpen:false,
    isSortOpen:false,
    sortMethode:"Most Upvotes",
    filter:"all",
    currentStage:"In-Progress",
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
        toggleSort:(state,{payload})=>{
            state.isSortOpen = payload
        },
        setSortMethode:(state,{payload})=>{
            state.sortMethode = payload
        },
        setFilter:(state,{payload})=>{
            state.filter = payload
        },
    }
})

export default uiSlice.reducer
export const {setScreenWidth,toggleMenu,toggleSort,setSortMethode,setFilter} = uiSlice.actions