"use client"
import ThumbnailUploader from '@/app/components/ThumbnailUploader/ThumbnailUploader';
import { TOKEN } from '@/app/constants/names';
import { BlogPostData } from '@/app/models/BlogPost';
import store from '@/app/redux/store';
import { createBlog } from '@/lib/feature/blogs/blogsCreateSlice';
import { Button, Stack, TextField } from '@mui/material';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Tag } from "react-tag-input";
import TagInput from '@/app/components/Tags/TagInput';


const CustomEditor = dynamic(
    () => {
      return import("@/app/components/Editor/ckeditor");
    },
    { ssr: false }
  );
  

const CreateBlog = () => {


    const router = useRouter();

    // Initialize state values
    const [formData, setFormData] = useState<BlogPostData>({
      title: "",
      content: "",
      tags: [],
      thumbnail_id: 0,
    });
  
    const editorRef = useRef(null);
  
    useEffect(() => {
    //   const token = localStorage.getItem(TOKEN);
    //   if (!token) router.push("/login");
    }, [router]);
  
    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, title: event.target.value });
    };
  
    const handleSave = () => {
      console.log(formData); // Log the current form data
  
      const updatedTags = formData.tags.map((tag) => tag.text);
  
      let uploadData: BlogPostData = {
        title: formData.title,
        content: formData.content,
        tags: updatedTags,
        thumbnail_id: formData.thumbnail_id,
      };
  
      console.log(uploadData);
  
      // Dispatch the createBlog action when the save button is clicked
      store
        .dispatch(createBlog(uploadData))
        .then((response) => {
          console.log(response); // Log the response if dispatch is successful
          router.push("/");
        // window.location.reload();
        })
        .catch((error) => {
          console.log(error); // Log any errors encountered during dispatch
        });
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
              <Button onClick={handleSave}>Save</Button>
            </Stack>
          </Stack>
        </>
      );
}

export default CreateBlog