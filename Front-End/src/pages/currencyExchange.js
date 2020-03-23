import React, { Component } from 'react';
import axios from 'axios';
import {Form} from 'react-bootstrap';
import Select from 'react-select';

export class CurrencyExchangePage extends Component {
  state = {
    symbols: [],
    rates: {},
    from: '',
    to: '',
    amount: 0,
    exchange: 0,
  };
  
  componentDidMount() {
    this.getSymbols();
    this.getRates();
  }
  
  onFromChange = (event) => {
    this.setState({
      from: event.value,
    }, () => {
      this.exchangeCurrency();
    });
  };
  
  onToChange = (event) => {
    this.setState({
      to: event.value,
    }, () => {
      this.exchangeCurrency();
    });
  };
  
  onAmountChange = (event) => {
    this.setState({
      amount: event.target.value,
    }, () => {
      this.exchangeCurrency();
    });
  };
  
  exchangeCurrency = () => {
    const rates = this.state.rates;
    
    const fromRate = rates[this.state.from];
    const toRate = rates[this.state.to];
    
    const exchange = (toRate / fromRate) * this.state.amount;
    
    this.setState({
      exchange: exchange.toFixed(2),
    })
  };
  
  getSymbols = async () => {
    const response = await axios.get('http://localhost:9000/get-currency-symbols');
    
    const symbols = [];
    
    for (let symbol in response.data.symbols) {
      if (response.data.symbols.hasOwnProperty(symbol)) {
        symbols.push({
          label: response.data.symbols[symbol],
          value: symbol,
        })
      }
    }
    
    this.setState({
      symbols,
    });
  };
  
  getRates = async () => {
    const response = await axios.get('http://localhost:9000/get-latest-rates');
    
    this.setState({
      rates: response.data.rates,
    });
  };
  
  render() {
    return (
      <div className='container' style={{marginTop: '10px'}}>
        <Form.Group>
          <Form.Label>From</Form.Label>
          <Select options={this.state.symbols} name='from' onChange={event => this.onFromChange(event)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>To</Form.Label>
          <Select options={this.state.symbols} name='to' onChange={event => this.onToChange(event)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Enter the amount to exchange</Form.Label>
          <Form.Control placeholder='Enter amount' type='number' name='amount' onChange={event => this.onAmountChange(event)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Exchanged Amount: {this.state.exchange && !isNaN(this.state.exchange) ? this.state.exchange : 0}</Form.Label>
        </Form.Group>
      </div>
    )
  }
}
