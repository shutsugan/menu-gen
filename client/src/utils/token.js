export const addToken = (type, payload, dispatch, callback) => {
  dispatch({type, payload});

  localStorage.setItem('token', payload.token);
  dispatch(callback());
};

export const removeToken = (type, payload, dispatch, callback) => {
  dispatch({type, payload});
	localStorage.removeItem('token');

  callback();
  window.location = '/login';
};
