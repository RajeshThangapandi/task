// src/store.js
import { createStore, combineReducers } from 'redux';
import { contactReducer } from './reducers/contactReducer'; // Adjust the path as needed

const rootReducer = combineReducers({
  contacts: contactReducer,
  // other reducers...
});

const store = createStore(rootReducer);

export default store;
