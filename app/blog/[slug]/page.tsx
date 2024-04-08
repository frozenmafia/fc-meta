import { BlogGetData } from "@/app/models/BlogGet";
import blogsecure from "@/app/services/blogSecure";
import { Card, CardMedia, Stack, Typography } from "@mui/material";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  // fetch data

  const response = await blogsecure.get(`/blogs/${params.slug}`);
  const blog = response.data;

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: blog.title,
    description: blog.content,
    keywords: blog.tags,
  };
}

const fetchBlog = async (blogSlug: string) => {
  const response = await blogsecure.get(`/blogs/${blogSlug}`); // Use slug directly
  return response.data as BlogGetData; // Assuming data property holds the blog data
};

const BlogPost = async ({ params: { slug } }: any) => {
  const blog: BlogGetData | undefined = await fetchBlog(slug); // Allow undefined blog

  const src =
    blog.thumbnail_url || "http://localhost:8004/images/cat1_5a31c9fd.png";

  if (!blog) {
    // Handle the case where the blog is not found (e.g., display error message)
    <div className="text-2xl">
      Showing the blog post for the slug <strong>{slug}</strong>
      <h1>Loading Blog</h1>
    </div>;
  }

  return (
    <Stack width="100%">
      <Stack
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
        position="relative" /* Maintain relative positioning for absolute children */
      >
        <Card
          style={{ padding: "16px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
        >
          <div style={{ position: "relative" }}>
            <CardMedia
              component="img"
              image={blog.thumbnail_url}
              title="Pancakes"
              alt="Pancakes"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
              }} // Optional styling
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                color: "white",
                textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
              }}
            >
              <Typography variant="h5" component="div" fontSize={"4rem"}>
                {blog.title}
              </Typography>
            </div>
          </div>
        </Card>
      </Stack>

      <div
        style={{
          marginTop: "20px",
          fontFamily: "Arial, sans-serif",
          fontSize: "16px",
          color: "#333",
          lineHeight: "1.6",
          backgroundColor: "white",
          padding: "10px",
        }}
        dangerouslySetInnerHTML={{
          __html: `
        <style>
          img {
            max-width: 100%;
            width:auto;
            height:auto
          }
        </style>
        ${blog.content || ""}
      `,
        }}
      />
    </Stack>
  );
};

export default BlogPost;
