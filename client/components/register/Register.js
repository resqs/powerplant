import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col} from 'react-bootstrap';
import {userSignupRequest} from '/client/actions/userActions';

import RegisterForm from './RegisterForm';

class Register extends React.Component {
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
      <Col md={8} mdOffset={2}>
        {this.state.success && <Redirect to="/" />}
        <RegisterForm onSuccess={this.onSuccess} userSignupRequest={userSignupRequest} />
      </Col>
      )
  }
}

export default connect(null, {userSignupRequest})(Register)
