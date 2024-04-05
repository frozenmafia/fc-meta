import { BlogGetData } from "../BlogGet";
import { BlogPostData } from "../BlogPost";

export interface BlogFetchAllState {
    blogs: BlogPostData[] | null;
    loading: boolean;
    error: any | null;
    current_blog: BlogGetData | null;
}