import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../components/Title';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/Firebaseconfig';
import { Button } from '@mui/material';


export default function PastQuiz() {
  const [Quiz, SetQuiz] = React.useState([])
  const [Data,SetData]=React.useState(null)
  // const [open,setOpen]=React.useState(false)
  // const [editopen,setEditOpen]=React.useState(false)
  React.useEffect(() => {
    (async () => {
      const data = await getDocs(collection(db, "PastQuiz"));
      SetQuiz(data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      );
    })()
  }, [])
  return (
    <React.Fragment>
      {/* <TransitionsModal open={open} setOpen={setOpen} data={Data} />
      <AddEvent open={editopen} setOpen={setEditOpen} mode={"Edit Past Event"} data={Data}/> */}
      <Title>Past Quizzes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Quiz.map((quiz) => (
            <TableRow className=' hover:cursor-pointer hover:bg-slate-200' key={quiz.id}>
              <TableCell onClick={()=>{SetData(quiz);}} >{quiz.date}</TableCell>
              <TableCell onClick={()=>{SetData(quiz);}}>{quiz.EventName}</TableCell>
              <TableCell onClick={()=>{SetData(quiz);}}>{quiz.Desc}</TableCell>
              <TableCell onClick={()=>{SetData(quiz);}}><Button variant="text">Edit</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}