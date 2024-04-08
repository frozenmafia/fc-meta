import React, { useState, ChangeEvent } from "react";
import { Button, Typography, Card, CardMedia, Stack } from "@mui/material";

interface UploadFormProps {
  file: File | null;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UploadForm = ({ file, handleFileChange } : UploadFormProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      handleFileChange(event);
    }
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center" justifyContent={"space-between"} width={"100%"}>
      <Stack>
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
        <br />
        {file && (
          <div>
            <Typography variant="h6" gutterBottom>
              Selected File:
            </Typography>
            <Typography>{file.name}</Typography>
            <Typography>Type: {file.type}</Typography>
            <Typography>Size: {file.size} bytes</Typography>
          </div>
        )}
        <br />
        <Button
          variant="contained"
          disabled={!file}
        >
          Upload
        </Button>
      </Stack>
      {previewUrl && (
        <Card sx={{ maxWidth: "50%" }}>
          <CardMedia
            component="img"
            image={previewUrl}
            alt="Selected Image"
          />
        </Card>
      )}
    </Stack>
  );
};

export default UploadForm;