import { UPDATE_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_TOKEN:
    return { ...state, token: action.payload };
  default:
    return state;
  }
};

export default game;
