import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Button, Grid, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function QuizModel({ open, setOpen, data, setQuestion, mode }) {
    const handleClose = () => setOpen(false);
    const [queston, setquestion] = React.useState("")
    const [option1, setOption1] = React.useState("")
    const [option2, setOption2] = React.useState("")
    const [option3, setOption3] = React.useState("")
    const [option4, setOption4] = React.useState("")
    const [correctans, setCorrectAns] = React.useState("")
    const [confirmDetele, setconfirmDetele] = React.useState("")

    React.useEffect(() => {
        if (data) {
            setquestion(data.Question)
            setOption1(data.Option1)
            setOption2(data.Option2)
            setOption3(data.Option3)
            setOption4(data.Option4)
            setCorrectAns(data.CorrectAns)
        } else {
            setquestion("")
            setOption1("")
            setOption2("")
            setOption3("")
            setOption4("")
            setCorrectAns("")
        }
        setconfirmDetele("")
    }, [data,mode])

    const handlesave = async () => {
        if (queston === "" || option1 === "" || option2 === "" || option3 === "" || option4 === "" || correctans === "") {
            alert("All fields required");
        }
        else if (correctans < 1 || correctans > 4) {
            alert("invalid correct ans field")
        }
        else if (mode === "Update Question") {
            const Ques = {
                Question: queston,
                Option1: option1,
                Option2: option2,
                Option3: option3,
                Option4: option4,
                CorrectAns: correctans
            }
            setQuestion((prevArray) =>
                prevArray.map((item) =>
                    item.Question === data.Question ? Ques : item
                ))
            toast.success("Question updated successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setOpen(false)
        }
        else {
            const Ques = {
                Question: queston,
                Option1: option1,
                Option2: option2,
                Option3: option3,
                Option4: option4,
                CorrectAns: correctans
            }
            setQuestion((prevques) => [...prevques, Ques])
            setquestion("")
            setOption1("")
            setOption2("")
            setOption3("")
            setOption4("")
            setCorrectAns("")
            setOpen(false);
        }
    }

    const handleDelete = async () => {
        if (confirmDetele.trim() === "yes" || confirmDetele.trim() === "Yes") {
            setQuestion((prevques) => prevques.filter((ques) => ques.Question !== data.Question))
            setOpen(false);
            toast.success("Question removed successfully", {
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
            toast.error("Type Yes to remove question", {
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
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    value={queston}
                                    onChange={e => setquestion(e.target.value)}
                                    label="Question"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    value={option1}
                                    onChange={e => setOption1(e.target.value)}
                                    label="Option 1"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    value={option2}
                                    onChange={e => setOption2(e.target.value)}
                                    label="Option 2"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    value={option3}
                                    onChange={e => setOption3(e.target.value)}
                                    label="Option 3"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    value={option4}
                                    onChange={e => setOption4(e.target.value)}
                                    label="Option 4"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    value={correctans}
                                    onChange={e => setCorrectAns(e.target.value)}
                                    label="Type Correct option number"
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                        </Grid>
                        {mode === "Update Question" && <TextField
                            sx={{ marginTop: 5, color: "red" }}
                            required
                            value={confirmDetele}
                            onChange={e => setconfirmDetele(e.target.value)}
                            label="Type yes to delete the question"
                            type="string"
                            fullWidth
                            variant="outlined"
                        />}
                        <div className='flex w-full items-center justify-around mt-4'>
                            <Button onClick={handlesave} variant="contained" color="success">
                                {mode}
                            </Button>
                            {mode === "Update Question" &&
                                <Button onClick={handleDelete} variant="contained" color="error">
                                    Delete Question
                                </Button>
                            }
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}