const urlReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_URLS':
        return action.payload;
      default:
        return state;
    }
  };
  //this reducer holds boolean values for which downloads are available
  
  export default urlReducer;
  