import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './question.scss';
import { connect } from 'react-redux';
import { increaseAssertions, increaseScore, saveStorage } from '../redux/actions';
import Timer from './Timer';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      randomized: [],
    };
    this.onClickQuestion = this.onClickQuestion.bind(this);
    this.randomize = this.randomize.bind(this);
  }

  componentDidMount() {
    this.randomize();
  }

  onClickQuestion(correct) {
    const { questionAPI,
      setAssertion,
      setScore,
      getTimer,
      saveScore,
      setVisibility } = this.props;
    const { difficulty } = questionAPI;
    const multiplier = { hard: 3, medium: 2, easy: 1 }[difficulty];
    const BASE_POINTS = 10;
    const points = BASE_POINTS + multiplier * getTimer;
    this.setState({
      clicked: true,
    });

    if (correct) {
      setAssertion();
      setScore(points);
    } else {
      setScore(0);
    }
    saveScore();
    setVisibility(true);
  }

  randomize() {
    const { questionAPI: { type } } = this.props;
    let answersOptions = 2;
    if (type === 'multiple') {
      answersOptions += 2;
    }
    const array = [...Array(answersOptions).keys()];
    for (let lastIndex = array.length - 1; lastIndex >= 0; lastIndex -= 1) {
      const randomIndex = Math.floor(Math.random() * (lastIndex + 1));
      const temp = array[lastIndex];
      array[lastIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }
    this.setState({ randomized: [...array] });
  }

  render() {
    const { questionAPI } = this.props;
    const { clicked, randomized } = this.state;
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questionAPI;
    const correct = (
      <button
        type="button"
        data-testid="correct-answer"
        key="4"
        onClick={ () => this.onClickQuestion(true) }
        className={ `answer-option ${clicked ? 'correctAnswer' : 'alternative'}` }
        disabled={ clicked }
      >
        {correctAnswer}
      </button>);
    const incorrect = incorrectAnswers.map((answer, index) => (
      <button
        type="button"
        key={ index }
        data-testid={ `wrong-answer-${index}` }
        onClick={ () => this.onClickQuestion(false) }
        className={ `answer-option ${clicked ? 'incorrectAnswer' : 'alternative'}` }
        disabled={ clicked }
      >
        {answer}
      </button>
    ));
    const allAnswers = [correct, ...incorrect];

    return (
      <section>
        <div className="question-title">
          <h3 data-testid="question-category">{category}</h3>
          <Timer timeOut={ this.onClickQuestion } clicked={ clicked } />
        </div>
        <p data-testid="question-text">{question}</p>
        <div className="answers">
          { allAnswers.map((_answer, index, array) => array[randomized[index]]) }
        </div>
      </section>
    );
  }
}

Question.propTypes = ({
  category: PropTypes.string,
  question: PropTypes.string,
  correctAnswer: PropTypes.string,
  incorrectAnswers: PropTypes.arrayOf(PropTypes.string),
  setAssertion: PropTypes.func,
  setScore: PropTypes.func,
  setVisibility: PropTypes.func,
}).isRequired;

const mapStateToProps = (state) => ({
  getTimer: state.game.timer,
});

const mapDispatchToProps = (dispatch) => ({
  setAssertion: () => dispatch(increaseAssertions()),
  setScore: (points) => dispatch(increaseScore(points)),
  saveScore: () => dispatch(saveStorage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
