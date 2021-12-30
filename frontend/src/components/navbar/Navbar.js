import React, { Component } from "react";
import { Link } from "react-router-dom";
import './../../../node_modules/bootstrap/js/src/collapse';
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
          <Link to="/" className="navbar-brand sp-navbar__logo"><strong>Safe</strong>Pass</Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav sp-navbar__navlist">
              {(() => {
                if (user.id) {
                  return (
                    <li className="nav-item sp-navbar__navitem">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                  )
                } 
              })()}
              <li className="nav-item sp-navbar__navitem">
                <Link to="/invoice">Invoice</Link>
              </li>
            </ul>
            {(() => {
              if (user.id) {
                return (
                  <div className="sp-navbar__authlink-wrapper">
                    <span>Welcome <strong>{user.name}</strong></span>
                    <button className="btn btn-primary text-white" onClick={this.onLogoutClick}>Logout</button>
                  </div>
                )
              } 
              else {
                return (
                  <div>
                    <Link to="/login" className="me-2"><button className="btn btn-outline-primary">Login</button></Link>
                    <Link to="/register"><button className="btn btn-primary text-white">Register</button></Link>
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