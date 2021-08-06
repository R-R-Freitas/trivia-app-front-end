import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
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
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
