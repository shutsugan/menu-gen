export default callback => {
  window.gapi.load('client:auth2', _ => {
    window.gapi.client.init({
      clientId: '305549152523-4tt662n440nir7caccvfel2np184aegq.apps.googleusercontent.com',
      scope: 'email profile'
    }).then(_ => callback());
  });
};
