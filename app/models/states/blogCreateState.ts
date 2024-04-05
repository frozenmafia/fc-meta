import { BlogPostData } from "../BlogPost";


export interface BlogCreateState{
    blog: BlogPostData | null;
    loading : boolean;
    error : any | null;
}