import React, { Component } from 'react'

export class Weather extends Component {
    render() {
        return (
            <div>
                {
                    //all conditions have to be true for this to happen
                    this.props.city && this.props.country  &&<p>Location: 
                    <span>{this.props.city} , {this.props.country}</span>
                    </p>
               }
                { 
                    this.props.temperature && <p>Temperature: 
                    <span>{this.props.temperature}</span>
                    </p> 
                }
                { 
                    this.props.humdity && <p>Humdity: 
                    <span>{this.props.humdity}</span>
                    </p> 
                }
                { 
                    this.props.description && <p>Conditions: 
                    <span>{this.props.description}</span>
                    </p>
                }
                { 
                    this.props.error && <p>
                    <span>{this.props.error}</span>
                    </p>
                }
            </div>
        )
    }
}

export default Weather
