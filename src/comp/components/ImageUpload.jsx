import * as React from 'react';
import Typography from '@mui/material/Typography';

export default function ImageUpload({ images, setImages }) {
  const handleClick = (e) => {
    setImages((prevImages) => prevImages.filter((i) => i.name !== e.name));
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Upload Image
      </Typography>
      <input
        type="file"
        onChange={(e) => {
          setImages([...images, ...e.target.files]);
        }}
      />
      <div className='flex gap-3 m-3 flex-wrap items-center justify-center'>
        {images.map((e, index) => {
          const imageUrl = URL.createObjectURL(e);
          return (
            <img key={index} src={imageUrl} alt="" width={100} onClick={() => handleClick(e)} height={100} />
          );
        })}
      </div>
      <h1 className='text-green-300'>select multiple images*</h1>
      <h1 className='text-red-300'>click on the image to remove it from stack*</h1>
    </React.Fragment>
  );
}
