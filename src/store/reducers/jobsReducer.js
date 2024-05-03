// Initial state for job reducer
const initialState = {
  jobList: [], // Changed variable name to jobList for clarity
  isLoading: false, // Changed variable name to isLoading for clarity
  error: null,
};

// Reducer function for managing job-related state
const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_JOBS_REQUEST':
      return {
        ...state,
        isLoading: true, // Set isLoading to true when fetching jobs
        error: null, // Reset error to null when starting to fetch jobs
      };
    case 'FETCH_JOBS_SUCCESS':
      return {
        ...state,
        isLoading: false, // Set isLoading to false after successfully fetching jobs
        jobList: action.payload, // Update jobList with fetched jobs
      };
    case 'FETCH_JOBS_FAILURE':
      return {
        ...state,
        isLoading: false, // Set isLoading to false if fetching jobs fails
        error: action.payload, // Update error with the error message
      };
    default:
      return state; // Return current state if action type doesn't match
  }
};

export default jobReducer;
