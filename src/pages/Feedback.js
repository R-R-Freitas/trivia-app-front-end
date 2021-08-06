import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const minAssertions = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          { assertions >= minAssertions ? 'Mandou bem!' : 'Podia ser melhor...!' }
        </p>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
