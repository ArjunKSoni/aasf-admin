import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { add, addEmail, addName, addPhotoURL, addUID } from '../../redux/Auth';
import { useNavigate } from 'react-router-dom';
import MembersList from '../Members';
import Cookies from 'js-cookie';


export const MainListItems = ()=>{
    const navigate=useNavigate();
    const [menberOpen,SetMemberOpen]=React.useState(false);
    const uid=useSelector((state)=>state.Token.Uid)

return(
  <React.Fragment>
    <MembersList open={menberOpen} setOpen={SetMemberOpen}/>
    <ListItemButton onClick={()=>navigate(`/home/${uid}`)}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton onClick={()=>navigate(`/quiz/${uid}`)}>
      <ListItemIcon>
      <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Add Quiz" />
    </ListItemButton>
    <ListItemButton onClick={()=>SetMemberOpen(true)}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Members" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Participants" />
    </ListItemButton>
  </React.Fragment>
)};

export const SecondaryListItems = ()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleLogout=()=>{
        dispatch(addUID(""));
        dispatch(addEmail(""));
        dispatch(addName(""));
        dispatch(addPhotoURL(""));
        dispatch(add(""));
        Cookies.remove("Token")
        Cookies.remove("uid")
        Cookies.remove("Name")
        Cookies.remove("email")
        Cookies.remove("photoURL")
        navigate("/")
    }
    return(
  <React.Fragment>
    <ListSubheader component="div" inset>
      Auth Requirements
    </ListSubheader>
    <ListItemButton onClick={handleLogout} >
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout"/>
    </ListItemButton>
  </React.Fragment>
)};