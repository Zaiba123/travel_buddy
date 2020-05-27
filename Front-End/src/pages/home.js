import React, { Component } from "react";
import { Link } from "react-router-dom";
import MapContainer from "../components/googleMap";
import PlacesAutocomplete from "react-places-autocomplete";
import { Form, Card } from "react-bootstrap";
import axios from "axios";

const httpOptions = {
	params: {}
};

export class IndexPage extends Component {
	state = {
		originCenter: {},
		destCenter: {},
		venueCoords: [],
		eventCategories: {},
		zoom: 11,
		search: "",
		events: [],
		weather: null,
		distance: "",
		duration: "",
		view: 1,
		getText: ""
	};

	changeView = view => {
		this.setState({
			view
		});
	};

	componentDidMount = () => {
		this.setState({
			originCenter: {
				lat: this.props.currLocation.coords.latitude,
				lng: this.props.currLocation.coords.longitude
			}
		});
	};

	onChange = data => {
		this.setState({
			search: data,
			destCenter: {},
		});
	};

	onSelect = async data => {
		this.setState({
			search: data
		});
		httpOptions.params = {
			address: data
		};

		this.setState({
			getText: "Getting Location"
		});

		let response = await axios.get(
			"/get-coords",
			httpOptions
		);
		if (response.data.results && response.data.results.length > 0) {
			const result = response.data.results[0];
			this.setState({
				destCenter: result.geometry.location
			});

			httpOptions.params = {
				origins: `${this.props.currLocation.coords.latitude},${this.props.currLocation.coords.longitude}`,
				destinations: `${result.geometry.location.lat},${result.geometry.location.lng}`
			};

			this.setState({
				getText: "Getting Duration/Distance Data"
			});

			response = await axios.get(
				"/get-distance",
				httpOptions
			);

			if (
				response.data.rows &&
				response.data.rows.length > 0 &&
				response.data.rows[0].elements &&
				response.data.rows[0].elements.length > 0
			) {
				if (response.data.rows[0].elements[0].duration) {
					this.setState({
						distance: response.data.rows[0].elements[0].distance.text,
						duration: response.data.rows[0].elements[0].duration.text
					});
				} else {
					this.setState({
						distance: "Could not find any routes.",
						duration: ""
					});
				}
			}

			httpOptions.params = {
				origin: `${result.geometry.location.lat},${result.geometry.location.lng}`
			};

			this.setState({
				getText: "Getting Events"
			});

			response = await axios.get(
				"/get-events",
				httpOptions
			);

			const events = [];
			const eventLocations = [];
			const eventCategories = {};
			for (let i = 0; i < response.data.results.length; i++) {
				const event = response.data.results[i]; //console.log(event);
				const dupEvent = events.find(item => event.title === item.title); //console.log(dupEvent);
				if (dupEvent == null) {
					events.push(event);
					if (!eventCategories[event.category]) {
						eventCategories[event.category] = [event];
					} else {
						eventCategories[event.category].push(event);
					}
					eventLocations.push({
						lat: event.location[1],
						lng: event.location[0]
					});
				}
			}

			httpOptions.params = {
				query: data
			};

			this.setState({
				getText: "Getting Weather Data"
			});

			response = await axios.get(
				"/get-weather",
				httpOptions
			);
			const weather = response.data.current;

			this.setState({
				events,
				weather,
				eventCategories,
				venueCoords: eventLocations,
				getText: ""
			});
		}
	};

	render() {
		return (
			<div>
				<div className="container map-container">
					<div className="search">
						<Form.Group style={{ margin: "1rem 0" }}>
							<PlacesAutocomplete
								value={this.state.search}
								onChange={data => this.onChange(data)}
								onSelect={data => this.onSelect(data)}
							>
								{({
									getInputProps,
									suggestions,
									getSuggestionItemProps,
									loading
								}) => (
										<div>
											<Form.Control
												type="text"
												placeholder="State"
												style={{ height: "30px", fontSize: "18px", color: "black" }}
												name="address3"
												{...getInputProps({
													placeholder: "Search Places ...",
													className: "location-search-input"
												})}
												onKeyDown={e => {
													if (e.key === "Enter") e.preventDefault();
												}}
											/>
											<div className="autocomplete-dropdown-container">
												{loading && <div>Loading...</div>}
												{suggestions.map(suggestion => {
													const className = suggestion.active
														? "suggestion-item--active"
														: "suggestion-item";
													// inline style for demonstration purpose
													const style = suggestion.active
														? { backgroundColor: "#fafafa", cursor: "pointer" }
														: { backgroundColor: "#ffffff", cursor: "pointer" };
													return (
														<div
															{...getSuggestionItemProps(suggestion, {
																className,
																style
															})}
														>
															<span>{suggestion.description}</span>
														</div>
													);
												})}
											</div>
										</div>
									)}
							</PlacesAutocomplete>
						</Form.Group>
						{this.state.getText && <div>{this.state.getText}</div>}
					</div>
					<div className="map">
						<MapContainer
							events={this.state.events}
							centerCoords={
								this.state.originCenter ? this.state.originCenter : {}
							}
							destCoords={this.state.destCenter ? this.state.destCenter : {}}
							venueCoords={this.state.venueCoords}
						/>
					</div>
				</div>
				{this.state.duration &&
					this.state.events &&
					this.state.events.length > 0 &&
					this.state.weather ? (
						<div className="container">
							<div className="travel">
								<h3>Travel</h3>
								<p>
									{this.state.duration && "Distance: "}
									{this.state.distance}
								</p>
								{this.state.duration ? (
									<p>Duration: {this.state.duration}</p>
								) : (
										""
									)}
							</div>
							<div className="events">
								<h3>Categorized Events</h3>
								{Object.keys(this.state.eventCategories).map(category => (
									<div className="event-category">
										<h5>{category[0].toUpperCase() + category.substring(1)}</h5>
										<div className="d-flex flex-wrap">
											{this.state.eventCategories[category].map(event => (
												<div className="flex-grow-1 d-flex justify-content-center">
													<span class="border border-info">
														<Card style={{ width: "370px" }} className="mb-4">
															<Card.Body>
																<Card.Title
																	as={Link}
																	to={`/event/${event.id}`}
																	className="h5"
																>
																	{event.title}
																</Card.Title>
																<Card.Subtitle className="my-2 text-muted">
																	{event.entities.length > 0 &&
																		event.entities[0].formatted_address}
																</Card.Subtitle>
															</Card.Body>

														</Card>
													</span>
												</div>
											))}
										</div>
									</div>
								))}
							</div>
							<div className="weather py-3 px-5">
								<h3>Weather</h3>
								<div className="row">
									<div className="col">
										<p>{this.state.now}</p>
										<p>
											{this.state.weather.weather_descriptions[0]}{" "}
											<img
												src={this.state.weather.weather_icons[0]}
												alt=""
												className="weather-icon"
											/>
										</p>
										<p className="temp d-flex align-items-start">
											<span className="temp-val">16</span>
											<span className="degree">o</span>
											<span className="temp-unit">C</span>
										</p>
									</div>
									<div className="col other-det">
										<p>Wind Speed: {this.state.weather.wind_speed} km/h</p>
										<p className=' d-flex align-items-start'>Feels Like: {this.state.weather.feelslike} <span className="degree"> o</span>C</p>
										<p>Visibility: {this.state.weather.visibility}</p>
										<p>Humidity: {this.state.weather.humidity}</p>
									</div>
								</div>
							</div>
						</div>
					) : (
						""
					)}
			</div>
		);
	}
}