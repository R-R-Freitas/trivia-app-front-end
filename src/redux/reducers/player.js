import {
  UPDATE_NAME,
  UPDATE_EMAIL,
  INCREASE_ASSERTIONS,
  INCREASE_SCORE,
  SAVE_STORAGE,
  SAVE_IMAGE_URL,
  CLEAR_SCORE,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  gravatarUrl: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CLEAR_SCORE:
    return { ...state, score: 0, assertions: 0 };
  case SAVE_IMAGE_URL:
    return { ...state, gravatarUrl: action.payload };
  case UPDATE_NAME:
    return { ...state, name: action.payload };
  case UPDATE_EMAIL:
    return { ...state, gravatarEmail: action.payload };
  case INCREASE_ASSERTIONS:
    return { ...state, assertions: state.assertions + 1 };
  case INCREASE_SCORE:
    return { ...state, score: state.score + action.payload };
  case SAVE_STORAGE:
  { const actualState = JSON.stringify({ player: state });
    localStorage.setItem('state', actualState);
    return state;
  }
  default:
    return state;
  }
};

export default player;
