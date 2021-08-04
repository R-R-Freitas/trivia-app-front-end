import { UPDATE_NAME } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_NAME:
    return { ...state, name: action.payload };
  default:
    return state;
  }
};

export default player;
