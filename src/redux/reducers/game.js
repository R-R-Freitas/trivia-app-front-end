import { UPDATE_TOKEN, UPDATE_QUESTION } from '../actions';

const INITIAL_STATE = {
  token: '',
  questions: [],
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_TOKEN:
    return { ...state, token: action.payload };
  case UPDATE_QUESTION:
    return { ...state, questions: [...action.payload] };
  default:
    return state;
  }
};

export default game;
