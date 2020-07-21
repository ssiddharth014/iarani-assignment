import {NOTE_CREATE_REQUEST,
	NOTE_CREATE_SUCCESS,
	NOTE_CREATE_FAIL,NOTES_LIST_REQUEST,NOTES_LIST_SUCCESS,NOTES_LIST_FAIL,
	NOTES_UPDATE_REQUEST,NOTES_UPDATE_SUCCESS,NOTES_UPDATE_FAIL,NOTES_REMOVE_SUCCESS
} from '../constants/noteConstant.js'





const create=(title,description,date,index)=> (dispatch,getState)=>{
	


	try{


if(index===-1)
{
dispatch({type:NOTE_CREATE_SUCCESS,payload:{
	title:title,description:description,date:date}})


}
else{
	dispatch({type:NOTES_UPDATE_SUCCESS,payload:{
	title:title,description:description,date:date},index:index})
}
const {notes:{notesList}}= getState();
		localStorage.setItem('notesList',JSON.stringify(notesList));
		
		

	}
	catch(err){
dispatch({type:NOTE_CREATE_FAIL,payload:err.message})
	}
}

const getnotes=()=>(dispatch,getState)=>{
	dispatch({type:NOTES_LIST_REQUEST})
	try{


      dispatch({type:NOTES_LIST_SUCCESS})
	}
	catch(err)
	{
       dispatch({type:NOTES_LIST_FAIL,payload:
       	err.message
       })
	}
}

const update=(title,description,date,index)=>(dispatch,getState)=>{
	
dispatch({type:NOTES_UPDATE_REQUEST})
	try{
		
dispatch({type:NOTES_UPDATE_SUCCESS,payload:{
	title:title,description:description,date:date},index:index})
const {notes:{notesList}}= getState();
		localStorage.setItem('notesList',JSON.stringify(notesList));
		


	}
	catch(err)
	{
		console.log(err)
		dispatch({type:NOTES_UPDATE_FAIL,payload:err.message})
	}
}
const remove=(index)=> async(dispatch,getState)=>{
	try{
		dispatch({type:NOTES_REMOVE_SUCCESS,payload:index})
		const {notes:{notesList}}= getState();
		localStorage.setItem('notesList',JSON.stringify(notesList));
		


	}
	catch(err)
	{

	}
}
export {create,getnotes,remove}