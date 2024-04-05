import { Box, Button, Grid } from "@mui/material";
import Link from "next/link";
import BlogItem from "./components/BlogItem/BlogItem";
import { BlogGetData } from "./models/BlogGet";
import blogsecure from "./services/blogSecure";

const fetchData = async () => {
  const response = await blogsecure.get('/blogs/fetch_all'); // Replace with your API endpoint

  if(response.status!=200){
    throw new Error("failed to fetch API data");
  }
  return response.data;
};

const Home = async () => {
  const blogs = await fetchData();

  return (
    <Box sx={{ position: 'relative', height: '100%' }}>
      <Link href={"blog/create"}>
      <Button sx={{ position: 'fixed', bottom: 100, right: 16 , zIndex:2}} variant="contained">
        Create blog
      </Button>
      </Link>

      <Grid container spacing={2}> {/* Add spacing between grid items */}
        {blogs.map((blog: BlogGetData) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id} display={"flex"} justifyContent={"center"}> {/* Set grid size based on screen size */}
            <BlogItem blog={blog} />
          </Grid>
        ))
        }
      </Grid>
    </Box>
  );
};

export default Home;
