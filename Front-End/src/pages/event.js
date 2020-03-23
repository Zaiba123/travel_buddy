import React, { Component } from "react";
import * as axios from 'axios';
import * as moment from 'moment';

const httpOptions = {
	params: {}
};

export class EventPage extends Component {
	state = {
    eventId: '',
    event: {},
	};

	componentDidMount() {
		this.setState({
			eventId: this.props.match.params.id
		}, () => {
      this.getEventDetails();
    });
	}

	async getEventDetails() {
    httpOptions.params.eventId = this.state.eventId;
    const response = await axios.get(
      "http://localhost:9000/get-event-details",
      httpOptions
    );

    const event = response.data.results[0];

    event.start = event.start ? moment(event.start).format('DD MMMM, YYYY') : '';
    event.end = event.end ? moment(event.end).format('DD MMMM, YYYY') : '';

    if (event.start === event.end) {
      event.end = '';
    }

    this.setState({
      event
    });
  }

	render() {
		return (
      <div>
        {this.state.event.title && (
          <div className='container my-2'>
            <h3>{this.state.event.title}</h3>
            <h5>Location: {this.state.event.entities && this.state.event.entities.length > 0 ? this.state.event.entities[0].formatted_address : 'Not Provided'}</h5>
            {this.state.event.start && this.state.event.end ? (
              <div>{`${this.state.event.start} - ${this.state.event.end}`}</div>
            ) : (
              <div>{this.state.event.start}</div>
            )}
          </div>
        )}
      </div>
    );
	}
}
