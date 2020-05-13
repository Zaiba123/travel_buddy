import React, { Component } from 'react'

export class Weather extends Component {
    render() {
        return (
            <div className="weather__info">
                {
                    //all conditions have to be true for this to happen
                    this.props.city && this.props.country && <p className="weather__key">Location:
                    <span>{this.props.city} , {this.props.country}</span>
                    </p>
                }
                {
                    this.props.temperature && <p className="weather__key">Temperature:
                    <span>{this.props.temperature}</span>°F
                    </p>
                }
                {
                    this.props.humdity && <p className="weather__key">Humdity:
                    <span>{this.props.humdity}</span>
                    </p>
                }
                {
                    this.props.description && <p className="weather__key text-capitalize">Conditions:
                    <span>{this.props.description}</span>
                    </p>
                }
                {/* {
                 this.props.temperature && 
                <p className="weather_key">  
                    Image: <img className="weather_icon" src={`https://openweathermap.org/img/wn/${this.props.weather_icon}@2x.png`} />
                </p> 
        } */}
                {
                    this.props.error && <p className="weather__error">
                        <span>{this.props.error}</span>
                    </p>
                }
            </div>
        )
    }
}

export default Weather
