
import { BlogPostData } from "@/app/models/BlogPost";
import { BlogCreateState } from "@/app/models/states/blogCreateState";
import blogsecure from "@/app/services/blogSecure";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createBlog = createAsyncThunk(
    "blogs/create",
    async (blog: BlogPostData, { rejectWithValue }) => {
      try {
        const response = await blogsecure.post("/blogs/create", blog);
  
        return response.data;
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.response?.data); // Use response?.data for potential absence
        } else {
          console.error(error); // Log unexpected errors
          throw error; // Re-throw non-Axios errors for handling elsewhere
        }
      }
    }
  );

export const updateBlog = createAsyncThunk(
  "blogs/update",
  async (blog: BlogPostData, {rejectWithValue})=>{
    try {

      const response = await blogsecure.put("/blogs/update", blog);
      return response.data

    }catch (error: any) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data); // Use response?.data for potential absence
      } else {
        console.error(error); // Log unexpected errors
        throw error; // Re-throw non-Axios errors for handling elsewhere
      }
    }
  }
)

export const deleteBlog = createAsyncThunk(
  "blogs/delete",
  async (blog_id: number, {rejectWithValue})=>{
    try{
      const response = await blogsecure.delete(`/blogs/delete/${blog_id}`);
      return response.data;
    }
    catch(error: any){
      if(axios.isAxiosError(error)){
        return rejectWithValue(error);

      }
      else{
        console.error(error);
        throw error;
      }
    }
  }
)

export const uploadFile = createAsyncThunk(
  "blogs/uploadFile",
  async (file:File, {rejectWithValue})=>{
    try{
      const formData = new FormData();
      formData.append("filename", file);
      const response = await blogsecure.post('/blogs/uploadFile',formData);
      return response.data;
    }catch(error: any){
      if(axios.isAxiosError(error)){
        return rejectWithValue(error);
      }
      else{
        console.error(error);
        throw error;
      }
    }
  }
)

const initialState : BlogCreateState = {
    blog: null,
    loading: false,
    error : null
    
}


export const blogSlice = createSlice({
    name:'blogs',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
            .addCase(createBlog.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(createBlog.fulfilled, (state, action)=>{
                state.loading = false;
                state.error = null;
                state.blog = action.payload;
            })
            .addCase(createBlog.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateBlog.pending, (state)=>{
              state.loading = true;
              state.error = null;
          })
          .addCase(updateBlog.fulfilled, (state, action)=>{
              state.loading = false;
              state.error = null;
              state.blog = action.payload;
          })
          .addCase(updateBlog.rejected, (state, action)=>{
              state.loading = false;
              state.error = action.payload;
          })
        
    },
})

export default blogSlice.reducer;