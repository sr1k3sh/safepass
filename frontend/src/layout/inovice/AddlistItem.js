import React, { Component } from 'react'
import { connect } from 'react-redux';

export class Addlistitem extends Component {
    
    render() {
        return (
            <li className="rs-invoice__body-item">
                <ul className='rs-invoice__body-list'>
                        <li className='rs-invoice__body-item rs-invoice__item'>
                            <input className='form-control' ref={this.props.refItem} name="item" type="text" onChange={this.props.onChange} placeholder='add item'></input>
                        </li>
                        <li className='rs-invoice__body-item rs-invoice__quantity'>
                            <input className='form-control' ref={this.props.refQuantity} name="quantity" onChange={this.props.onChange} type="number" placeholder="1"></input>
                        </li>
                        <li className='rs-invoice__body-item rs-invoice__rate'>
                            <input className='form-control' ref={this.props.refRate} name="rate" onChange={this.props.onChange} type="number" placeholder="1"></input>
                        </li>
                        <li className='rs-invoice__body-item rs-invoice__amount'>
                            <input className='form-control' ref={this.props.refAmount} name="amount" type="number" placeholder="1000"></input>
                        </li>
                </ul>
            </li>
        )
    }
}
export default connect(
    (state) => ({
      score: state.score
    })
)(Addlistitem)