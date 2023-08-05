
import {createSlice} from '@reduxjs/toolkit'


const userSlice=createSlice({
    name:'userProfile',
    initialState:null,
    reducers:{
        user(state,actions){
             return state=actions.payload;
        }
    }
})
console.log(userSlice.actions)
export default userSlice.reducer; 
export const {user} = userSlice.actions;