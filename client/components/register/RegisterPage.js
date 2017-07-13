import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col} from 'react-bootstrap';
import {userSignupRequest} from '/client/actions/userActions';
import SetHeaderTitle from '../shared/SetHeaderTitle';

import RegisterForm from './RegisterForm';

class RegisterPage extends React.Component {
  static propTypes = {
    userSignupRequest: PropTypes.func.isRequired
  }

  state = {
    success: false
  }

  onSuccess = () => {
    this.setState({
      success: true
    });
  }

  render() {
    const {userSignupRequest} = this.props;
    return (
      <Col md={6} mdOffset={3}>
        {this.state.success && <Redirect to="/" />}
        <SetHeaderTitle>Sign up</SetHeaderTitle>
        <RegisterForm onSuccess={this.onSuccess} userSignupRequest={userSignupRequest} />
      </Col>
      )
  }
}

export default connect(null, {userSignupRequest})(RegisterPage)
