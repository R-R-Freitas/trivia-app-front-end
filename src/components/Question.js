import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './question.css';
import { connect } from 'react-redux';
import { increaseAssertions, increaseScore, saveStorage } from '../redux/actions';
import Timer from './Timer';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      randomized: false,
    };
    this.onClickQuestion = this.onClickQuestion.bind(this);
    this.randomize = this.randomize.bind(this);
  }

  onClickQuestion(correct) {
    const { questionAPI, setAssertion, setScore, getTimer, saveScore } = this.props;
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
  }

  randomize(array) {
    const { randomized } = this.state;
    if (!randomized) {
      for (let lastIndex = array.length - 1; lastIndex > 0; lastIndex -= 1) {
        const randomIndex = Math.floor(Math.random() * lastIndex);
        const temp = array[lastIndex];
        array[lastIndex] = array[randomIndex];
        array[randomIndex] = temp;
      }
      this.setState({ randomized: true });
    }
    return (array);
  }

  render() {
    const { questionAPI } = this.props;
    const { clicked } = this.state;
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
        className={ clicked && 'correctAnswer' }
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
        className={ clicked && 'incorrectAnswer' }
        disabled={ clicked }
      >
        {answer}
      </button>
    ));
    const allAnswers = [correct, ...incorrect];

    return (
      <section>
        <Timer timeOut={ this.onClickQuestion } clicked={ clicked } />
        <h3 data-testid="question-category">{category}</h3>
        <p data-testid="question-text">{question}</p>
        { this.randomize(allAnswers) }
      </section>
    );
  }
}

Question.propTypes = ({
  category: PropTypes.string,
  question: PropTypes.string,
  correctAnswer: PropTypes.string,
  incorrectAnswers: PropTypes.arrayOf(PropTypes.string),
  setAssertion: PropTypes.func.isRequired,
  setScore: PropTypes.func.isRequired,
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
