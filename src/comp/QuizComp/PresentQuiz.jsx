import * as React from 'react';
import Title from '../components/Title';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Button } from '@mui/material';
// import AddEvent from '../components/AddEvent';
import { db } from '../../firebase/Firebaseconfig';
import { getDocs, doc, collection, deleteDoc, addDoc } from 'firebase/firestore';
import AddQuiz from './AddQuiz';
import Slider from 'react-slick';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function PresentQuiz() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  const [data, setData] = React.useState(null)
  const [Quiz, setQuiz] = React.useState([])
  const [mode, setMode] = React.useState("")

  React.useEffect(() => {
    (async () => {
      const data = await getDocs(collection(db, "Quiz"));
      setQuiz(data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      );
    })()
  }, [])
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setData(null);
    setMode("Add Quiz")
    setOpen(true);
  };

  const addTOPast = async () => {
    toast.success("Quiz will be added to past Quiz in few seconds", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    const dataRef = doc(collection(db, "Quiz"), Quiz[0].id)
    await deleteDoc(dataRef);
    await addDoc(collection(db, "PastQuiz"), Quiz[0]);
    window.location.reload();
  }

  return (
    <React.Fragment>
      <AddQuiz open={open} setOpen={setOpen} mode={mode} data={data} />
      <div className='flex items-center justify-between'>
        <Title>Present Quiz</Title>
        <Button onClick={handleClickOpen} variant="contained"><AddBoxIcon className='font-bold text-2xl text-white' /></Button>
      </div>
      {Quiz[0] &&
        <div className='flex h-full w-full items-start'>
          <div className='flex flex-col w-1/2 items-start justify-center'>
            <h1 className='text-2xl  font-bold'>{Quiz[0].QuizName}</h1>
            <div className='flex items-center gap-10'>
              <h1>{Quiz[0].Date}</h1>
              <h1>{Quiz[0].Price} Rs</h1>
            </div>
            <div className='flex gap-3 flex-col'>
              <Button onClick={() => { setMode("Edit Quiz"); setData(Quiz[0]); setOpen(true) }} variant="contained" color="success">
                Edit
              </Button>
              <Button onClick={() => addTOPast()} variant="contained" color="error">
                Add to past
              </Button>
            </div>
          </div>
          <div className='flex w-1/2 h-full items-center justify-center'>
            <Slider {...settings}>
              {Quiz[0].Image.length > 0 ? Quiz[0].Image.map((e, i) => {
                return (
                  <div key={i}>
                    <img src={e} width={150} height={150} alt="" srcSet="" />
                  </div>
                )
              }) :<img width={150} height={150} src="https://firebasestorage.googleapis.com/v0/b/aasf-c8e7f.appspot.com/o/image%2Faasf.jpeg?alt=media&token=b15f1b00-b8b4-4dcc-9c57-de348dab9f7b" alt="" srcSet="" />
              }
            </Slider>
          </div>
        </div>
      }

    </React.Fragment>
  );
}