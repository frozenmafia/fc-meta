import TagOutput from "@/app/components/Tags/TagOutput";
import { BlogGetData } from "@/app/models/BlogGet";
import blogsecure from "@/app/services/blogSecure";
import { Stack, Typography, keyframes } from "@mui/material";
import Image from "next/image";
import AspectRatio from "@mui/joy/AspectRatio";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  // fetch data

  const response = await blogsecure.get(`/blogs/${params.slug}`); 
  const blog = response.data

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: blog.title,
    description:blog.content,
    keywords:blog.tags
  }
}

const fetchBlog = async (blogSlug: string) => {
  const response = await blogsecure.get(`/blogs/${blogSlug}`); // Use slug directly
  return response.data as BlogGetData; // Assuming data property holds the blog data
};

const BlogPost = async ({ params: { slug } }: any) => {
  const blog: BlogGetData | undefined = await fetchBlog(slug); // Allow undefined blog

  if (!blog) {
    // Handle the case where the blog is not found (e.g., display error message)
    <div className="text-2xl">
      Showing the blog post for the slug <strong>{slug}</strong>
      <h1>Loading Blog</h1>
    </div>;
  }

  return (
    <Stack
      // width={"100vw"}
      width={"100%"}
    >
<Stack width={"100%"} /* Other styles */>
  <AspectRatio sx={{ position: "relative" }}>
    <Image
      src={`/images/im${blog.thumbnail_id}.jpeg`}
      width={1920}
      height={1080}
      alt="image"
    />
    <Stack
      direction="row"
      spacing={2}
      justifyContent="space-around"
      alignItems="center"
      position="absolute"
      top={200}
      width={"100%"}
    >
      <Stack width={"60%"} height={"100%"} style={{ overflowWrap: "break-word" }}>
        {/* Adjust width and use overflowWrap for text wrapping */}
        <Typography
          variant="h1"
          style={{
            color: "white",
            fontSize: "4rem",
            wordWrap: "break-word",
          }}
        >
          {/* Very long text */}
          {blog.title}
        </Typography>
      </Stack>
      <TagOutput tags={blog.tags} col="white" />
    </Stack>
  </AspectRatio>
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
