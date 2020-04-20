import React, { Component } from 'react'
import Title from "../components/Title";
import Form from "../components/Form";
import Weather from "../components/Weather";
//import "../components/Weather.css"
//const API_KEY= "";

export class HubPage extends Component {
    state = {
        //inital state of object
       temperature:undefined,
       city: undefined,
       country:undefined,
       humidity:undefined,
       description:undefined,
       error: undefined
    }
    //arrow function allow you to use this keyword
    getWeather = async(e) => {
        //state is object that keeps track of changing data within a component 
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=imperial`);
        
        //convert response to json format
        const data = await api_call.json();
        if(city && country){//only if these fields are filled then you return these
            console.log(data);
            this.setState({
                temperature:data.main.temp,
                city: data.name,
                country:data.sys.country,
                humidity: data.main.humidity,
                description:data.weather[0].description,
                error: undefined
            })
        }
        else{
            this.setState({
                //describe state
                    //inital state of object
                    temperature:undefined,
                    city: undefined,
                    country:undefined,
                    humidity:undefined,
                    description:undefined,
                error: "Please enter values"


            })
        }
        
    }
    render() {
        return (
            <div>
                <div className="col-xs-5 title-container">
                  <Title />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather 
                    temperature={this.state.temperature} 
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
            </div>
        )
    }
}

export default HubPage
