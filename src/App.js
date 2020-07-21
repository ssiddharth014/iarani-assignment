import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useSelector, useDispatch } from 'react-redux';
import Header from './Header.js'



import NotesList from './NotesList'



import { create,getnotes} from './actions/noteAction';
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

export default function App() {
  const classes = useStyles();
  const notes = useSelector(state => state.notes);
  const { notesList } = notes;
  const dispatch = useDispatch();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [title,setTitle] = React.useState('')
  const [description,setDescription] =React.useState('')
  const day= new Date();
  const [date,setDate] =React.useState(day)
  const [index,setIndex]= React.useState(-1)
  const handleOpen =async (e) => {
    
    const d=await setDate(e.target.value)
     
    if( date){
      
    setOpen(true);
  }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDiscard=e=>{
    setTitle('')
    setDescription('')
    setDate(day)
    setOpen(false)
    e.preventDefault()
  }
  const handleSubmit=e=>{
    if(title && description && date && index)
    {
dispatch(create(title,description,date,index))
     setOpen(false);
    }
    else
    {
     

     

  }
    }
React.useEffect(()=>{

})
  const body = (
    <div style={modalStyle} className={classes.paper} >
      <h2 id="simple-modal-title"><em className="text-info">Make your note</em></h2>
      <p id="simple-modal-description">
        <>
<form>
<label htmlFor="title"><em>Title:</em></label><br/>
<input name="title" type="text" className="input" required onChange={(e)=>setTitle(e.target.value)}/><br/>
<label htmlFor="description"><em>Description:</em></label><br/>
<textarea name="description" className="input" required onChange={(e)=>setDescription(e.target.value)}/><br/>

<button onClick={handleSubmit} className="btn btnColor input d-block mt-2 mb-2 text-light">Make</button>
<button onClick={handleDiscard} className="btn btnColor input d-block mt-2 mb-2 text-light">Discard</button>
</form>
    </>
      </p>
      
    </div>
  );

  return (
  <>
<Header/>
  <div className="container-fluid" >
    <div className="row d-flex justify-content-around " >
    <div className="col-lg-3 col-md-5 col-10 mt-3">
    <div className="d-flex justify-content-center mt-3">
      <input name="date" type="date" 
      onChange={(e)=>handleOpen(e)}  /><br/>
      </div>

    </div>
    <div className="col-lg-3 col-md-5 col-10">
{notesList.length==0 ? <h2 className="mt-3 text-center"><em className="mt-3 pt-3">No Notes Yet</em></h2> :
  <><NotesList/></>
}
</div>
</div>
</div>
<>
<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className=""
      >
        {body}
      </Modal>
</>
    </>
  );
}



