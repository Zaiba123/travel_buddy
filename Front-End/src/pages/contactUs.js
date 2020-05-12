
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
      description:[],
      icon:[],
      temperature : undefined,
    }
  }

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
    // .then(data => this.setState({ loading: false })); 

    const data = await api_call.json();
    
    console.log(data);
    // success: function(data) {
    //   $('#icon').append("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>");
    // }
    if (this.state.latitude && this.state.longitude) {
      this.setState({
        temperature : data.daily.temp,
       // icon: data.daily.weather[0].icon, 
      }); 
    }
  //   else {
  //     this.setState({
  //         //describe state
  //         //inital state of object
  //         temperature: undefined,
  //        //icon : undefined,


  //     })
  // }

  

    //let days_ = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
   
    let days_of_week = data.daily.map(day => {


      let degrees = day.temp.day;
      let description= day.weather[0].description;
      let icon= day.weather[0].icon;
      //let name = days_[new Date(day.dt*1000).getDay()];
      let name = new Date(day.dt*1000).toLocaleDateString().slice(0, -5);  
      // debugger;
      return { name, degrees,description,icon }
    } )
    this.setState({
    degrees: days_of_week,
    description: days_of_week,
    icon:days_of_week,

   })
  console.log(this.state.icon);
    //const map1 = array1.map(x => x * 2);

  }
  //function(icon){
   
  //}
  render() {
    //console.log(this.state.description);
   
    return (
      <h2>
        
        <div className="col-xs-5 title-container">
                  <Titletwo />
                </div>
                <div className="col-xs-7 form-container">
        <Formtwo getWeather={this.getWeather}/>
        <Weathertwo 
        temperature = {this.state.temperature}
        icon = {this.state.icon}
      />
        <LineChart
        width={1100}
        height={300}
        ///data={this.state.degrees}
        // data={this.state.descsription}
        data={this.state.degrees}
        // data={this.state.icon}

        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#FFFFFF" />
        <YAxis stroke="#FFFFFF" />
        <Tooltip />
        <Legend wrapperStyle={{  backgroundColor: '#FFFFF' }} />
        <Line type="monotone" dataKey="degrees" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="description" stroke="#8884d8" activeDot={{ r: 8 }} />
        {/* <Line type="monotone" dataKey="icon" stroke="#8884d8" activeDot={{ r: 2 }} /> */}


      </LineChart>
     
    
        {/* <Weathertwo /> */}
        {/* <button onClick ={this.position}>W</button> */}
        </div>
      </h2>
    )
  }
}
