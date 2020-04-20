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
const API_KEY = "dd018e7b473f40c8ef87d5f6de0156d0";


const ContentItem = ({ item }) => (

    <Col xs="12" sm="6" md="4">
        <Container style={{ marginTop: 10 }}>
            <div class="ui raised very padded text container segment">
                <Card>
                    <CardBody>

                        <CardTitle>
                            {/* {<CardImg className="aa" top width="100%" src={"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + item.photos[0].photo_reference + "&key="}></CardImg>} */}
                            {item.name}
                        </CardTitle>

                        <CardText>
                            {item.types[0]}
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        </Container>
    </Col>

)


export class HubPage extends Component {
    state = {
        //list of items in the locations cards
        'items': [],
        //inital state of object
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    }

    //Calling the GooglePlaces function in the backend
    getPlaces = async () => {
        fetch('http://localhost:9000/get-places')
            .then(res => res.json())
            .then(res => this.setState({ 'items': res }));
    }


    //arrow function allow you to use this keyword
    getWeather = async (e) => {
        //state is object that keeps track of changing data within a component 
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=imperial`);

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
                error: undefined
            })
            this.getPlaces()
        }
        else {
            this.setState({
                //describe state
                //inital state of object
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: "Please enter values"


            })
        }

    }
    render() {
        return (
            <div>
                <Title />
                <Form getWeather={this.getWeather} />
                <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}



                />
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
