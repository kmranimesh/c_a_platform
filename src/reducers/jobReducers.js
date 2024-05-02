
import { FETCH_JOBS_REQUEST, FETCH_JOBS_SUCCESS, FETCH_JOBS_FAILURE } from '../actions/jobsAction';

const initialState = {
  loading: false,
  page: 1,
  jobs: [],
  error: null
};

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS_REQUEST:
      return {
        ...state,
        loading: true
      };
      case FETCH_JOBS_SUCCESS:
        if (Array.isArray(action.payload.jobs)) {
          return {
            ...state,
            loading: false,
            page: action.payload.page,
            jobs: [...state.jobs, ...action.payload.jobs],
            error: null
          };
        } else {
          return {
            ...state,
            loading: false,
            error: 'Jobs data is not iterable'
          };
        }
      
    case FETCH_JOBS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default jobsReducer;