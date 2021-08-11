import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { saveConfigOptions } from '../redux/actions';
import './Config.scss';

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
          onClick={ () => this.handleClick(category, difficulty, type) }
        >
          Salvar
        </button>
      </Link>
    );
  }

  render() {
    const dificulties = ['easy', 'medium', 'hard'];
    const { categories, category, difficulty, type } = this.state;
    return (
      <div className="config-page">
        <h1 data-testid="settings-title">Config</h1>
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
        { this.renderButton() }
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
