import {
  UPDATE_NAME,
  UPDATE_EMAIL,
  INCREASE_ASSERTIONS,
  INCREASE_SCORE,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_NAME:
    return { ...state, name: action.payload };
  case UPDATE_EMAIL:
    return { ...state, gravatarEmail: action.payload };
  case INCREASE_ASSERTIONS:
    return { ...state, assertions: state.assertions + 1 };
  case INCREASE_SCORE:
    return { ...state, score: state.score + action.payload };
  default:
    return state;
  }
};

export default player;
