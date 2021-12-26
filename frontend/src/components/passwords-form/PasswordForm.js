import React, { Component } from 'react'

export default class PasswordForm extends Component {
    render() {
        return (
            <div className="sp-passform">
                <form  autoComplete="off" onSubmit={this.props.onSubmit}>
                    <div className="mb-3">
                        <label className="form-label">
                        UserName/Email/Phonenumber
                        </label>
                        <input autoComplete="off" className="form-control" name="userName" type="text" onChange={this.props.onChange}></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                        url
                        </label>
                        <input autoComplete="off" className="form-control" name="url" type="text" onChange={this.props.onChange}></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                        password
                        </label>
                        <input autoComplete="off" className="form-control" name="password" type="password" onChange={this.props.onChange}></input>
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
        )
    }
}
