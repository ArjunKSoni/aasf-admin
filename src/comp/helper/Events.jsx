import * as React from 'react';
import Title from '../components/Title';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Button } from '@mui/material';
import AddEvent from '../components/AddEvent';
import { db } from '../../firebase/Firebaseconfig';
import { getDocs, doc, collection } from 'firebase/firestore';
import CarouselComponent from '../components/Slider';



export default function Events() {
  const [Events, SetEvents] = React.useState([])
  React.useEffect(() => {
    (async () => {
      const data = await getDocs(collection(db, "Event"));
      SetEvents(data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      );
    })()
  }, [])
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <React.Fragment>
      <div className='flex items-center justify-between'>
        <Title>Present Events</Title>
        <Button onClick={handleClickOpen} variant="contained"><AddBoxIcon className='font-bold text-2xl text-white' /></Button>
      </div>
      <AddEvent open={open} setOpen={setOpen} mode={"Add New Event"} data={null}/>
      <div>
        {Events[0] && <CarouselComponent Event={Events} />}
      </div>

    </React.Fragment>
  );
}