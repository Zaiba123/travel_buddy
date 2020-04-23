import React, {Component} from 'react';
import Title from "../components/Title";
import Formtwo from "../components/Form";
import Weathertwo from "../components/Weathertwo";

const API_KEY =""

export class ContactUsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      });
    }
  }
  getWeather =  async (e)  => {
    e.preventDefault();
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=60.99&lon=30.9&appid=${API_KEY}`);
    const data = await api_call.json();
    console.log(data);
  }
  
  // state = {
  
  // };
  
  render() {
    return (
      <h2>
        <Title />
        <Formtwo getWeather={this.getWeather}/>
        <Weathertwo />

      </h2>
    )
  }
}
