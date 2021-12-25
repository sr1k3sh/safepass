import React, { Component } from "react";
import { Link } from "react-router-dom";
import './../../../node_modules/bootstrap/js/src/collapse';
import './_navbar.scss';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";
class Navbar extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const {user} = this.props.auth;
    return ( 
      <nav className="navbar navbar-expand-lg navbar-light bg-light sp-navbar">
        <div className="container-fluid sp-navbar__container">
          <Link to="/" className="navbar-brand">SafePass</Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item me-2">
                About
              </li>
              <li className="nav-item">
                Portfolio
              </li>
            </ul>
            {(() => {
              if (user.id) {
                return (
                  <div>
                    <Link to="/dashboard">Dashboard</Link>
                    Welcome {user.name}
                    <button className="btn btn-primary" onClick={this.onLogoutClick}>Logout</button>
                  </div>
                )
              } 
              else {
                return (
                  <div>
                    <Link to="/login" className="me-2"><button className="btn btn-primary">Login</button></Link>
                    <Link to="/register"><button className="btn btn-secondary">Register</button></Link>
                  </div>
                )
              }
            })()}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);