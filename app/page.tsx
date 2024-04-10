"use client";
import { Box, Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import BlogItem from "./components/BlogItem/BlogItem";
import { BlogGetData } from "./models/BlogGet";
import blogsecure from "./services/blogSecure";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchAllBlogs } from "@/lib/feature/blogs/blogFetchSlice";
import { CircularProgress } from '@mui/material';



const Home = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const blogs = useAppSelector((state) => state.blogs.blogs);
  const current_user = useAppSelector(state=>state.auth.user);
  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [router]);

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
    {current_user?.username && (
      <Link href={"blog/create"}>
        <Button
          sx={{ position: "fixed", bottom: 100, right: 16, zIndex: 2 }}
          variant="contained"
        >
          Create blog
        </Button>
      </Link>
    )}
    {blogs ? (
      <Grid container spacing={2}>
        {/* Add spacing between grid items */}
        {blogs.map((blog: BlogGetData) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={blog.id}
            display={"flex"}
            justifyContent={"center"}
          >
            {/* Set grid size based on screen size */}
            <BlogItem key={blog.id} blog={blog} />
          </Grid>
        ))}
      </Grid>
    ) : (
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <CircularProgress />
      </Box>
    )}
  </Box>
  );
};

export default Home;
