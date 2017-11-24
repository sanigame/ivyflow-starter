import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import * as action from './action';
import UserList from '../../components/UserList';
import styles from './styles.scss';

// Export this for unit testing more easily
export class Home extends PureComponent {
  static propTypes = {
    home: PropTypes.shape().isRequired,
    fetchUsersIfNeeded: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchUsersIfNeeded();
  }

  renderUserList = () => {
    const { home } = this.props;

    if (
      !home.readyStatus ||
      home.readyStatus === 'USERS_INVALID' ||
      home.readyStatus === 'USERS_REQUESTING'
    ) {
      return <p>Loading...</p>;
    }

    if (home.readyStatus === 'USERS_FAILURE') {
      return <p>Oops, Failed to load list!</p>;
    }

    return <UserList list={home.list} />;
  };

  render() {
    return (
      <div className={styles.Home}>
        <Helmet title="Home" />
        {this.renderUserList()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  home: state.home,
});

const mapDispatchToProps = dispatch => ({
  fetchUsersIfNeeded: () => {
    dispatch(action.fetchUsersIfNeeded());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
