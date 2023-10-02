const initialState = {
    selectedProfileView: 'stock', 
  };
  
  const adminReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SELECTED_PROFILE_VIEW':
        return {
          ...state,
          selectedProfileView: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default adminReducer;
  