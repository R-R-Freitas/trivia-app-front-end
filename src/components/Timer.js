import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTime } from '../redux/actions';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 30,
    };

    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  componentDidUpdate(prevProps, prevState) {
    const { setTimer, clicked } = this.props;
    const { count } = this.state;
    setTimer(count);
    if (prevState.count === 1 || clicked) {
      clearInterval(this.interval);
      const { timeOut } = this.props;
      timeOut(false);
    }
  }

  timer() {
    const contdownInterval = 1000;
    this.interval = setInterval(() => this.setState((prevState) => (
      { count: prevState.count - 1 })), contdownInterval);
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        Tempo:
        {count}
      </div>
    );
  }
}

Timer.propTypes = ({
  setTimer: PropTypes.func,
  clicked: PropTypes.bool,
}).isRequired;

const mapDispatchToProps = (dispatch) => ({
  setTimer: (count) => dispatch(getTime(count)),
});

export default connect(null, mapDispatchToProps)(Timer);
