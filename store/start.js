// actions types 
const UPDATE_BUTTON_STATUS = 'UPDATE_BUTTON_STATUS';

// action creators 
const changeButtonStatus = () => {
  return { 
    type: UPDATE_BUTTON_STATUS, 
    userResponseStatus: !userResponseStatus, 
    startButtonStatus: !startButtonStatus 
  }
}

// reducer 

const initial = {
  userResponseStatus: false,
  startButtonStatus: true,
}

export default (state = initial, action) => {
  switch (action.type) {
    case UPDATE_BUTTON_STATUS:
      return {
        userResponseStatus: action.userResponseStatus,
        startButtonStatus: action.startButtonStatus
      };
    default:
      return state;
  }
}



/*
user response 
--numOfPicks / orders 
--remaining clicks 
-- userResCount
-- isCorrect color


start button
--buttonStatus
--startBtnStatus


simon
--picks
--color



scores 
--count 
--highScore

*/