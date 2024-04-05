
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../../../app/redux/store";
import {RegisterForm} from "@/app/models/RegisterForm";
import { RegisterState } from "../../../app/models/states/registerState";
import iamsecure from "../../../app/services/iamSecure";

export const register = createAsyncThunk(
    'user/reigster',
    async (credentials: RegisterForm, {rejectWithValue})=>{

        console.log(credentials)
        try{
            const response = await iamsecure.post("user/register",credentials );
            return response.data
        }catch (error:any){
            if(axios.isAxiosError(error)){
                console.log(error)
                return rejectWithValue(error.response?.data.detail);
            }else{
                console.log(error);
                throw error;
            }
        }
    

    }
)



const initialState : RegisterState = {
    user: null,
    loading: false,
    error: null
}


export const userSlice = createSlice({
    name:'register',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
            .addCase(register.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action)=>{
                state.loading = false;
                state.error = null;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
            })
    },
})

export const registerUser = (state:RootState) => state.auth.user;

export default userSlice.reducer;