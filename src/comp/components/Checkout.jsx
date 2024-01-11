import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import EventDesc from './EventDesc';
import ImageUpload from './ImageUpload';
import { db, storage } from '../../firebase/Firebaseconfig';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Review from './Review';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.linkedin.com/in/aksoni0520/">
                Creator
            </Link>{' '}
            {2024}
            {'.'}
        </Typography>
    );
}

const steps = ['Event Description', 'Image Upload'];

function getStepContent(step, EventName, setEventName, Mode, setMode, Venue, setVenue, Desc, setDesc, date, setDate, images, setImages) {
    switch (step) {
        case 0:
            return <EventDesc EventName={EventName} setEventName={setEventName} Mode={Mode} setMode={setMode} Venue={Venue} setVenue={setVenue} Desc={Desc} setDesc={setDesc} Date={date} setDate={setDate} />;
        case 1:
            return <ImageUpload images={images} setImages={setImages} />;
        // case 2:
        //     return <Review />;
        default:
            throw new Error('Unknown step');
    }
}

export default function Checkout({ mode, data, setOpen }) {
    const [EventName, setEventName] = React.useState("");
    const [Mode, setMode] = React.useState("");
    const [Venue, setVenue] = React.useState("");
    const [Desc, setDesc] = React.useState("");
    const [date, setDate] = React.useState("Upcoming");
    const [images, setImages] = React.useState([]);
    const [activeStep, setActiveStep] = React.useState(0);
    let Image = [];

    React.useEffect(() => {
        if (data != null) {
            setEventName(data.EventName);
            setMode(data.Mode)
            setVenue(data.Venue)
            setDesc(data.Desc)
            setDate(data.date)
        }
    }, [])

    const handleNext = async () => {
        setActiveStep(activeStep + 1);
        if (activeStep === 1) {

            if (EventName === "") {
                toast.error("Add Event Name", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setActiveStep(activeStep - 1);
            }
            else if (Desc === "") {
                toast.error("Add Event Desc", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setActiveStep(activeStep - 1);

            }else if (Venue === "") {
                toast.error("Add Event Venue", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setActiveStep(activeStep - 1);
            }
            else {
                setOpen(false)
                toast.success("Your Request will be completed in few seconds", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                for (let i = 0; i < images.length; i++) {
                    const imgref = ref(storage, `/image/${Date.now()}`)
                    await uploadBytes(imgref, images[i]);
                    let url = await getDownloadURL(imgref)
                    Image[i] = url

                }
                if (Image) {
                    const Event = {
                        EventName,
                        Mode,
                        Venue,
                        Desc,
                        date,
                        Image
                    }
                    if (mode === "Update Event") {
                        Event.Image = Image;
                        updateDoc(doc(collection(db, "Event"), data.id), Event).then((e) => {
                            toast.success("Event Updated Successfully", {
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
                        }).catch((error) => {
                            console.log(error);
                        });

                    }
                    else if (mode === "Edit Past Event") {
                        Event.Image = Image;
                        updateDoc(doc(collection(db, "PastEvent"), data.id), Event).then((e) => {
                            toast.success("Event Updated Successfully", {
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
                        }).catch((error) => {
                            console.log(error);
                        });
                    }
                    else {
                        addDoc(collection(db, "Event"), Event).then((e) => {
                            toast.success("Event added successfully", {
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
                        }).catch((error) => {
                            console.log(error);
                        });
                    }
                }
            }

        }
    };
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar>
                    <h1 className='text-center w-full font-bold text-xl' >
                        Abhigyan Abhikaushalam Students' Forum
                    </h1>
                </Toolbar>
            </AppBar>
            <div component="main" className='xl:w-3/4'>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        {mode}
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Thank you for Adding Event.
                            </Typography>
                            <Typography variant="subtitle1">
                                Your Event will be updated in few seconds.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep, EventName, setEventName, Mode, setMode, Venue, setVenue, Desc, setDesc, date, setDate, images, setImages)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}

                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep === steps.length - 1 ? 'Save' : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
                <Copyright />
            </div>
        </React.Fragment>
    );
}