import { AxSecure } from "./axSecure";

class BlogSecure extends AxSecure{
    constructor(){
        super(process.env.NEXT_PUBLIC_BLOG_URL || '');
    }
}

const blogsecure = new BlogSecure();
export default blogsecure;