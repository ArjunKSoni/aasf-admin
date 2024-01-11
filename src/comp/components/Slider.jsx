import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Paper, Container, Button } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AddEvent from './AddEvent';
import { collection,doc,deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/Firebaseconfig';

const CarouselComponent = ({ Event }) => {
  const [open,setOpen]=useState(false);
  const [data,setDate]=useState([])
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
  };

  const addTOPast=async(event)=>{
    const dataRef=doc(collection(db,"Event"),event.id)
    await deleteDoc(dataRef);
    await addDoc(collection(db,"PastEvent"),event);
    window.location.reload();
  }

  return (
    <div className='w-full h-full' >
      <Slider {...settings}>
        {Event.map((event,i) => {
          return (
            <Paper key={i}>
              <AddEvent open={open} setOpen={setOpen} mode={"Update Event"} data={data}/>
              <div className='flex items-start flex-wrap-reverse justify-between'>
                <div className='items-center'>
                  <h1 className='text-xl font-bold'>{event.EventName}</h1>
                  <div className='flex gap-5 justify-around'>
                    <h1>{event.Mode}</h1>
                    <h1>Venue:- {event.Venue}</h1>
                  </div>
                  <div className='flex gap-5 justify-around'>
                    <h1>{event.date}</h1>
                  </div>
                  <div className='flex gap-3 flex-col'>
                    <Button onClick={()=>{setDate(Event[i]); setOpen(true)}} variant="contained" color="success">
                      Edit
                    </Button>
                    <Button onClick={()=>addTOPast(Event[i])} variant="contained" color="error">
                      Add to past
                    </Button>
                  </div>
                </div>
                <div className='flex-1 flex items-center justify-evenly'>
                  {event.Image.length>0?event.Image.map((e,i) => {
                    return (
                      <div key={i}>
                        <img src={e} width={150} height={150} alt="" srcSet="" />
                      </div>
                    )
                  }):
                  <img width={150} height={150} src="https://firebasestorage.googleapis.com/v0/b/aasf-c8e7f.appspot.com/o/image%2Faasf.jpeg?alt=media&token=b15f1b00-b8b4-4dcc-9c57-de348dab9f7b" alt="" srcSet="" />
                  }
                </div>
              </div>
            </Paper>
          )
        })}
      </Slider>
    </div>
  );
};

export default CarouselComponent;
