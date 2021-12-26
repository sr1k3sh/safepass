import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser , addPassword, getPasswords, deletePassword } from "../../actions/authActions";

class Dashboard extends Component {

  constructor(){
    super();
    this.state ={
      userId: "",
      userName: "",
      url: "",
      password: "",
      errors: {},
      passwords:""
    }
  }

  static getDerivedStateFromProps(props, state){
    return {
      passwords: props.passwords.data
    }
  }

  componentDidMount(){
    this.props.getPasswords({
      userId:this.props.auth.user.name,
    });
  } 

  
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  
  onSubmit = e =>{
    e.preventDefault();

    const newData = {
      userId: this.props.auth.user.name,
      userName: this.state.userName,
      url: this.state.url,
      password: this.state.password
    }

    this.props.addPassword(newData, this.props.history);

    e.target.reset();
  };
  
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  removePassword = (e) =>{
    e.preventDefault();
    const data = {
      url: e.target.attributes.getNamedItem('data-url').value,
      userId: this.props.auth.user.name,
    }
    e.target.closest(".sp-passtable__item").remove();
    this.props.deletePassword(data,this.props.history);
  }
  
  render() {
    const { data } = this.props.passwords;
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">

        <div className="col-12">
            {(() => {
              if (data) {
                return (
                  <ul className="sp-passtable">
                    <li className="sp-passtable__item sp-passtable__item--title">
                      <span className="sp-passtable__username">Username/Email/Phone</span>
                      <span className="sp-passtable__url">URL</span>
                      <span className="sp-passtable__password">Password</span>
                      <span className="sp-passtable__action">Action</span>
                    </li>
                    {data.map((d,i)=><li className="sp-passtable__item" key={i}>
                    <div className="sp-passtable__url">
                        <label className="sp-passtable__hidden" htmlFor={"sp_username_"+i}>URL</label>
                        <input id={"sp_username_"+i} type="url" readOnly value={d.userName} />
                      </div>
                      <div className="sp-passtable__url">
                        <label className="sp-passtable__hidden" htmlFor={"sp_url_"+i}>URL</label>
                        <input id={"sp_url_"+i} type="url" readOnly value={d.url} />
                      </div>
                      <div className="sp-passtable__password">
                        <label className="sp-passtable__hidden" htmlFor={"sp_password_"+i}>Password</label>
                        <input id={"sp_password_"+i} type="password" readOnly value={d.password}/>
                      </div>
                      <button onClick={this.removePassword} data-url={d.url} className="sp-passtable__action">remove</button>
                    </li>)}
                  </ul>
                )
              } 
            })()}
          </div>


          <div className="col-12">
            <form onSubmit={this.onSubmit}>
            <div className="mb-3">
                <label className="form-label">
                  UserName/Email/Phonenumber
                </label>
                  <input className="form-control" name="userName" type="text" onChange={this.onChange}></input>
              </div>
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
          
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  passwords: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  passwords: state.passwords
});
export default connect(
  mapStateToProps,
  { logoutUser,addPassword, getPasswords, deletePassword}
)(Dashboard);