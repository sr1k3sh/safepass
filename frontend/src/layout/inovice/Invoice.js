import React, { Component } from 'react'
import Addlistitem from './AddlistItem';
import GetItemTemplate from './GetItemTemplate';

export default class Invoice extends Component {
    constructor(){
        super();
        this.state = {
            item:"",
            quantity:0,
            rate: 0,
            amount: 0,
            newList : "",
            data:[],
            subTotal:0,
            discountPercent:0,
            total: 0,
            advanceAmount: 0,
            balanceAmount: 0
        }

        this.refQuantity = React.createRef();
        this.refAmount = React.createRef();
        this.refRate = React.createRef();
        this.refItem = React.createRef();

    }

    onAddList = async(e) =>{
        e.preventDefault();
        if(this.refQuantity.current.value && this.refRate.current.value && this.refAmount.current.value && this.refItem.current.value){
            await this.setState(prevState => ({
                data: [...prevState.data, {
                    quantity:prevState.quantity,
                    rate: prevState.rate,
                    amount: prevState.amount,
                    item: prevState.item
                }]
            }));
    
            this.refQuantity.current.value = '';
            this.refRate.current.value = '';
            this.refAmount.current.value = '';
            this.refItem.current.value = '';

            let stotal = 0;
            if(this.state.data.length){
               if(this.state.data.length>1){
                    stotal = this.state.data.map(d=>d.amount).reduce((a,b)=>a+b,0);
                    console.log(stotal,this.state.data)
               }    
               else{
                   stotal = this.state.data[0].amount;
               }
            }else{
                stotal  = 0;
            }

            await this.setState(prevState => ({
                subTotal: stotal,
                total: stotal - stotal * prevState.discountPercent/100
            }));

        }
    }

    onChange = async (e) =>{
        e.preventDefault();
        let q = this.refQuantity.current.value === "" ? 0 : this.refQuantity.current.value;
        let r = this.refRate.current.value === "" ? 0 : this.refRate.current.value;
        this.refAmount.current.value = q*r;

        await this.setState({
            [e.target.name]:e.target.value,
            amount: q*r
        });
    }

    onDiscountChange = async (e) =>{
        e.preventDefault();
        await this.setState(prevState => ({
            discountPercent: e.target.value,
            total: (prevState.subTotal - prevState.subTotal*(e.target.value/100))
        }));
    }

    onAdvancePaid = async (e) =>{
        e.preventDefault();
        await this.setState(prevState => ({
            advanceAmount:e.target.value,
            balanceAmount: prevState.total - e.target.value
        }));

        console.log(this.state)
    }

