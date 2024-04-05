import { BlogFetchAllState } from "@/app/models/states/blogFetchAllState";
import blogsecure from "@/app/services/blogSecure";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const fetchAllBlogs = createAsyncThunk(
    "blogs/fetch_all",
    async (_, { rejectWithValue }) => { // Removed unused 'id' parameter
        try {
            const response = await blogsecure.get(`blogs/fetch_all`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue((error as AxiosError).response?.data);
            } else {
                // console.log(error);
                throw error;
            }
        }
    }
)

export const fetchById= createAsyncThunk(
    "blogs/fetch_By_Id",
    async (id : number,{rejectWithValue} )=>{
        try {
            const response = await blogsecure.get(`blogs/${id}`)
            return response.data;
        }catch(error){
            if (axios.isAxiosError(error)){
                return rejectWithValue ((error as AxiosError).response?.data);
            }else{
                // console.log(error);
                throw error;
            }
        }
    }
)


export const like = createAsyncThunk(
    "blog/like",
    async(blog_id: number, {rejectWithValue})=>{
        // console.log("blog id");
        try{
            const response = await blogsecure.put(`blogs/like/${blog_id}`);
            return response.data;
        }catch(error){
            if(axios.isAxiosError(error)){
                return rejectWithValue((error as AxiosError).response?.data);
            }else{
                // console.log(error);
                throw error;
            }
        }
    }
)

export const dislike = createAsyncThunk(
    "blog/dislike",
    async(blog_id: number, {rejectWithValue})=>{
        // console.log(blog_id);
        try{
            const response = await blogsecure.put(`blogs/dislike/${blog_id}`);
            return response.data;
        }catch(error){
            if(axios.isAxiosError(error)){
                return rejectWithValue((error as AxiosError).response?.data);
            }else{
                // console.log(error);
                throw error;
            }
        }
    }
)



const initialState: BlogFetchAllState = {
    blogs: null,
    loading: false,
    error: null,
    current_blog:null
}

export const blogFetchSlice = createSlice({
    name: 'blogsFetchAll',
    initialState,
    reducers: {
        setCurrentBlog : (state, action)=>{

            state.current_blog = action.payload;

        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAllBlogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // state.blogs = action.payload;
                state.blogs = action.payload.map((blog: { tags: any[]; })=>{
                    const updateTags = blog.tags.map((tag: any) => ({
                        ...tag,
                        id: String(tag.id)
                    }))
                    return {...blog, tags: updateTags};
                })
            })
            .addCase(fetchAllBlogs.rejected, (state, action) => {
                // Handle rejected case if necessary
                state.blogs = null;
                state.error  = action.payload;
                state.loading = false;
            })
            .addCase(like.fulfilled, (state, action)=>{
                if(state.blogs){
                    
                    const updatedBlogs = state.blogs.map(blog=>blog.id ==action.payload.id ? action.payload : blog);
                    if (state.current_blog && action.payload.id === state.current_blog.id) {
                        state.current_blog.likes = action.payload.likes;
                        state.current_blog.dislikes = action.payload.dislikes;
                    }
                    state.blogs = updatedBlogs;
                    
                }
                
            })
           .addCase(dislike.fulfilled, (state, action)=>{
            if(state.blogs){
                const updatedBlogs = state.blogs.map(blog => blog.id === action.payload.id ? action.payload : blog);
                if (state.current_blog && action.payload.id === state.current_blog.id) {
                    state.current_blog.likes = action.payload.likes;
                    state.current_blog.dislikes = action.payload.dislikes;
                }
                state.blogs = updatedBlogs;
            }
           });
    }
});



export const {setCurrentBlog} = blogFetchSlice.actions;

export default blogFetchSlice.reducer;
