
import React, { Component } from 'react';
import Axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Titletwo from "../components/Titletwo";
import Formtwo from "../components/Formtwo";
import Weathertwo from "../components/Weathertwo";
import Weather from "../components/Weather";


import 'bootstrap/dist/css/bootstrap.css';
import {
  Row, Col, Card, CardBody, CardTitle, CardText, CardImg
} from 'reactstrap';
import { Container } from 'semantic-ui-react'

const API_KEY = ""

const ContentItem = ({ item }) => (

  <Col xs="12" sm="6" md="4">
    <Container style={{ marginTop: 10 }}>
      <div class="ui raised very padded text container segment">
        <Card className='card-c'>
          <CardBody className="card-b">

            <CardTitle className="card-t">
              {item.name}
            </CardTitle>

            <CardText className="card-n">
              {item.types[0]}
            </CardText>
          </CardBody>
        </Card>
     

      </div>
    </Container>
  </Col>

)


export class ContactUsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

      latitude: 0,
      longitude: 0,
      degrees: [],
      description: [],
      icon: [],
      temperature: undefined,


      current_description: undefined,
      current_temperature: undefined,
      error: undefined,
      'items': [],
    }
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => this.setState({

          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }),

        err => console.log(err)
      );
    }
  }

  getWeather = async (e) => {
    e.preventDefault();
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.latitude}&lon=${this.state.longitude}&exclude=hourly,minutely&appid=${API_KEY}&units=imperial`);


    const data = await api_call.json();

    console.log(data);
    if (this.state.latitude && this.state.longitude) {
      this.setState({
        temperature: data.daily.temp,

      });
    }


    let days_of_week = data.daily.map(day => {


      let degrees = day.temp.day;
      let description = day.weather[0].description;
      let icon = day.weather[0].icon;
      let name = new Date(day.dt * 1000).toLocaleDateString().slice(0, -5);
      return { name, degrees, description, icon }
    })
    this.setState({
      degrees: days_of_week,
      description: days_of_week,
      icon: days_of_week,

    })
    console.log(this.state.icon);
    this.getCurrentWeather();

  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  getPlaces = () => {
    Axios.get(`http://localhost:9000/get-places?temperature=${this.state.current_temperature}&status=${this.state.current_description}&lat=${this.state.latitude}&lon=${this.state.longitude}`)
      .then(res => {
        const response = res.data
        this.setState({ 'items': response })
      })
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  getCurrentWeather = async () => {

    // e.preventDefault();
    // const city = e.target.elements.city.value;
    // const country = e.target.elements.country.value;
    //const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=imperial`);
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=${API_KEY}&units=imperial`);
    //convert response to json format
    const data = await api_call.json();
    // if (city && country) {//only if these fields are filled then you return these
    console.log(data);
    this.setState({
      current_temperature: data.main.temp,
      current_description: data.weather[0].description,
      icon:data.weather[0].icon,
      error: undefined
    })

    //}
    // else {
    // this.setState({
    //   current_temperature: data.main.temp,
    //   current_description: data.weather[0].description,
    //   error: undefined
    // })
    this.getPlaces()
    // }
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  render() {
    return (
      <h2>

        <div className="col-xs-5 title-container">
          <Titletwo />
        </div>
        <div className="col-xs-7 form-container">
          <Formtwo getWeather={this.getWeather} />
          <Weather
            temperature={this.state.current_temperature}
            description={this.state.current_description}
            error={this.state.error}
          />
          <Weathertwo
            temperature={this.state.temperature}
            icon={this.state.icon}
          />
          <LineChart
            width={1200}
            height={250}
            data={this.state.degrees}

            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#FFFFFF" />
            <YAxis stroke="#FFFFFF" />
            <Tooltip />
            <Legend wrapperStyle={{ backgroundColor: '#FFFFF' }} />
            <br></br>
            <br></br>
            <Line type="monotone" dataKey="degrees" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="description" stroke="#8884d8" activeDot={{ r: 8 }} />

          </LineChart>

          <Container style={{ marginTop: 40 }}>
            <div >
              <Row >
                {this.state.items.map(function (item, index) {
                  return (
                    <ContentItem item={item} key={index} />

                  )
                })
                }
              </Row>
            </div>
          </Container>
        </div>
      </h2>
    )
  }
}
