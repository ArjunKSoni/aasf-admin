import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { db } from '../firebase/Firebaseconfig';
import { getDocs, collection } from 'firebase/firestore';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function MembersList({ open, setOpen }) {
    const [Memberdata, setMemberData] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            const dataRef =await getDocs(collection(db, "Members"));
            const Members=await dataRef.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            setMemberData(Members);
        })()
    }, [])

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Active Members
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

                <List>
                    <Divider />
                    <ListItem>
                        <div className='flex flex-wrap w-full items-center justify-around'>
                            <h1 className='text-xl flex-1 text-center font-bold'>Name</h1>
                            <h1 className='text-xl flex-1 text-center font-bold'>Email</h1>
                            <h1 className='text-xl flex-1 text-center font-bold'>Mobile number</h1>
                            <h1 className='text-xl flex-1 text-center font-bold'>Position</h1>
                        </div>
                    </ListItem>
                    <Divider />
                    {Memberdata.map((e,i) => {
                        return (
                            <div key={i}>
                                <ListItem>
                                    <div className='flex flex-wrap w-full items-center justify-around'>
                                        <h1 className='text-lg text-gray-500 flex-1 text-center font-bold'>{e.Name}</h1>
                                        <h1 className='text-lg text-gray-500 flex-1 text-center font-bold'>{e.Email}</h1>
                                        <h1 className='text-lg text-gray-500 flex-1 text-center font-bold'>{e.Mobile}</h1>
                                        <h1 className='text-lg text-gray-500 flex-1 text-center font-bold'>{e.Position}</h1>
                                    </div>
                                </ListItem>
                                <Divider />
                            </div>
                        )
                    })}

                </List>

            </Dialog>
        </React.Fragment>
    );
}