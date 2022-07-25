import { UPDATE_TOKEN, UPDATE_QUESTION, GET_TIME,
  SAVE_CONFIG_OPTIONS, CLEAR_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  token: '',
  questions: [],
  timer: 30,
  category: '',
  difficulty: '',
  type: '',
};

const game = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
  case SAVE_CONFIG_OPTIONS: {
    const { category, difficulty, type } = action.payload;
    return { ...state, category, difficulty, type };
  }
  case UPDATE_TOKEN:
    return { ...state, token: action.payload };
  case UPDATE_QUESTION: {
    const questionsList = action.payload.map((thisQuestion) => (
      {
        ...thisQuestion,
        question: window.atob(thisQuestion.question),
        category: window.atob(thisQuestion.category),
        type: window.atob(thisQuestion.type),
        difficulty: window.atob(thisQuestion.difficulty),
        correct_answer: window.atob(thisQuestion.correct_answer),
        incorrect_answers:
          thisQuestion.incorrect_answers.map((answer) => window.atob(answer)),
      }));
    return { ...state, questions: questionsList };
  }
  case GET_TIME:
    return { ...state, timer: action.payload };
  case CLEAR_QUESTIONS:
    return { ...state, questions: [] };
  default:
    return state;
  }
};

export default game;
