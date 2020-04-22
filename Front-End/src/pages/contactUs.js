import React, {Component} from 'react';
import Title from "../components/Title";
import Formtwo from "../components/Form";
import Weathertwo from "../components/Weathertwo";

const API_KEY ="dd018e7b473f40c8ef87d5f6de0156d0"

export class ContactUsPage extends Component {
  getWeather =  async ()  => {
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
