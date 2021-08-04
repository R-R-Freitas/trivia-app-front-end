import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../redux/actions';
import Question from './components/Question';
import Header from '../components/Header';

class Game extends Component {
  componentDidMount() {
    const { getToken, sendQuestions } = this.props;
    sendQuestions(getToken);
  }

  render() {
    const { getQuestions } = this.props;
    return (
      <div>
        <Header />
        { getQuestions.map((question, index) => (
          <Question key={ index } questionAPI={ question } />)) }
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
});

Game.propTypes = ({
  getToken: PropTypes.string,
  sendQuestions: PropTypes.func,
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
