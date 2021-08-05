import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    if (prevState.count === 1) {
      clearInterval(this.interval);
      const { timeOut } = this.props;
      timeOut();
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
  timeOut: PropTypes.func,
}).isRequired;

export default Timer;
