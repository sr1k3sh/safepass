import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }
componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
this.props.registerUser(newUser, this.props.history); 
  };
render() {
    const { errors } = this.state;
return (
      <div className="container">
        <div className="row justify-content-center sp-register">
            <div className="col-xl-6 sp-register__background">
              <img width="100%" src={require('../../assets/images/banner.png')}></img>
            </div>
            <div className="col-xl-6 sp-register__form-wrapper">
              <h2 className="sp-register__title">
                <b className="sp-register__bold">Register</b> below
              </h2>

              <form noValidate onSubmit={this.onSubmit} className="sp-register__form">
                <div className="sp-register__form-element">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.name}
                    error={errors.name}
                    id="name"
                    type="text"
                    className={classnames("form-control", {
                      invalid: errors.name
                    })}
                  />
                  <span className="red-text">{errors.name}</span>
                </div>
                <div className="sp-register__form-element">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    className={classnames("form-control", {
                      invalid: errors.email
                    })}
                  />
                  <span className="red-text">{errors.email}</span>
                </div>
                <div className="sp-register__form-element">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames("form-control", {
                      invalid: errors.password
                    })}
                  />
                  <span className="red-text">{errors.password}</span>
                </div>
                <div className="sp-register__form-element">
                  <label htmlFor="password2" className="form-label">Confirm Password</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    id="password2"
                    type="password"
                    className={classnames("form-control", {
                      invalid: errors.password2
                    })}
                  />
                  <span className="red-text">{errors.password2}</span>
                </div>
                <div className="sp-register__form-element sp-register__button-wrapper">
                  <button type="submit" className="btn btn-outline-primary sp-register__reg-btn">
                    Sign up
                  </button>
                  <span className="grey-text text-darken-1">
                    Already have an account? <Link to="/login" className="link-primary">Log in</Link>
                  </span>
                </div>
              </form>
            </div>
            
        </div>
      </div>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));