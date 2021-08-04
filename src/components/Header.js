import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  hashCreate() {
    const { email } = this.props;
    const hash = md5(email).toString();
    return hash;
  }

  render() {
    const { name } = this.props;
    return (
      <div>
        <img src={ `https://www.gravatar.com/avatar/${this.hashCreate()}` } data-testid="header-profile-picture" alt="Foto do perfil" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
});

export default connect(mapStateToProps)(Header);
