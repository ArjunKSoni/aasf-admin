import * as React from 'react';
import Dialog from '@mui/material/Dialog';
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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddMemberModel from './helper/AddMemberModel';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function MembersList({ open, setOpen }) {
    const [Memberdata, setMemberData] = React.useState([]);
    const [add,setAdd]=React.useState(false)
    const [mode,setMode]=React.useState("Add")
    const [data,setData]=React.useState(null)

    React.useEffect(() => {
        (async () => {
            const dataRef =await getDocs(collection(db, "Members"));
            const Members=await dataRef.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            setMemberData(Members);
        })()
    }, [data])

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
                            <h1 className='text-xl hidden sm:block flex-1 text-center font-bold'>Email</h1>
                            <h1 className='text-xl hidden sm:block flex-1 text-center font-bold'>Mobile number</h1>
                            <h1 className='text-xl flex-1 text-center font-bold'>Position</h1>
                        </div>
                    </ListItem>
                    <Divider />
                    
                    {Memberdata.map((e,i) => {
                        return (
                            <div key={i} className='hover:bg-slate-200 hover:cursor-pointer' onClick={()=>{setMode("Update");setData(e);setAdd(true)}}>
                                <ListItem>
                                    <div className='flex flex-wrap w-full items-center justify-around'>
                                        <h1 className='text-lg text-gray-500 flex-1 text-center font-bold'>{e.Name}</h1>
                                        <h1 className='text-lg hidden sm:block text-gray-500 flex-1 text-center font-bold'>{e.Email}</h1>
                                        <h1 className='text-lg hidden sm:block text-gray-500 flex-1 text-center font-bold'>{e.Mobile}</h1>
                                        <h1 className='text-lg text-gray-500 flex-1 text-center font-bold'>{e.Position}</h1>
                                    </div>
                                </ListItem>
                                <Divider />
                            </div>
                        )
                    })}

                </List>
                <AddMemberModel open={add} setOpen={setAdd} data={data} mode={mode} />
                <div onClick={()=>{setData(null);setMode("Add");setAdd(true);}} className='rounded-full hover:cursor-pointer z-50 absolute bottom-12 right-12 bg-green-500 flex items-center justify-center' style={{width:80,height:80}}><PersonAddIcon className='text-white font-bold text-xl' /></div>
            </Dialog>
        </React.Fragment>
    );
}