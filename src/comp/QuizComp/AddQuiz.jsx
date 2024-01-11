import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Box, Grid, TextField } from '@mui/material';
import QuizModel from './QuizModel';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../firebase/Firebaseconfig';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Slider from 'react-slick';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddQuiz({ open, setOpen, mode, data }) {
    const [images, setImages] = React.useState([])
    const [questions, setQuestions] = React.useState([])
    const [QuizName, setQuizName] = React.useState("")
    const [Desc, setDesc] = React.useState("")
    const [date, setDate] = React.useState("");
    const [Price, setPrice] = React.useState("");
    const [Mode, setMode] = React.useState("Add Question");
    const [Data, SetData] = React.useState(null);
    const [openModel, setOpenModel] = React.useState(false)
    const [Delete, setDelete] = React.useState("");

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    React.useEffect(() => {
        if (data) {
            setImages(data.Image);
            setQuestions(data.Questions)
            setQuizName(data.QuizName)
            setDesc(data.Desc)
            setPrice(data.Price)
        }
    }, [data, mode])

    let Image = [];

    const handleClick = (e) => {
        setImages((prevImages) => prevImages.filter((i) => i.name !== e.name));
    };


    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        if (QuizName === "") {
            toast.error("Enter a valid Quiz name", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (Desc === "") {
            toast.error("Enter a valid Description", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (date === "") {
            toast.error("Enter a valid Date", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (Price === "") {
            toast.error("Enter a valid Price", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (questions.length < 5) {
            toast.error("Add minimum of 5 Questions", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            setOpen(false);
            if (mode === "Edit Quiz") {
                const Quiz = {
                    QuizName,
                    Desc,
                    Date: date,
                    Price,
                    Questions: questions,
                }
                updateDoc(doc(collection(db, "Quiz"), data.id), Quiz).then((e) => {
                    toast.success("Quiz Updated Successfully", {
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
            else if (mode === "Edit Past Quiz") {
                const Quiz = {
                    QuizName,
                    Desc,
                    Date: date,
                    Price,
                    Questions: questions,
                }
                updateDoc(doc(collection(db, "PastQuiz"), data.id), Quiz).then((e) => {
                    toast.success("Quiz Updated Successfully", {
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
                for (let i = 0; i < images.length; i++) {
                    const imgref = ref(storage, `/QuizImage/${Date.now()}`)
                    await uploadBytes(imgref, images[i]);
                    let url = await getDownloadURL(imgref)
                    Image[i] = url

                }
                const Quiz = {
                    QuizName,
                    Desc,
                    Date: date,
                    Price,
                    Questions: questions,
                    Image
                }
                addDoc(collection(db, "Quiz"), Quiz).then((e) => {
                    toast.success("Quiz added successfully", {
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

    const DeleteQuiz = async () => {
        if (Delete.trim() === data.QuizName) {
            setOpen(false)
            await deleteDoc(doc(collection(db, "PastQuiz"), data.id))
            toast.success("Quiz deleted successfully", {
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
        else {
            toast.error("Type Quiz Name to Delete Quiz", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }


    return (
        <React.Fragment>
            <QuizModel open={openModel} mode={Mode} data={Data} setOpen={setOpenModel} setQuestion={setQuestions} />
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <Typography sx={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} variant="h6" component="div">
                            {mode}
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div className='flex-1 flex items-center flex-col'>
                    <div className='flex-col w-screen sm:w-3/6 flex gap-4 items-center p-7'>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    value={QuizName}
                                    onChange={e => setQuizName(e.target.value)}
                                    label="Quiz name"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    sx={{ marginTop: 2 }}
                                    required
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                    type="date"
                                    fullWidth
                                    autoComplete="shipping address-level2"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    value={Desc}
                                    onChange={e => setDesc(e.target.value)}
                                    label="Quiz Description"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    value={Price}
                                    onChange={e => setPrice(e.target.value)}
                                    label="Price"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div className='flex-col  w-screen sm:w-3/6 flex gap-4 items-center p-7'>
                        {mode === "Add Quiz" &&
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
                        }
                        {mode === "Edit Past Quiz" &&
                            <Box className="w-full" sx={{marginTop:3,marginBottom:3}}>
                                <Slider {...settings}>
                                    {images.length > 0 ? images.map((e, i) => {
                                        console.log(e);
                                        return (
                                            <div key={i}>
                                                <img src={e} width={150} height={150} alt="" srcSet="" />
                                            </div>
                                        )
                                    }) : <img width={150} height={150} src="https://firebasestorage.googleapis.com/v0/b/aasf-c8e7f.appspot.com/o/image%2Faasf.jpeg?alt=media&token=b15f1b00-b8b4-4dcc-9c57-de348dab9f7b" alt="" srcSet="" />
                                    }
                                </Slider>
                            </Box>
                        }
                        {mode === "Edit Past Quiz" &&
                            <TextField
                                sx={{ marginTop: 4 }}
                                required
                                value={Delete}
                                onChange={e => setDelete(e.target.value)}
                                label="Type Quiz Name to delete quiz"
                                fullWidth
                                variant="outlined"
                            />
                        }
                        <div className='flex items-center justify-around w-full'>
                            <Button onClick={() => { SetData(null); setMode("Add Question"); setOpenModel(true) }} variant="contained" color="success">
                                Add Questions
                            </Button>
                            {mode === "Edit Past Quiz" &&
                                <Button onClick={DeleteQuiz} variant="contained" color="error">
                                    Delte Quiz
                                </Button>
                            }
                            <Button onClick={handleSave} variant="contained" color="success">
                                Save Quiz
                            </Button>
                        </div>
                    </div>
                    <div className='w-screen sm:w-3/6 flex flex-wrap gap-4 items-center p-7'>
                        {questions.map((e, i) => {
                            return (
                                <div key={i} onClick={() => { SetData(e); setMode("Update Question"); setOpenModel(true) }} className='rounded-full hover:cursor-pointer flex items-center justify-center bg-slate-200' style={{ height: 80, width: 80 }}>
                                    <h1 className='text-xl font-bold'>{`Q.${i + 1} `}</h1>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Dialog>
        </React.Fragment>
    );
}