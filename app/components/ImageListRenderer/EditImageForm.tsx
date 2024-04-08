import React, { useState, ChangeEvent } from "react";
import { Button, Typography, Card, CardMedia, Stack, Divider } from "@mui/material";
import { useAppSelector } from "@/lib/hooks";

interface EditImageFormProps {
  file: File | null;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const EditImageForm = ({ file, handleFileChange }: EditImageFormProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const blog = useAppSelector(state => state.blogs.current_blog);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      handleFileChange(event);
    }
  };

  return (
    <Stack direction="row" spacing={4} alignItems="center" justifyContent="space-between" width="100%">
      {/* Image Upload Section */}
      <Stack width="40%" spacing={2}>
        <Typography variant="h5" gutterBottom>
          Upload Photo
        </Typography>
        <input
          accept="image/*"
          id="contained-button-file"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" component="span">
            Choose File
          </Button>
        </label>
        <Divider />
        {file && (
          <Stack spacing={1}>
            <Typography variant="subtitle1">Selected File:</Typography>
            <Typography>{file.name}</Typography>
            <Typography>Type: {file.type}</Typography>
            <Typography>Size: {file.size} bytes</Typography>
          </Stack>
        )}
        <Divider />
      </Stack>

      {/* Image Display Section */}
      <Stack width="30%">
        <Typography variant="h5" gutterBottom>
          Previous
        </Typography>
        <Card sx={{ maxWidth: "100%" }}>
          <CardMedia
            component="img"
            image={blog?.thumbnail_url || "/placeholder-image.jpg"} // Provide a placeholder image URL
            alt="Previous Image"
          />
        </Card>
      </Stack>

      <Stack width="30%">
 
        {previewUrl && (
            <>
               <Typography variant="h5" gutterBottom>
          Current
        </Typography>
                     <Card sx={{ maxWidth: "100%" }}>
            <CardMedia
              component="img"
              image={previewUrl}
              alt="Selected Image"
            />
          </Card>
            </>
 
        )}
      </Stack>
    </Stack>
  );
};

export default EditImageForm;
