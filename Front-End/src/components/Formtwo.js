import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { button } from 'semantic-ui-react'
export class Formtwo extends Component {
    render() {
        return (
            <form onSubmit={this.props.getWeather}>

                {/* <input className="inputt" type="text" name="latitude" placeholder="Lat..."></input>
               <input className="inputt" type="text" name="longitude" placeholder="Lon..."></input> */}
                <button class="ui inverted violet button" >Get Weather</button>

            </form>
        )
    }
}

export default Formtwo
