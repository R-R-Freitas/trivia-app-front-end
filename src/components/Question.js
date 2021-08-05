import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './question.css';
import Timer from './Timer';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
    this.onClickQuestion = this.onClickQuestion.bind(this);
  }

  onClickQuestion() {
    this.setState({
      clicked: true,
    });
  }

  randomize(array) {
    for (let lastIndex = array.length - 1; lastIndex > 0; lastIndex -= 1) {
      const randomIndex = Math.floor(Math.random() * lastIndex);
      const temp = array[lastIndex];
      array[lastIndex] = array[randomIndex];
      array[randomIndex] = temp;
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
        onClick={ this.onClickQuestion }
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
        onClick={ this.onClickQuestion }
        className={ clicked && 'incorrectAnswer' }
        disabled={ clicked }
      >
        {answer}
      </button>
    ));
    const allAnswers = [correct, ...incorrect];

    return (
      <section>
        <Timer timeOut={ this.onClickQuestion } />
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
}).isRequired;

export default Question;
