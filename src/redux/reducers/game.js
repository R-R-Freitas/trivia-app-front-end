import { UPDATE_TOKEN, UPDATE_QUESTION, GET_TIME, SAVE_CONFIG_OPTIONS } from '../actions';

const INITIAL_STATE = {
  token: '',
  questions: [],
  timer: 30,
  category: '',
  difficulty: '',
  type: '',
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CONFIG_OPTIONS: {
    const { category, difficulty, type } = action.payload;
    return { ...state, category, difficulty, type };
  }
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
