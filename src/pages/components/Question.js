import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './question.css';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    }

    this.onClickQuestion = this.onClickQuestion.bind(this);
  } 
  
  onClickQuestion() {
      this.setState({
        clicked: true,
      })
    };

  render() {
    const { questionAPI } = this.props;
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questionAPI;

   

    const { clicked } = this.state;
    return (
      <section>
        <h3 data-testid="question-category">{category}</h3>
        <p data-testid="question-text">{question}</p>
        <button
          type="button"
          data-testid="correct-answer"
          onClick={ this.onClickQuestion }
          className={ clicked && 'correctAnswer' }
          >
            {correctAnswer}
          </button>
        {incorrectAnswers.map((answer, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `wrong-answer-${index}` }
            onClick={ this.onClickQuestion }
            className={ clicked && 'incorrectAnswer' }
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
