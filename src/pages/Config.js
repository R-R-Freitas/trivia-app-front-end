import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { saveConfigOptions } from '../redux/actions';
import './Config.css';
import logo from '../trivia.png';

class Config extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      category: '',
      difficulty: '',
      type: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('https://opentdb.com/api_category.php')
      .then((data) => data.json())
      .then((response) => this.setState({
        categories: response.trivia_categories,
      }));
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick(category, difficulty, type) {
    const { saveConfig } = this.props;
    saveConfig({ category, difficulty, type });
  }

  renderButton() {
    const { category, difficulty, type } = this.state;
    return (
      <Link to="/">
        <button
          type="button"
          className="btn-config"
          onClick={ () => this.handleClick(category, difficulty, type) }
        >
          Salvar
        </button>
      </Link>
    );
  }

  renderCategoryList() {
    const { categories, category } = this.state;
    return (
      <label htmlFor="category-select">
        Categoria
        <select
          id="category-select"
          value={ category }
          name="category"
          onChange={ this.handleChange }
        >
          <option value="">Qualquer</option>
          {categories.map(({ id, name }) => (
            <option key={ id } value={ id }>{ name }</option>
          ))}
        </select>
      </label>
    );
  }

  renderDifficulty() {
    const dificulties = ['easy', 'medium', 'hard'];
    const { difficulty } = this.state;
    return (
      <label htmlFor="dificulty-select">
        Dificuldade
        <select
          id="dificulty-select"
          value={ difficulty }
          name="difficulty"
          onChange={ this.handleChange }
        >
          <option value="">Todas</option>
          {dificulties.map((dif, index) => (
            <option key={ index } value={ dif }>{ dif }</option>
          ))}
        </select>
      </label>
    );
  }

  renderTypeList() {
    const { type } = this.state;
    return (
      <label htmlFor="type-select">
        Tipo de perguntas
        <select
          id="type-select"
          value={ type }
          name="type"
          onChange={ this.handleChange }
        >
          <option value="">Todas</option>
          <option value="multiple">Múltipla Escolha</option>
          <option value="boolean">V ou F</option>
        </select>
      </label>
    );
  }

  render() {
    return (
      <div className="config-page">
        <img src={ logo } className="App-logo" alt="logo" />
        <div className="container">
          <h1 data-testid="settings-title">Configurações</h1>
          { this.renderCategoryList() }
          { this.renderDifficulty() }
          { this.renderTypeList() }
          { this.renderButton() }
        </div>
      </div>);
  }
}

Config.propTypes = {
  saveConfig: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveConfig: (configSettings) => dispatch(saveConfigOptions(configSettings)),
});

export default connect(null, mapDispatchToProps)(Config);
