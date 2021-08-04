import React, { Component } from 'react';
import logo from '../trivia.png';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
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
          placeholder="Nome"
          data-testid="input-gravatar-email"
          value={ email }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ this.validateInputs() }
        >
          Jogar
        </button>
      </form>);
  }
}

export default Login;
