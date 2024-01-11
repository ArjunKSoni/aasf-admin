import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../components/Title';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/Firebaseconfig';
import AddEvent from '../components/AddEvent';
import TransitionsModal from '../components/Model';
import { Button } from '@mui/material';


export default function PastEvents() {
  const [Events, SetEvents] = React.useState([])
  const [Data,SetData]=React.useState(null)
  const [open,setOpen]=React.useState(false)
  const [editopen,setEditOpen]=React.useState(false)
  React.useEffect(() => {
    (async () => {
      const data = await getDocs(collection(db, "PastEvent"));
      SetEvents(data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      );
    })()
  }, [])
  return (
    <React.Fragment>
      <TransitionsModal open={open} setOpen={setOpen} data={Data} />
      <AddEvent open={editopen} setOpen={setEditOpen} mode={"Edit Past Event"} data={Data}/>
      <Title>Past Events</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell className='smalldevicehide'>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Events.map((event) => (
            <TableRow className=' hover:cursor-pointer hover:bg-slate-200' key={event.id}>
              <TableCell onClick={()=>{SetData(event);setOpen(true)}} >{event.date}</TableCell>
              <TableCell onClick={()=>{SetData(event);setOpen(true)}}>{event.EventName}</TableCell>
              <TableCell className='smalldevicehide' onClick={()=>{SetData(event);setOpen(true)}}>{event.Desc}</TableCell>
              <TableCell onClick={()=>{SetData(event); setEditOpen(true)}}><Button variant="text">Edit</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
