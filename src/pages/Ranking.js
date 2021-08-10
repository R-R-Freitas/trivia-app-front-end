import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearScore } from '../redux/actions';

class Ranking extends Component {
  componentDidMount() {
    const { clearPlayerState } = this.props;
    clearPlayerState();
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const sortRanking = ranking.sort((a, b) => (
      b.score - a.score
    ));
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <table>
          <thead>
            <tr>
              <th>Posição</th>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Pontuação</th>
            </tr>
          </thead>
          <tbody>
            {sortRanking.map(({ name, score, picture }, index) => (
              <tr key={ index }>
                <td>{index + 1}</td>
                <td><img src={ picture } alt="Imagem do jogador" /></td>
                <td data-testid={ `player-name-${index}` }>{ name }</td>
                <td data-testid={ `player-score-${index}` }>{ score }</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Início</button>
        </Link>
      </div>);
  }
}

Ranking.propTypes = {
  clearPlayerState: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  clearPlayerState: () => dispatch(clearScore()),
});

export default connect(null, mapDispatchToProps)(Ranking);
