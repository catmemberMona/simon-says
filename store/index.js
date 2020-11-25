import { createStore, combineReducers } from 'redux'

import start from './start';



const reducer = combineReducers({
  start,
})


export default createStore(reducer);
