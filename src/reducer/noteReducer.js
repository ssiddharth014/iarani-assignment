import {NOTE_CREATE_REQUEST,
	NOTE_CREATE_SUCCESS,
	NOTE_CREATE_FAIL,NOTES_LIST_REQUEST,NOTES_LIST_SUCCESS,NOTES_LIST_FAIL,
NOTES_UPDATE_REQUEST,NOTES_UPDATE_SUCCESS,NOTES_UPDATE_FAIL,NOTES_REMOVE_SUCCESS} from '../constants/noteConstant.js'



function noteCreateReducer(state={notesList:[]},action)
{


	switch(action.type){
		
		case NOTE_CREATE_SUCCESS:
		const note= action.payload;
		
		return {
          notesList :[...state.notesList,note], loading:false
		};
        case NOTES_UPDATE_SUCCESS:
		
		const updateNote= action.payload
		
		

        state.notesList.splice(action.index,1,updateNote)
		return {loading:false,notesList:state.notesList}

		case  NOTES_REMOVE_SUCCESS:
		state.notesList.splice(action.index,1)
		   return {notesList: state.notesList}
		case NOTE_CREATE_FAIL:
		 return { loading: false, error: action.payload };
		default:
		return state

	}
}
function noteListReducer(state={notesList:[]},action)
{
	switch (action.type){
		case NOTES_LIST_REQUEST:
		return {loading:true,error:false}
		case NOTES_LIST_SUCCESS:
		
		return{
			loading:false, notesList:[state.notesList]
		}
		case NOTES_LIST_FAIL:
		return {loading:false,error:action.payload};
		default:
		return state
	}
}

export {noteCreateReducer, noteListReducer}
