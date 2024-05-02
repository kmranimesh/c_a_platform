const initialState = {
    jobs: [],
    totalCount: 0,
    isLoading: false,
    error: null,
  };
  
  const jobsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_JOBS_REQUEST':
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case 'FETCH_JOBS_SUCCESS':
        return {
          ...state,
          jobs: action.payload.jobs,
          totalCount: action.payload.totalCount,
          isLoading: false,
          error: null,
        };
      case 'FETCH_JOBS_FAILURE':
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      case 'APPLY_FILTERS':
        return {
          ...state,
          jobs: action.payload.filteredJobs,
          totalCount: action.payload.totalCount,
        };
      default:
        return state;
    }
  };
  
  export default jobsReducer;