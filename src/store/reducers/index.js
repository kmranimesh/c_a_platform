import { combineReducers } from 'redux';
import jobsReducer from './jobsReducer';
import filtersReducer from './filtersReducer';

const rootReducer = combineReducers({
  jobs: jobsReducer,
  filters: filtersReducer,
});

export default rootReducer;