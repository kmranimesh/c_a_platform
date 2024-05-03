import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // Import thunk from 'redux-thunk', not as named export
import jobReducer from './reducers/jobReducer'; // Import jobReducer from its correct path

// Combine reducers if you have more than one reducer
const rootReducer = combineReducers({
  jobs: jobReducer, // Use 'jobs' as the state key for jobReducer
  // Add other reducers here if needed
});

// Create the Redux store with combined reducers and apply thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
