import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Button, Grid, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/Firebaseconfig';

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

export default function AddMemberModel({ open, setOpen, mode, data }) {
    const handleClose = () => setOpen(false);
    const [Name, setName] = React.useState("")
    const [Email, setEmail] = React.useState("")
    const [Mobile, setMobile] = React.useState("")
    const [Position, setPosition] = React.useState("")
    const [Code, setCode] = React.useState("")

    React.useEffect(() => {
        if (data) {
            setName(data.Name)
            setEmail(data.Email)
            setPosition(data.Position)
            setMobile(data.Mobile)
        }
        else{
            setName("")
            setEmail("")
            setPosition("")
            setMobile("")
        }
        setCode("")
    }, [data, mode])

    const handlesave = async () => {
        if (Name === "" || Email === "" || Mobile === "" || Position === "") {
            toast.error("All fields are required", {
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
        else if (Mobile.trim().length !== 10) {
            toast.error("Enter Valid Mobile Number", {
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
        else if (Code.trim() === "20marchAasf@op") {
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
            const User = {
                Name,
                Email,
                Mobile,
                Position
            }
            if (mode === "Update") {
                updateDoc(doc(collection(db, "Members"), data.id), User).then((e) => {
                    toast.success("User Updated Successfully", {
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
                addDoc(collection(db, "Members"), User).then((e) => {
                    toast.success("User added successfully", {
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
        } else {
            toast.error("Not Authorized to Add Users", {
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

    const handleDelete=async()=>{
        if (Code.trim() === "20marchAasf@op"){
            await deleteDoc(doc(collection(db, "Members"), data.id))
            toast.success("User deleted successfully", {
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

        }else{
            toast.error("Not Authorized to Delete Users", {
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
                                    value={Name}
                                    onChange={e => setName(e.target.value)}
                                    label="Enter Name of Member"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    value={Email}
                                    onChange={e => setEmail(e.target.value)}
                                    type="email"
                                    label="Email"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    value={Mobile}
                                    onChange={e => setMobile(e.target.value)}
                                    label="Mobile"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    value={Position}
                                    onChange={e => setPosition(e.target.value)}
                                    label="Position"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            sx={{ marginTop: 5, color: "red" }}
                            required
                            value={Code}
                            onChange={e => setCode(e.target.value)}
                            label="Type AASF Admin Code to Add User"
                            type="password"
                            fullWidth
                            variant="outlined"
                        />
                        <div className='flex w-full items-center justify-around mt-4'>
                            <Button onClick={handlesave} variant="contained" color="success">
                                {mode} User
                            </Button>
                            {mode === "Update" &&
                                <Button onClick={handleDelete} variant="contained" color="error">
                                    Delete User
                                </Button>
                            }
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}