import { Stack } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import * as React from 'react';

interface ImageListRendererProps {
  handleImageChange : (index : number) =>void;
  thumbnail_id : number
}
 const ImageListRenderer: React.FC<ImageListRendererProps> = ({handleImageChange, thumbnail_id})=>{
  const [selectedImage, setSelectedImage] = React.useState(thumbnail_id);

  const itemData = Array.from(Array(32).keys()).map((index) => {
    const imageName = `im${index}.jpeg`;
    return {
      img: `/images/${imageName}`,
      title: `Image ${index + 1}`,
    };
  });

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
    handleImageChange(index);
    // console.log(index);
  };


  return (
    <Stack direction={"row"} alignItems={"center"} spacing={2} width={"100%"} justifyContent={"space-between"}
     sx={{ 
      // overflowX: "auto"
     }}
     >
      {/* Adjusting the image size to fit the container */}
      <img 
      src={`${itemData[selectedImage].img}`} alt={`${itemData[selectedImage].title}`} 
      loading="lazy" height={"200px"} style={{ maxWidth: "50%", height: "auto" }} />
  
      <Stack sx={{
        width: "50%",
      }}>
        <ImageList sx={{
          gridAutoFlow: "column",
          gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr)) !important",
          gridAutoColumns: "minmax(160px, 1fr)"
        }} cols={3} rowHeight={164}>
          {itemData.map((item, index) => (
            <ImageListItem
              key={item.img}
              sx={{
                border: index === selectedImage ? '2px solid red' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => handleImageClick(index)}
            >
              {/* Adjusting the image size in the image list */}
              <img src={`${item.img}`} alt={item.title} loading="lazy" style={{ maxWidth: "100%", height: "auto" }} />
            </ImageListItem>
          ))}
        </ImageList>
      </Stack>
  
      <Stack>
        {/* Add your additional content here */}
      </Stack>
    </Stack>
  );
  
}

export default ImageListRenderer;
