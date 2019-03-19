import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Google from '../../Google.svg';
import google_auth from '../../utils/google-config.js'
import { googleAuth, googleRegister } from '../../actions/auth';

import './index.css';

class GoogleAuth extends Component {
  state = {signIn: false};

  componentDidMount() {
    google_auth(_ => {
      this.auth = window.gapi.auth2.getAuthInstance();
      this.setState({signIn: this.auth.isSignedIn.get()});
      this.auth.isSignedIn.listen(this.onAuthChange);
    });
  }

  onAuthChange = _ => {
    this.setState({signIn: this.auth.isSignedIn.get()});

    const current_user = this.auth.currentUser.get().getBasicProfile();
    const user = {
      password: current_user.getId(),
      username: current_user.getName(),
      email: current_user.getEmail(),
      avatar: current_user.getImageUrl()
    }

    if (this.props.registration) this.props.googleRegister(user);
    else this.props.googleAuth(user);
  };

  googleLogin = event => {
    event.preventDefault();
    this.auth.signIn();
  }

  renderButtontext = _ => this.props.registration
    ? 'Google Sign Up'
    : 'Google Sign In';

  render() {
    if (this.state.signIn) return <Redirect to="/" />;

    return (
      <div className="google-auth full flex center mrb-16">
        <button
          onClick={this.googleLogin}
          className="button button__google half flex center pd-16">
          <img className="mrr-16" src={Google} alt="google logo" />
          {this.renderButtontext()}
        </button>
      </div>
    );
  }
};

export default connect(null, {googleAuth, googleRegister})(GoogleAuth);
