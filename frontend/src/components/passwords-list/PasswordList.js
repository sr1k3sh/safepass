import React, { Component } from 'react'

export default class PasswordList extends Component {
    render() {
        return (
            <div>
                {(() => {
                    if (this.props.data) {
                        return (
                        <ul className="sp-passtable">
                            <li className="sp-passtable__item sp-passtable__item--title">
                            <span className="sp-passtable__username">Username/Email/Phone</span>
                            <span className="sp-passtable__url">URL</span>
                            <span className="sp-passtable__password">Password</span>
                            <span className="sp-passtable__action">Action</span>
                            </li>
                            {this.props.data.map((d,i)=><li className="sp-passtable__item" key={i}>
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
                            <div className="sp-passtable__action">
                                <button onClick={this.removePassword} data-url={d.url} className="btn btn-outline-danger sp-passtable__btn sp-passtable__btn--round" aria-label="remove ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                                </button>
                            </div>
                            </li>)}
                        </ul>
                        )
                    } 
                })()}
            </div>
        )
    }
}
