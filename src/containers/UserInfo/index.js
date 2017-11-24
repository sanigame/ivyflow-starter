import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import * as action from './action';
import UserCard from '../../components/UserCard';
import styles from './styles.scss';

// Export this for unit testing more easily
export class UserInfo extends PureComponent {
  static propTypes = {
    userInfo: PropTypes.shape().isRequired,
    fetchUserIfNeeded: PropTypes.func.isRequired,
    match: PropTypes.shape().isRequired,
  }

  componentDidMount() {
    const { fetchUserIfNeeded, match: { params } } = this.props;
    fetchUserIfNeeded(params.id);
  }

  renderUserCard = () => {
    const { userInfo, match: { params } } = this.props;
    const userInfoById = userInfo[params.id];

    if (!userInfoById || userInfoById.readyStatus === 'USER_REQUESTING') {
      return <p>Loading...</p>;
    }

    if (userInfoById.readyStatus === 'USER_FAILURE') {
      return <p>Oops, Failed to load info!</p>;
    }

    return <UserCard info={userInfoById.info} />;
  }

  render() {
    return (
      <div className={styles.UserInfo}>
        <Helmet title="User Info" />
        {this.renderUserCard()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({
  fetchUserIfNeeded: (id) => {
    dispatch(action.fetchUserIfNeeded(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
