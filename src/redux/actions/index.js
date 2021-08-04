export const UPDATE_NAME = 'UPDATE_NAME';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';
const TRIVIA_API = 'https://opentdb.com/api_token.php?command=request';

export const updateName = (payload) => ({
  type: UPDATE_NAME,
  payload,
});

const updateToken = (payload) => ({
  type: UPDATE_TOKEN,
  payload,
});

export const updateEmail = (payload) => ({
  type: UPDATE_EMAIL,
  payload,
});

export const fetchToken = () => (dispatch) => (
  fetch(TRIVIA_API)
    .then((data) => data.json())
    .then((response) => {
      localStorage.setItem('token', response.token);
      dispatch(updateToken(response.token));
    })
);

const updateQuestion = (payload) => ({
  type: UPDATE_QUESTION,
  payload,
});

export const fetchQuestions = (token) => (dispatch) => (
  fetch(`https://opentdb.com/api.php?amount=1&token=${token}`)
    .then((data) => data.json())
    .then((response) => {
      dispatch(updateQuestion(response.results));
    })
);
