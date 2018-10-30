const tableReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TABLE':
      return action.payload;
    //the state in this reducer hold the current table
    //that is shown on the dom, be it one of projects or songs
    case 'CLEAR_TABLE':
      return [];
    default:
      return state;
  }
};

export default tableReducer;