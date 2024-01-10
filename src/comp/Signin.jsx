import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../firebase/Firebaseconfig';
import { useDispatch } from 'react-redux';
import { add, addEmail, addName, addPhotoURL, addUID } from '../redux/Auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, getDocs } from 'firebase/firestore';
import Cookies from 'js-cookie';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.linkedin.com/in/aksoni0520/">
                Creator
            </Link>{' '}
            {2024}
            {'.'}
        </Typography>
    );
}


const defaultTheme = createTheme();

export default function SignIn() {
    const [Memberdat, setMemberData] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            const dataRef = await getDocs(collection(db, "Members"));
            const Members = dataRef.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            setMemberData(Members);
        })()
    }, [])

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const provider = new GoogleAuthProvider();

    const handleSubmit = (event) => {
        event.preventDefault();
        signInWithPopup(auth, provider).then((result) => {
            // for (let i = 0; i < Memberdat.length; i++) {
            //     if (Memberdat[i].Email === result.user.email) {
            Cookies.set('Token', result.user.accessToken, { expires: 7 });
            Cookies.set('uid', result.user.uid, { expires: 7 });
            Cookies.set('email', result.user.email, { expires: 7 });
            Cookies.set('photoURL', result.user.photoURL, { expires: 7 });
            Cookies.set('Name', result.user.displayName, { expires: 7 });

            dispatch(add(result.user.accessToken));
            dispatch(addUID(result.user.uid));
            dispatch(addEmail(result.user.email));
            dispatch(addName(result.user.displayName));
            dispatch(addPhotoURL(result.user.photoURL));
            navigate(`/home/${result.user.uid}`);
            //     return;
            // }
            // }
            // alert("Authentication Failed");

        }).catch(error => {
            toast.success("Something went wrong", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        })
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <ToastContainer />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    className="h-screen"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-around'
                    }}
                >
                    <Box className="flex items-center justify-center flex-col">
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography className='font-bold' component="h1" variant="h5">
                            Admin Sign in to
                        </Typography>
                        <h1 className='font-bold text-wrap text-center'>
                            Abhigyan Abhikaushalam Students' Forum (AASF)
                        </h1>
                    </Box>
                    <div className='rounded-full overflow-hidden'><img src="aasf.jpeg" alt="" srcSet="" /></div>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In with Google
                            <img className='ml-3' src="google.png" alt="google" width={30} height={30} srcSet="" />
                        </Button>
                        <Grid container>
                            <div className=' w-full bg-black' style={{ height: 2 }}></div>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}