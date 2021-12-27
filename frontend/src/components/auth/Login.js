import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { Link } from "react-router-dom";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  static getDerivedStateFromProps(nextProps, state){
    if (nextProps.auth.isAuthenticated) {
      nextProps.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      return state.errors = nextProps.errors
    }
    return null;
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
      const userData = {
            email: this.state.email,
            password: this.state.password
          };
      this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="sp-login">
        <form className="sp-login__form" noValidate onSubmit={this.onSubmit}>
          <div className="sp-login__form-element">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              onChange={this.onChange}
              value={this.state.email}
              error={errors.email}
              id="email"
              type="email"
              className={classnames("form-control", {
                invalid: errors.email || errors.emailnotfound
              })}
            />
            <span className="red-text">
              {errors.email}
              {errors.emailnotfound}
            </span>
          </div>
          <div className="sp-login__form-element">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              onChange={this.onChange}
              value={this.state.password}
              error={errors.password}
              id="password"
              type="password"
              className={classnames("form-control", {
                invalid: errors.password || errors.passwordincorrect
              })}
            />
            <span className="red-text">
              {errors.password}
              {errors.passwordincorrect}
            </span>
          </div>
          <div className="sp-login__form-element">
            <button
              type="submit"
              className="btn btn-outline-primary "
            >
              Login
            </button>
            <span className="text-secondary sp-login__links">
              Don't have an account? <Link className="link-primary" to="/register">Register</Link>
            </span>
          </div>
        </form>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);