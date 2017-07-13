import React from 'react';
import PropTypes from 'prop-types';
import validateUser from '/shared/validation/userValidation'
import {Button, FormGroup, HelpBlock} from 'react-bootstrap';
import TextFieldGroup from '../shared/TextFieldGroup';
import {userSignupRequest} from '/client/actions/userActions';

// RegisterForm is a stateful form used to register new users
// Props:
//  userSignupRequest: must be a redux action that submits a request to create a new userSignupRequest
//  onSuccess: a callback handler when a success message is received from userSignupRequest
export default class RegisterForm extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    errors: {}
  };

  static propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired
  }

// handle user keyboard input passed back from the TextFieldGroups
  onChange = (evt) => {
    this.setState({
      [evt.target.id]: evt.target.value
    });
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    const {errors, isValid} = validateUser(this.state);
    if (isValid) {
      this.props.userSignupRequest(this.state)
      .then(this.props.onSuccess,
      (res) => {
        const errors = typeof res.data === 'undefined'?
          {form: 'Unable to sign up'} : res.data.errors
        this.setState({errors});
      });
    }
    else {
      this.setState({errors: errors});
    }
  }

  render() {
    const errors = this.state.errors;
    return (
      <form onSubmit={this.onSubmit}>
        <h2>Join the powerplant community!</h2>
        {errors.form &&
          <FormGroup validationState="error">
            <HelpBlock>{errors.form}</HelpBlock>
          </FormGroup>}
          
        <TextFieldGroup
          id="username"
          onChange={this.onChange}
          placeholder="Username"
          error={errors.username}
          value={this.state.username}/>

        <TextFieldGroup
          id="email"
          onChange={this.onChange}
          placeholder="Email"
          error={errors.email}
          value={this.state.email}/>

        <TextFieldGroup
          id="password"
          onChange={this.onChange}
          placeholder="Password"
          error={errors.password}
          type="password"
          value={this.state.password}/>

        <Button type="submit">
          Register
        </Button>
      </form>
    )
  }
}
