




import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Modal from '@material-ui/core/Modal';
import NoteIcon from '@material-ui/icons/Note';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import BackspaceRoundedIcon from '@material-ui/icons/BackspaceRounded';
import EditIcon from '@material-ui/icons/Edit';

//import ImageIcon from '@material-ui/icons/Image';
//import WorkIcon from '@material-ui/icons/Work';
//import BeachAccessIcon from '@material-ui/icons/BeachAccess';

import { useSelector, useDispatch } from 'react-redux';



import {getnotes,create,remove} from './actions/noteAction';
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
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

export default function NotesList({props}) {

  const classes = useStyles();
  const notes = useSelector(state => state.notes);
  const { notesList } = notes;
  const updateNote =useSelector(state=>state.notesUpdate);
  //const {List} = updateNote;
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
 
  const [index,setIndex]= React.useState(-1)
  const [title,setTitle] = React.useState('')
  const [description,setDescription] =React.useState('')
  const [date,setDate] =React.useState('')
  
  const dispatch = useDispatch();
  const handleOpen = (value,index) => {
    
    setOpen(true);
    setTitle(value.title)
    setDescription(value.description)
    setDate(value.date)
    setIndex(index)
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDiscard=e=>{
    setTitle('')
    setDescription('')
    setDate('')
    e.preventDefault()
    setOpen(false)
  }
  const handleSubmit=e=>{
    
     dispatch(create(title,description,date,index));
setOpen(false)
  }
  
  const handledelete=index=>{
    dispatch(remove(index))
  }

const openNav=event=>{
    document.getElementById(event).style.display="block";
  }
const closenav=event=>{
    
    document.getElementById(event).style.display="none";
  }

  
React.useEffect(()=>{
  dispatch(getnotes())
 
},[notesList])

const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title"><em className="text-info">Make Changes</em></h2>
      <div id="simple-modal-description">
        <>


<label htmlFor="date"><em className="text-primary"> Date:</em></label><br/>
<input name="date" type="date" className="input" requiredvalue={date} onChange={(e)=>setDate(e.target.value)} /><br/>
<label htmlFor="title"><em className="text-primary mt-2">Title:</em></label><br/>
<input name="title" type="text" className="input" required value={title} onChange={(e)=>setTitle(e.target.value)}/><br/>
<label htmlFor="description"><em className="text-primary mt-2">Description:</em></label><br/>
<textarea name="description" required className="input" value={description} onChange={(e)=>setDescription(e.target.value)}/><br/>
<div className="d-flex justify-content-around mt-2 mb-2">
<Button  onClick={handleSubmit}><AddRoundedIcon className="text-primary"/></Button>
<Button  onClick={handleDiscard}> <BackspaceRoundedIcon className="text-danger"/></Button>
</div>
    </>
      </div>
      
    </div>
  );
  return (
  <>
    
    <List 
      component="nav"
      className="card"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Notes :
        </ListSubheader>
      }
      className={classes.root}
    >
      
      
      {notesList && notesList.map((list,index)=>{
        
    return(

      
  
        <>
        <List key={index+190}>
         <ListItem >
        <ListItemIcon>
          <NoteIcon className="text-primary" />
        </ListItemIcon>
        <ListItemText primary={list.title} secondary={list.date} />
        
      
        
        
         <Button className=" pl-3"  
         onClick={()=>openNav(index)}><KeyboardArrowDownIcon className="text-primary"/></Button>
      
          
       </ListItem>
         
          


    <div id={index} className="text-primary pl-3 zeroo" >
      <div >
      <h6><em className="text-break">{list.description}</em></h6>
      <div className="d-flex justify-content-around">
      <Button type="button"  onClick={()=>handleOpen(list,index)}>
        <EditIcon className="text-primary"/>
      </Button>
      <Modal style={{"width":"60vw","margin":"20%"}}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <Button type="button"  onClick={()=>handledelete(index)}>
        <DeleteIcon className="text-danger"/>
      </Button>
      </div><br/>
      <Button   
      onClick={()=>closenav(index)}><CancelIcon className="text-danger"/></Button>
     
       </div>
    </div>
 </List>
     </>  
     )
    })
  }
  </List>
  
  
   </>
 
    
  );
}