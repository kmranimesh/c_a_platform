import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Import thunk from 'redux-thunk'
import jobReducer from './reducers/jobReducer';

const rootReducer = combineReducers({
  jobs: jobReducer,
  // Add other reducers here if needed
});

const store = createStore(rootReducer, applyMiddleware(thunk)); // Apply thunk middleware to the store

export default store;

