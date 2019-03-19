export const setException = (error, type, dispatch) => {
  dispatch({type, payload: {error}})
};
