import { OutputData } from "@editorjs/editorjs";
import { Tag } from "react-tag-input";
// models/BlogPost.ts
export interface BlogPostData {
  id?:number;
  title: string;
  content: any;
  author?: string;
  published_at?: string;
  tags: any[];
  views?: number;
  likes?: number;
  dislikes?:number;
  comments?: string[];
  thumbnail_id:number;
}

