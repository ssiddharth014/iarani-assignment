import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';









import {
  noteCreateReducer,noteListReducer
} from './reducer/noteReducer';
const notesList= JSON.parse(localStorage.getItem('notesList')) || [];

const initialState={
	notes:{notesList}
};
const reducer= combineReducers({
	notes:noteCreateReducer,
	notesList:noteListReducer,
	

})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;