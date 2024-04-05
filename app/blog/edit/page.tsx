"use client"
import TagInput from '@/app/components/Tags/TagInput';
import ThumbnailUploader from '@/app/components/ThumbnailUploader/ThumbnailUploader';
import { TOKEN } from '@/app/constants/names';
import { BlogPostData } from '@/app/models/BlogPost';
import store from '@/app/redux/store';
import { updateBlog } from '@/lib/feature/blogs/blogsCreateSlice';
import { useAppSelector } from '@/lib/hooks';
import { Button, Stack, TextField } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Tag } from "react-tag-input";



const CustomEditor = dynamic(
    () => {
      return import("@/app/components/Editor/ckeditor");
    },
    { ssr: false }
  );
  

const EditBlog = () => {


    const router = useRouter();
    const blog = useAppSelector((state)=>state.blogs.current_blog);

    // Initialize state values
    const [formData, setFormData] = useState<BlogPostData>({
      title: blog?.title || 'Cannot fetch Title',
      content: blog?.content || 'Cannot fetch Content',
      tags: blog?.tags || ['Cannot fetch tags'],
      thumbnail_id: blog?.thumbnail_id ||  0,
    });
  
    const editorRef = useRef(null);
  
    useEffect(() => {
      const token = localStorage.getItem(TOKEN);
      if (!token) router.push("/login");
    }, [router]);
  
    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, title: event.target.value });
    };
  
    const handleUpdate = () => {
      console.log(formData); // Log the current form data
  
      const updatedTags = formData.tags.map((tag) => tag.text);
  
      if(blog){
        let uploadData: BlogPostData = {
            title: formData.title,
            content: formData.content,
            tags: updatedTags,
            thumbnail_id: formData.thumbnail_id,
            id:blog.id
          };
      
          console.log(uploadData);
      
          // Dispatch the createBlog action when the save button is clicked
          store
            .dispatch(updateBlog(uploadData))
            .then((response) => {
              console.log(response); // Log the response if dispatch is successful

              router.push("/");
            })
            .catch((error) => {
              console.log(error); // Log any errors encountered during dispatch
            });

      }else{
        router.refresh();
      }
 
    };
  
    // Handle editor data change
    const handleEditorDataChange = (data: string) => {
      setFormData((prevData) => ({
        ...prevData,
        content: data,
      }));
    };
  
  
    // Handle tag change
    const handleTagChange = (tags: Tag[]) => {
      setFormData({ ...formData, tags });
    };
  
    const styles = {
      "& .MuiInputLabel-root": { color: "black" }, // Color for label
      "& .MuiOutlinedInput-root": {
        // Style for entire input field
        "&.Mui-focused fieldset": { borderColor: "black" }, // Focused state border color
        "& .MuiInputBase-input": { color: "black" }, // Color for input text
      },
    };
  
    const handleImageChange = (index: number) => {
      setFormData((prev) => ({
        ...prev,
        thumbnail_id: index,
      }));
  
      console.log(index);
    };
    return (
        <>
          <Stack spacing={2} width={"80%"} margin={"auto"}>
            <TextField
              fullWidth
              size="small"
              sx={styles}
              label="Title"
              value={formData.title}
              onChange={handleTitleChange}
            />
            <CustomEditor
              updateContent={handleEditorDataChange}
              initialData={formData.content}
            />
    
            <Stack direction={"row"} justifyContent={"space-between"}>
              <TagInput
                handleTagChange={handleTagChange}
                selectedTags={formData.tags}
              />
            </Stack>
            <ThumbnailUploader
              handleImageChange={handleImageChange}
              thumbnail_id={formData.thumbnail_id}
            />
    
            <Stack alignItems="center">
              <Button onClick={handleUpdate}>Update</Button>
            </Stack>
          </Stack>
        </>
      );
}

export default EditBlog