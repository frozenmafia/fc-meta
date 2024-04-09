"use client";
import ThumbnailUploader from "@/app/components/ThumbnailUploader/ThumbnailUploader";
import { TOKEN } from "@/app/constants/names";
import { BlogPostData } from "@/app/models/BlogPost";
import store from "@/app/redux/store";
import { createBlog, updateBlog, uploadFile } from "@/lib/feature/blogs/blogsCreateSlice";
import { Button, Stack, TextField } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Tag } from "react-tag-input";
import TagInput from "@/app/components/Tags/TagInput";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchAllBlogs } from "@/lib/feature/blogs/blogFetchSlice";
import UploadForm from "@/app/components/ImageListRenderer/UploadForm";
import filesecure from "@/app/services/fileSecure";
import EditImageForm from "@/app/components/ImageListRenderer/EditImageForm";

const CustomEditor = dynamic(
  () => {
    return import("@/app/components/Editor/ckeditor");
  },
  { ssr: false }
);

const EditBlog = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const blog = useAppSelector(state=>state.blogs.current_blog);

  // Initialize state values
  const [formData, setFormData] = useState<BlogPostData>({
    title: blog?.title || "",
    content: blog?.content || "",
    tags: blog?.tags || []
  });

  const editorRef = useRef(null);
  const dispatch = useAppDispatch();

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

    let uploadData: BlogPostData = {
      id: blog?.id,
      title: formData.title,
      content: formData.content,
      tags: updatedTags,
      thumbnail_url: blog?.thumbnail_url
      // thumbnail_id: formData.thumbnail_id,
    };

    console.log(uploadData);
    console.log(selectedFile);

    // Dispatch the createBlog action when the save button is clicked
    if (selectedFile) {
      filesecure
        .uploadImage(selectedFile)
        .then((response) => {
          if (response.data) {
            const access_url = response.data.access_url;
            uploadData.thumbnail_url = access_url;

            dispatch(updateBlog(uploadData))
            .then((response) =>
              dispatch(fetchAllBlogs()).then((res) => router.push("/"))
            );
          }
        })
        .catch((err) => console.log(err));
    }else{
      dispatch(updateBlog(uploadData))
        .then((response)=>
          dispatch(fetchAllBlogs())).then((res)=>router.push("/"))
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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
    }
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
        {/* <ThumbnailUploader
          handleImageChange={handleImageChange}
          thumbnail_id={formData.thumbnail_id}
        /> */}
        <EditImageForm file={selectedFile} handleFileChange={handleFileChange} />

        <Stack alignItems="center">
          <Button onClick={handleUpdate}>Save</Button>
        </Stack>
      </Stack>
    </>
  );
};

export default EditBlog;
