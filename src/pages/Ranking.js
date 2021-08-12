import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearScore } from '../redux/actions';
import './Ranking.css';

class Ranking extends Component {
  componentDidMount() {
    const { clearPlayerState } = this.props;
    clearPlayerState();
  }

  renderThead() {
    return (
      <thead>
        <tr>
          <th>Posição</th>
          <th>Avatar</th>
          <th>Nome</th>
          <th>Pontuação</th>
        </tr>
      </thead>
    );
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const sortRanking = ranking.sort((a, b) => (
      b.score - a.score
    ));
    return (
      <div className="ranking-container">
        <section className="ranking">
          <h1 data-testid="ranking-title">Ranking</h1>
          <div className="table-container">
            <table>
              { this.renderThead() }
              <tbody>
                {sortRanking.map(({ name, score, picture }, index) => (
                  <tr key={ index }>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        className="ranking-avatar"
                        src={ picture }
                        alt="Imagem do jogador"
                      />
                    </td>
                    <td data-testid={ `player-name-${index}` }>{ name }</td>
                    <td data-testid={ `player-score-${index}` }>{ score }</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to="/">
            <button type="button" data-testid="btn-go-home">Início</button>
          </Link>
        </section>
      </div>
    );
  }
}

Ranking.propTypes = {
  clearPlayerState: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  clearPlayerState: () => dispatch(clearScore()),
});

export default connect(null, mapDispatchToProps)(Ranking);
