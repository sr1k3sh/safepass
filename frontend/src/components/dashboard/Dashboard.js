import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser , addPassword } from "../../actions/authActions";

class Dashboard extends Component {

  constructor(){
    super();
    this.state ={
      userId: "",
      url: "",
      password: "",
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  
  onSubmit = e =>{
    e.preventDefault();
    const newData = {
      userId: 'test',
      url: this.state.url,
      password: this.state.password
    }
    this.props.addPassword(newData, this.props.history);
  };
  
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  
  render() {
    const { user } = this.props.auth;
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col-12">
            <form onSubmit={this.onSubmit}>
              <div className="mb-3">
                <label className="form-label">
                  url
                </label>
                  <input className="form-control" name="url" type="text" onChange={this.onChange}></input>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  password
                </label>
                  <input className="form-control" name="password" type="password" onChange={this.onChange}></input>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  hidden userId
                </label>
                  <input className="form-control" name="userId" type="hidden"></input>
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p>
            </h4>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser,addPassword }
)(Dashboard);