    render() {
        return (
            <div className='rs-invoice__wrapper'>
                <form className='rs-invoice__form'>
                    <div className='rs-invoice__row'>
                        <div className='rs-invoice__form-element rs-invoice__upload-wrapper'>
                            <label htmlFor="rs_invoice_add_logo" className='form-label'><strong>+</strong> Add logo</label>
                            <input id="rs_invoice_add_logo" className='form-control rs-invoice__upload-input' type="file"></input>
                        </div>
                        <div className='rs-invoice__form-element rs-invoice__label--bold'>
                            <label className='form-label fs-1 '>Inovice</label>
                            <div className='input-group'>
                                <span className='input-group-text'>#</span>
                                <input className='form-control' type="text"></input>
                            </div>
                        </div>
                    </div>
                    <div className='rs-invoice__row'>
                        <div className='rs-invoice__container'>
                            <div className='rs-invoice__form-element'>
                                <label className='form-label rs-invoice__hidden'>invoice from</label>
                                <textarea className='form-control' placeholder='Who is the invoice from? (required)'></textarea>
                            </div>
                            <div className='rs-invoice__sub-container'>
                                <div className='rs-invoice__form-element'>
                                    <label className='form-label'>Bill To</label>
                                    <textarea className='form-control' placeholder='Who is this inovice to? (required)'></textarea>
                                </div>
                                <div className='rs-invoice__form-element'>
                                    <label className='form-label'>Ship To</label>
                                    <textarea className='form-control' placeholder='(optional)'></textarea>
                                </div>
                            </div>
                        </div>
                        <div className='rs-invoice__container'>
                            <div className='rs-invoice__form-element rs-invoice__form-element--row'>
                                <label className='form-label'>Date</label>
                                <input type="date" className='form-control'></input>
                            </div>
                            <div className='rs-invoice__form-element rs-invoice__form-element--row'>
                                <label className='form-label'>Payment Terms</label>
                                <input type='text' className='form-control' placeholder='(optional)'></input>
                            </div>
                            <div className='rs-invoice__form-element rs-invoice__form-element--row'>
                                <label className='form-label'>Due Date</label>
                                <input type="date" className='form-control'></input>
                            </div>
                            <div className='rs-invoice__form-element rs-invoice__form-element--row'>
                                <label className='form-label'>Po Number</label>
                                <input type='text' className='form-control' placeholder='(optional)'></input>
                            </div>
                        </div>
                    </div>
                    <div className='rs-invoice__row'>
                        <div className='rs-invoice__container'>
                            <ul className='rs-invoice__list-wrapper' ref={this.textInput}>
                                <li className='rs-invoice__header'>
                                    <ul className='rs-invoice__header-list'>
                                        <li className='rs-invoice__header-item rs-invoice__item'>Item</li>
                                        <li className='rs-invoice__header-item rs-invoice__quantity'>Quantity</li>
                                        <li className='rs-invoice__header-item rs-invoice__rate'>Rate</li>
                                        <li className='rs-invoice__header-item rs-invoice__amount'>Amount</li>
                                    </ul>
                                </li>
                                {
                                    this.state.data && this.state.data.map((d,i)=>{
                                        if(d !== 0){
                                           return <GetItemTemplate item={d.item} quantity={d.quantity} rate={d.rate} amount={d.amount} key={i}></GetItemTemplate>
                                        }
                                        else{
                                            return false;
                                        }
                                    })
                                }
                                <Addlistitem onChange={this.onChange} refQuantity={this.refQuantity} refRate={this.refRate} refAmount={this.refAmount} refItem={this.refItem}></Addlistitem>
                            </ul>
                            <button className='btn btn-primary' onClick={this.onAddList}>Add item</button>
                        </div>
                    </div>
                    <div className='rs-invoice__row'>
                        <div className='rs-invoice__container'>
                            <div className='rs-invoice__form-element'>
                                <label className='form-label'>Notes</label>
                                <textarea className='form-control' type='text' placeholder='Note - any relevant information not already covered'></textarea>
                            </div>
                            <div className='rs-invoice__form-element'>
                                <label className='form-label'>Terms</label>
                                <textarea className='form-control' type='text' placeholder='Term and Conditions'></textarea>
                            </div>
                        </div>
                        <div className='rs-invoice__container'>
                            <div className='rs-invoice__form-element rs-invoice__form-element--row'>
                                <span className='rs-invoice__span-text'>SubTotal</span>
                                <span className='rs-invoice__span-text'>{this.state.subTotal}</span>
                            </div>
                            <div className='rs-invoice__form-element rs-invoice__form-element--row'>
                                <label className='form-label'>Discount</label>
                                <input className='form-control float-end text-end' onChange={this.onDiscountChange} type='number' placeholder='discount %'></input>
                            </div>
                            <div className='rs-invoice__form-element rs-invoice__form-element--row'>
                                <span className='rs-invoice__span-text'>Total</span>
                                <span className='rs-invoice__span-text'>{this.state.total}</span>
                            </div>
                            <div className='rs-invoice__form-element rs-invoice__form-element--row'>
                                <label className='form-label'>Amount Paid</label>
                                <input className='form-control float-end text-end' type='number' onChange={this.onAdvancePaid} placeholder='advance paid'></input>
                            </div>
                            <div className='rs-invoice__form-element rs-invoice__form-element--row'>
                                <span className='rs-invoice__span-text'>Balance Due</span>
                                <span className='rs-invoice__span-text'>{this.state.balanceAmount}</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
