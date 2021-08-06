import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchQuestions, saveStorage } from '../redux/actions';
import Question from '../components/Question';
import Header from '../components/Header';

// import Timer from '../components/Timer';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber: 0,
      clicked: false,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.setVisibility = this.setVisibility.bind(this);
  }

  componentDidMount() {
    const { getToken, sendQuestions, saveScore } = this.props;
    sendQuestions(getToken);
    saveScore();
  }

  setVisibility(clicked) {
    this.setState({
      clicked,
    });
  }

  nextQuestion() {
    this.setState((prevState) => ({
      questionNumber: prevState.questionNumber + 1,
      clicked: false,
    }));
  }

  renderQuestion() {
    const { questionNumber } = this.state;
    const { getQuestions } = this.props;
    const questionLimit = 4;
    if (questionNumber <= questionLimit) {
      return (
        getQuestions.map((question, index) => (
          <Question
            key={ index }
            setVisibility={ this.setVisibility }
            questionAPI={ question }
          />))[questionNumber]
      );
    }
    return <Redirect to="/feedback" />;
  }

  render() {
    // const { getQuestions } = this.props;
    const { clicked } = this.state;
    return (
      <div>
        <Header />
        { this.renderQuestion() }
        {
          clicked && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.nextQuestion }
              visibility={ clicked }
            >
              Próxima
            </button>)
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getToken: state.game.token,
  getQuestions: state.game.questions,
});

const mapDispatchToProps = (dispatch) => ({
  sendQuestions: (token) => dispatch(fetchQuestions(token)),
  saveScore: () => dispatch(saveStorage()),
});

Game.propTypes = ({
  getToken: PropTypes.string,
  sendQuestions: PropTypes.func,
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
