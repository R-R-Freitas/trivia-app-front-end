import { UPDATE_TOKEN, UPDATE_QUESTION, GET_TIME } from '../actions';

const INITIAL_STATE = {
  token: '',
  questions: [],
  timer: 30,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_TOKEN:
    return { ...state, token: action.payload };
  case UPDATE_QUESTION:
    return { ...state, questions: [...action.payload] };
  case GET_TIME:
    return { ...state, timer: action.payload };
  default:
    return state;
  }
};

export default game;
