import React, { Component } from 'react'

export class Form extends Component {
    render() {
        return (
           <form onSubmit={this.props.getWeather}>
               <input className="inputt" type="text" name="city" placeholder="City..."></input>
               <input className="inputt" type="text" name="country" placeholder="Country..."></input>
               <button>Get Weather</button>
           </form>
        )
    }
}

export default Form
 