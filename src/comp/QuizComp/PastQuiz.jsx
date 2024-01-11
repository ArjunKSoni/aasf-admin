import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../components/Title';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/Firebaseconfig';
import AddQuiz from './AddQuiz';


export default function PastQuiz() {
  const [Quiz, SetEvents] = React.useState([])
  const [Data,SetData]=React.useState(null)
  const [open,setOpen]=React.useState(false)
  React.useEffect(() => {
    (async () => {
      const data = await getDocs(collection(db, "PastQuiz"));
      SetEvents(data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      );
    })()
  }, [])
  return (
    <React.Fragment>
      <AddQuiz open={open} setOpen={setOpen} mode={"Edit Past Quiz"} data={Data} />
      <Title>Past Quiz</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell className='smalldevicehide'>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Quiz.map((quiz) => (
            <TableRow className=' hover:cursor-pointer hover:bg-slate-200' key={quiz.id}>
              <TableCell onClick={()=>{SetData(quiz);setOpen(true)}} >{quiz.Date}</TableCell>
              <TableCell onClick={()=>{SetData(quiz);setOpen(true)}}>{quiz.QuizName}</TableCell>
              <TableCell className='smalldevicehide' onClick={()=>{SetData(quiz);setOpen(true)}}>{quiz.Desc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
