import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from '../components/Title';
import { useSelector } from 'react-redux';


export default function Profile() {
    const Email = useSelector((state) => state.Token.Email);
    const Name = useSelector((state) => state.Token.Name);
    const PhotoURL = useSelector((state) => state.Token.PhotoURL);
  return (
    <React.Fragment>
      <Title>Profile</Title>
      {PhotoURL!=="" &&<div className='rounded-full overflow-hidden flex items-center justify-center'><img className='rounded-lg' src={PhotoURL} alt="" srcSet="" /></div>}
      <Typography className='text-center' component="p" variant="h6">
        {Name}
      </Typography>
      <Typography className='text-center' color="text.secondary" sx={{ flex: 1 }}>
        {Email}
      </Typography>
    </React.Fragment>
  );
}