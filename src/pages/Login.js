import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { fetchToken, updateEmail, updateName } from '../redux/actions';
import logo from '../trivia.png';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { requestToken, storeName, storeEmail } = this.props;
    const { name, email } = this.state;
    storeName(name);
    storeEmail(email);
    requestToken();
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  validateInputs() {
    const { name, email } = this.state;
    const validEmail = /^[a-z0-9_.-]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
    const validName = 1;
    if (validEmail.test(email) && name.length >= validName) {
      return false;
    }
    return true;
  }

  render() {
    const { name, email } = this.state;

    return (
      <form>
        <img src={ logo } className="App-logo" alt="logo" />
        <input
          name="name"
          placeholder="Nome"
          data-testid="input-player-name"
          value={ name }
          onChange={ this.handleChange }
        />
        <input
          name="email"
          placeholder="Email"
          data-testid="input-gravatar-email"
          value={ email }
          onChange={ this.handleChange }
        />
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ this.validateInputs() }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </Link>
        <Link to="/config">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </form>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestToken: () => dispatch(fetchToken()),
  storeName: (name) => dispatch(updateName(name)),
  storeEmail: (email) => dispatch(updateEmail(email)),

});

Login.propTypes = {
  requestToken: propTypes.func.isRequired,
  storeName: propTypes.func.isRequired,
  storeEmail: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
