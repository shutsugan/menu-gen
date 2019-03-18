import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Google from '../../Google.svg';
import googlAuth from '../../utils/google-config.js'
import { googleAuth } from '../../actions/auth';

import './index.css';

class GoogleAuth extends Component {
  state = {
    signIn: false
  };

  componentDidMount() {
    googlAuth(_ => {
      this.auth = window.gapi.auth2.getAuthInstance();
      this.setState({signIn: this.auth.isSignedIn.get()});
      this.auth.isSignedIn.listen(this.onAuthChange);
    });
  }

  onAuthChange = _ => {
    this.setState({signIn: this.auth.isSignedIn.get()});

    const current_user = this.auth.currentUser.get().getBasicProfile();
    const user = {
      id: current_user.getId(),
      username: current_user.getName(),
      email: current_user.getEmail(),
      avatar: current_user.getImageUrl()
    }
    
    this.props.googleAuth(user);
  };
  googleLogin = event => {
    event.preventDefault();
    this.auth.signIn();
  }

  render() {
    if (this.state.signIn) return <Redirect to="/" />;

    return (
      <div className="google-auth full flex center mrb-16">
        <button
          onClick={this.googleLogin}
          className="button button__google half flex center pd-16">
          <img className="mrr-16" src={Google} alt="google logo" />
          Google Sign In
        </button>
      </div>
    );
  }
};

export default connect(null, {googleAuth})(GoogleAuth);
