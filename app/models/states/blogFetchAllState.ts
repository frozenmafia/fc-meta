import { BlogGetData } from "../BlogGet";
import { BlogPostData } from "../BlogPost";

export interface BlogFetchAllState {
    blogs: BlogGetData[] | null;
    loading: boolean;
    error: any | null;
    current_blog: BlogGetData | null;
}