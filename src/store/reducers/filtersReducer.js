// src/store/reducers/filtersReducer.js
const initialState = {
    minExperience: 0,
    companyName: '',
    location: '',
    isRemote: false,
    techStack: [],
    role: '',
    minBasePay: 0,
  };
  
  const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_FILTERS':
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  };
  
  export default filtersReducer;