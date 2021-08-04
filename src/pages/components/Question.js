import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Question extends Component {
  render() {
    const { questionAPI } = this.props;
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questionAPI;

    return (
      <section>
        <h3 data-testid="question-category">{category}</h3>
        <p data-testid="question-text">{question}</p>
        <button type="button" data-testid="correct-answer">{correctAnswer}</button>
        {incorrectAnswers.map((answer, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `wrong-answer-${index}` }
          >
            {answer}
          </button>
        )) }
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
