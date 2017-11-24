export const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Export this for unit testing more easily
export const fetchUser = (userId, axios, URL = API_URL) =>
  async (dispatch) => {
    dispatch({ type: 'USER_REQUESTING', userId });

    try {
      const res = await axios.get(`${URL}/${userId}`);

      dispatch({ type: 'USER_SUCCESS', userId, data: res.data });
    } catch (err) {
      dispatch({ type: 'USER_FAILURE', userId, err: err.message });
    }
  };

// Using for preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchUser = (state, userId) => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  const userInfo = state.userInfo[userId];

  // Preventing dobule fetching data in production
  if (userInfo && userInfo.readyStatus === 'USER_SUCCESS') return false;

  return true;
};

/* istanbul ignore next */
export const fetchUserIfNeeded = userId =>
  (dispatch, getState, axios) => {
    /* istanbul ignore next */
    if (shouldFetchUser(getState(), userId)) {
      /* istanbul ignore next */
      return dispatch(fetchUser(userId, axios));
    }

    /* istanbul ignore next */
    return null;
  };
