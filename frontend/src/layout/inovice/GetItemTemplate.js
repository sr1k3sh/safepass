import React, { Component } from 'react'

export default class GetItemTemplate extends Component {
    render() {
        return (
            <li className="rs-invoice__body-item">
                <ul className='rs-invoice__body-list'>
                    <li className='rs-invoice__body-item rs-invoice__item'>
                        {this.props.item}
                    </li>
                    <li className='rs-invoice__body-item rs-invoice__quantity'>
                        {this.props.quantity}
                    </li>
                    <li className='rs-invoice__body-item rs-invoice__rate'>
                        {this.props.rate}
                    </li>
                    <li className='rs-invoice__body-item rs-invoice__amount'>
                        {this.props.amount}
                    </li>
                </ul>
            </li>
        )
    }
}
