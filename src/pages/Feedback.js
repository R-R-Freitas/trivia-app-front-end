import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { clearQuestions } from '../redux/actions';

class Feedback extends Component {
  componentDidMount() {
    const { name, score, picture, resetQuestions } = this.props;
    resetQuestions();
    const ranking = localStorage.getItem('ranking');
    if (ranking) {
      const playerRanking = JSON.parse(ranking);
      const newRanking = [...playerRanking, { name, score, picture }];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    } else {
      localStorage.setItem('ranking', JSON.stringify([{ name, score, picture }]));
    }
  }

  render() {
    const { assertions, score } = this.props;
    const minAssertions = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          { assertions >= minAssertions ? 'Mandou bem!' : 'Podia ser melhor...!' }
        </p>
        <p data-testid="feedback-total-score">
          { parseInt(score, 10) }
        </p>
        <p data-testid="feedback-total-question">
          { parseInt(assertions, 10) }
        </p>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  resetQuestions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  picture: state.player.gravatarUrl,
});

const mapDispatchToProps = (dispatch) => ({
  resetQuestions: () => dispatch(clearQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
