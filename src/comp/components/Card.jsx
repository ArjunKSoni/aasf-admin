import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Slider from 'react-slick';
import { db } from '../../firebase/Firebaseconfig';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MediaCard({ data }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };
    const DeletePastEvent = async (event) => {
        const dataRef = doc(collection(db, "PastEvent"), data.id)
        await deleteDoc(dataRef);
        toast.success("Past Event Deleted Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        window.location.reload();
    }
    return (
        <div className='flex-1'>
            <div className='items-center overflow-hidden justify-center'>
                <Slider {...settings}>

                    {data.Image.length > 0 ? data.Image.map((e, i) => {
                        return (
                            <img key={i} width={100} height={100} src={e} alt="" srcSet="" />
                        )
                    }) :
                        <img width={100} height={100} src="https://firebasestorage.googleapis.com/v0/b/aasf-c8e7f.appspot.com/o/image%2Faasf.jpeg?alt=media&token=b15f1b00-b8b4-4dcc-9c57-de348dab9f7b" alt="" srcSet="" />
                    }
                </Slider>
            </div>
            <CardContent>
                <Typography gutterBottom variant="h4" component="p">
                    {data.EventName}
                </Typography>
                <Typography sx={{ textWrap: "wrap" }} variant="body2" color="text.secondary">
                    {data.Desc}
                </Typography>
            </CardContent>
            <CardActions className='flex  justify-between'>
                <h1>{data.date}</h1>
                <h1>{data.Venue}</h1>
            </CardActions>
            <div className='flex items-center justify-center'>
                <Button onClick={DeletePastEvent} variant="contained" color='error'>Delete</Button>
            </div>

        </div>
    );
}