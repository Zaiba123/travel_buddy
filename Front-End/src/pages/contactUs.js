import React, {Component} from 'react';
import Title from "../components/Title";
import Formtwo from "../components/Formtwo";
import Weathertwo from "../components/Weathertwo";

const API_KEY =""

export class ContactUsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude:0,
      longitude:0,
    }
  }
//   componentDidMount() {
//     position = async () => {
//     await navigator.geolocation.getCurrentPosition(
//       position => this.setState({
//         latitude:position.coords.latitude,
//         longitude:position.coords.longitude
//       }),
//       err => console.log(err)
//     );
//     console.log(this.state.latitude);
//   }
// }

//trial 2 
  // componentDidMount() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.watchPosition(function(position) {
  //       console.log("Latitude is :", position.coords.latitude);
  //       console.log("Longitude is :", position.coords.longitude);

  //       position = async () => {
  //         await navigator.geolocation.getCurrentPosition(
  //           position => this.setState({
  //             latitude:position.coords.latitude,
  //             longitude:position.coords.longitude
  //           }),
  //           err => console.log(err)
  //         );
  //         console.log(this.state.latitude);
  //       }     
  //     });
  //   }
  // }

  //trial 3
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => this.setState({
          latitude: position.coords.latitude.toFixed(3),
          longitude:position.coords.longitude.toFixed(0)
        }),
        err => console.log(err)
      );
    }

  }
  
  getWeather =  async (e)  => {
    e.preventDefault();
     
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.latitude}&lon=${this.state.longitude}.9&appid=${API_KEY}&units=imperial`);
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
        <button onClick ={this.position}>W</button>
      </h2>
    )
  }
}
