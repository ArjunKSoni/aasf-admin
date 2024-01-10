import {createSlice} from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const Auth=createSlice({
    name:"Token",
    initialState:{
        Token:Cookies.get("Token"),
        Uid:Cookies.get("uid"),
        Name:Cookies.get("Name"),
        Email:Cookies.get("email"),
        PhotoURL:Cookies.get("photoURL"),
    },
    reducers:{
        add:(state,action)=>{
            state.Token=action.payload;
        },
        addUID:(state,action)=>{
            state.Uid=action.payload;
        },
        addName:(state,action)=>{
            state.Name=action.payload;
        },
        addEmail:(state,action)=>{
            state.Email=action.payload;
        },
        addPhotoURL:(state,action)=>{
            state.PhotoURL=action.payload;
        }
        
    }
})

export const {add,addPhotoURL,addEmail,addName,addUID}=Auth.actions;
export default Auth.reducer