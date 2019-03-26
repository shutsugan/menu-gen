import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import GoogleAuthRender from './GoogleAuthRender';

import google_auth from '../../utils/google-config.js'
import { googleAuth, googleRegister } from '../../actions/auth';

import './index.css';

export class GoogleAuth extends Component {
  state = {signIn: false};

  componentDidMount() {
    this.auth = null;
    
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
      <GoogleAuthRender
        googleLogin={this.googleLogin}
        renderButtontext={this.renderButtontext}
      />
    );
  }
};

export default connect(null, {googleAuth, googleRegister})(GoogleAuth);
