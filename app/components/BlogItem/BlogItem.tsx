"use client"
import { BlogGetData } from "@/app/models/BlogGet";
import { setCurrentBlog } from "@/lib/feature/blogs/blogFetchSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { BookmarkAdd } from "@mui/icons-material";
import { Button } from "@mui/joy";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TagOutput from "../Tags/TagOutput";
import { Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import { deleteBlog } from "@/lib/feature/blogs/blogsCreateSlice";
import { useState } from "react";

const BlogItem = ({ blog }: { blog: BlogGetData }) => {
  // Handle cases where image might not be available

  const router = useRouter();
  const user = useAppSelector((state)=>state.auth.user);
  const dispatch = useAppDispatch();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const handleClick = ()=>{
    dispatch(setCurrentBlog(blog));
  }

  const handleEdit = () =>{
    router.push("/blog/edit");
  }

  const handleDeleteClick = () => {
    setOpenConfirmation(true);
  };


  const handleConfirmDelete = () => {
    // Handle delete functionality
    // Implement your delete logic here
    if (blog && blog.id)
      dispatch(deleteBlog(blog.id))
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
    setOpenConfirmation(false);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };
  return (
    <Card
      variant="outlined"
      sx={{ width: 500, backgroundColor: "transparent" }}
      onClick = {handleClick}
    >
      <div>
        <Typography level="title-lg">{blog.title}</Typography>
        {/* <Typography level="body-sm">{blo}</Typography> */}
        <IconButton
          aria-label="bookmark Bahamas Islands"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}
        >
          <BookmarkAdd />
        </IconButton>
      </div>
      <Image
        src={`/images/im${blog.thumbnail_id}.jpeg`}
        width={500}
        height={500}
        alt="img"
        loading="lazy"
      />
      <CardContent orientation="horizontal">
        <Stack direction={"row"} justifyContent={"space-between"} width={"100%"} alignItems={"center"}>
          {/* <Typography level="body-xs">Total views:</Typography> */}
          <TagOutput tags={blog.tags}/>

        <Link href={`blog/${blog.id}`}>
          <Button
            variant="solid"
            size="md"
            color="success"
            aria-label="Explore Bahamas Islands"
            sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
          >
            Explore
          </Button>
        </Link>
        {
          user && user.id === Number(blog?.author) &&  
          <Stack direction={"row"} spacing={2}>
                      <Button
            variant="solid"
            size="md"
            color="primary"
            aria-label="Explore Bahamas Islands"
            sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
          variant="solid"
          size="md"
          color="danger"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
          onClick={handleDeleteClick}
        >
          Delete
        </Button>
        <Dialog open={openConfirmation} onClose={handleCloseConfirmation}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>Are you sure you want to delete?</DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseConfirmation} color="neutral">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirmDelete}
                    color="danger"
                    autoFocus
                  >
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>

          </Stack>

        }
                </Stack>
      </CardContent>
    </Card>
  );
};

export default BlogItem;
