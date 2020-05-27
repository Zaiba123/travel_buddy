import React, { Component } from 'react'
import Title from "../components/Title";
import Form from "../components/Form";
import Weather from "../components/Weather";

import 'bootstrap/dist/css/bootstrap.css';
import {
    Row, Col, Card, CardBody, CardTitle, CardText, CardImg
} from 'reactstrap';
import { Container } from 'semantic-ui-react'

//import "../components/Weather.css"
import Axios from 'axios';
const API_KEY = "";



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
                <br></br>
                <br></br>
                <br></br>
                <br></br>

            </div>
        </Container>
    </Col>

)


export class HubPage extends Component {
    state = {
        //list of items in the locations cards
        'items': [],
        //inital state of object
        // temp: 60,
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined,

        latitude: undefined,
        longitude: undefined
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

    /*  
    Calling the GooglePlaces function in the backend
    The function requirements:
    -temperature
    -weather condition
    -location
    The funtion will return a json object
    */
    getPlaces = () => {
        Axios.get(`/get-places?temperature=${this.state.temperature}&status=${this.state.description}&lat=${this.state.latitude}&lon=${this.state.longitude}`)
            .then(res => {
                const response = res.data
                this.setState({ 'items': response })
            })
            .then(console.log(this.state.latitude))

    }


    //arrow function allow you to use this keyword
    getWeather = async (e) => {
        //state is object that keeps track of changing data within a component 
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        //const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=imperial`);
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=${API_KEY}&units=imperial`);
        //convert response to json format
        const data = await api_call.json();
        if (city && country) {//only if these fields are filled then you return these
            console.log(data);
            this.setState({
                temperature: data.main.temp,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                weather_icon: data.weather[0].icon,
                error: undefined
            })
            this.getPlaces()
        }
        else {
            this.setState({
                temperature: data.main.temp,
                //city: data.name,
                //country: data.sys.country,
                //humidity: data.main.humidity,
                description: data.weather[0].description,
                weather_icon: data.weather[0].icon,
                error: undefined
            })
            this.getPlaces()
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
                        // humidity={this.state.humidity}
                        // city={this.state.city}
                        //country={this.state.country}
                        description={this.state.description}
                        weather_icon={this.state.weather_icon}
                        error={this.state.error}
                    />
                </div>

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
        )
    }
}

export default HubPage
