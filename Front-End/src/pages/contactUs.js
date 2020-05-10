
import React, {Component} from 'react';
import {   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import Titletwo from "../components/Titletwo";
import Formtwo from "../components/Formtwo";
import Weathertwo from "../components/Weathertwo";

const API_KEY =""

export class ContactUsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude:0,
      longitude:0,
      degrees:[],
    
      
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

          latitude: position.coords.latitude,
          longitude:position.coords.longitude
          // latitude: position.coords.latitude.toFixed(3),
          // longitude:position.coords.longitude.toFixed(0)

        }),
        
        err => console.log(err)
      );
    }
    // this.getWeather();

  }
  
  getWeather =  async (e)  => {
    e.preventDefault();
    // console.log(this.state.latitude);
    // console.log(this.state.longitude);
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.latitude}&lon=${this.state.longitude}&exclude=hourly,minutely&appid=${API_KEY}&units=imperial`);
    const data = await api_call.json();
    console.log(data);
    // const data = [
    //   {
    //     name: 'Sunday', degrees: 4000,
    //   },
    //   {
    //     name: 'Monday', degrees: 3000,
    //   },
    //   {
    //     name: 'Tuesday', degrees: 2000,
    //   },
    //   {
    //     name: 'Wednesday', degrees: 2780,
    //   },
    //   {
    //     name: 'Thursday', degrees: 1890,
    //   },
    //   {
    //     name: 'Friday', degrees: 2390,
    //   },
    //   {
    //     name: 'Saturday', degrees: 3490,
    //   },
    // ];

    let days_ = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
   
    let days_of_week = data.daily.map(day => {


      let degrees = day.temp.day;
      //let name = days_[new Date(day.dt*1000).getDay()];
      let name = new Date(day.dt*1000).toLocaleDateString().slice(0, -5);  
      // debugger;
      return { name, degrees }
    } )
    this.setState({
    degrees: days_of_week,
      
      
   })
   console.log(days_of_week);
    //const map1 = array1.map(x => x * 2);

  }
  
  
  
  render() {
    console.log(this.state.degrees);
   
    return (
      <h2>
        
        <div className="col-xs-5 title-container">
                  <Titletwo />
                </div>
                <div className="col-xs-7 form-container">
        <Formtwo getWeather={this.getWeather}/>
        <LineChart
        width={800}
        height={300}
        data={this.state.degrees}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="degrees" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    
        {/* <Weathertwo /> */}
        {/* <button onClick ={this.position}>W</button> */}
        </div>
      </h2>
    )
  }
}
