import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Banner extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <div className="col-xxl-12 sp-banner">
                <div className='sp-banner__image-wrapper'>
                    <img className='sp-banner__image' src={require('./../../assets/images/banner.png')} alt='banner background'></img>
                </div>
                <div>
                    <h1 className="sp-banner__header display-1">Simply privacy and compliance</h1>
                    <span className='sp-banner__desc'>Stop wasting time on figure out the password and start using SafePass to store your password!!</span>
                </div>
            </div>
        )
    }
}
