import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser , addPassword, getPasswords, deletePassword } from "../../actions/authActions";
import PasswordForm from "../passwords-form/PasswordForm";
import PasswordList from "../passwords-list/PasswordList";

class Dashboard extends Component {

  constructor(){
    super();
    this.state ={
      userId: "",
      userName: "",
      url: "",
      password: "",
      errors: {},
      passwords:"",
      isClicked: false
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
    console.log('test')
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
  
  onClickPasswordBut = (e) =>{
    e.preventDefault();
    this.setState({
      isClicked:!this.state.isClicked
    })
  }

  render() {
    const { data } = this.props.passwords;
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <button className="btn btn-outline-primary sp-addpassword" onClick={this.onClickPasswordBut}>Add passwords</button>  
            {(() => {
              if (this.state.isClicked) {
                return (
                  <PasswordForm onSubmit={this.onSubmit} onChange={this.onChange}></PasswordForm>
                )
              } 
            })()}
          </div>
        </div>
        <div className="row">
          <div className="col-12"> 
            <PasswordList data={data}></PasswordList>
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