import React, { Component } from 'react'


export default class Weathertwo extends Component {

    render() {
        return (
            <div>

                {
                    this.props.temperature && <p className="weather__key">Temperature:
                    <span>{this.props.temperature}</span>
                    </p>
                }
                {
                    this.props.icon &&
                    <p className="weather_key">
                        <img className="weather_icon" src={'https://openweathermap.org/img/wn/' + this.props.icon + '@2x.png'} alt="image did not load" />
                    </p>
                }
                  {/* { THIS WORKS STATICALLY 
                    this.props.icon &&
                    <p className="weather_key">
                        <img className="weather_icon" src={`https://openweathermap.org/img/wn/02d@2x.png`} alt="image did not load" />
                    </p>
                } */}
                {/* {
            this.props.icon && 
                <p className="weather_key">  
                
                   image: <img className="icon" alt=" " src={`https://openweathermap.org/img/wn/02d@2x.png`}  />

                </p> 
        } */}
            </div>
        )
    }
}
// {
//     this.props.temperature && 
//    <p className="weather_key">  
//        Image: <img className="icon" src={`https://openweathermap.org/img/wn/${this.props.icon}@2x.png`} />
//    </p> 
// }