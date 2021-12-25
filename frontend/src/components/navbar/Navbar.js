import React, { Component } from "react";
import { Link } from "react-router-dom";
import './../../../node_modules/bootstrap/js/src/collapse';
import './_navbar.scss';
class Navbar extends Component {
  render() {
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
            <Link to="/login" className="me-2"><button className="btn btn-primary">Login</button></Link>
            <Link to="/register"><button className="btn btn-secondary">Register</button></Link>
          </div>
        </div>
      </nav>
    );
  }
}
export default Navbar;