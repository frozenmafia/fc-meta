import React from 'react';
import ImageListRenderer from '../ImageListRenderer/ImageListRenderer'


interface ThumbnailUploaderProps {
    handleImageChange: (event: number) => void;
    thumbnail_id: number;
  }

  const ThumbnailUploader: React.FC<ThumbnailUploaderProps> = ({ handleImageChange, thumbnail_id }) => {
 
  return (
    <>
      <ImageListRenderer handleImageChange={handleImageChange} thumbnail_id={thumbnail_id} />
    </>

  )
}

export default ThumbnailUploader