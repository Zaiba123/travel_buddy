// import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { MdPlace } from 'react-icons/md';
import { Image } from 'react-bootstrap';
export default class MapContainer extends Component {
  state = {
    style: {
      maxWidth: '1200px',
    }
  };
  map = null;
  maps = null;
  apiIsLoaded = ({ map, maps }) => {
    this.map = map;
    this.maps = maps;
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.destCoords.lat && this.props.destCoords.lat) {
      this.updateMapDirections();
    }
  }
  updateMapDirections() {
    if (this.maps && this.map) {
      const directionsService = new this.maps.DirectionsService();
      const directionsDisplay = new this.maps.DirectionsRenderer();
      directionsService.route({
        origin: `${this.props.centerCoords.lat},${this.props.centerCoords.lng}`,
        destination: `${this.props.destCoords.lat},${this.props.destCoords.lng}`,
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
          const routePolyline = new this.maps.Polyline({
            path: response.routes[0].overview_path,
            strokeColor: 'blue',
            strokeOpacity: 1.0,
            strokeWeight: 2
          });
          routePolyline.setMap(this.map);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
  }
  render() {
    return (
      <div style={{ height: 'calc(100vh - 118px)', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDMda7TV57EnsuSh4pu49UqhoHUKzaPNvc' }}
          defaultCenter={{ lat: this.props.centerCoords.lat, lng: this.props.centerCoords.lng }}
          center={{ lat: this.props.centerCoords.lat, lng: this.props.centerCoords.lng }}
          defaultZoom={11}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={this.apiIsLoaded} >
          <Marker id={1} lat={this.props.centerCoords.lat} lng={this.props.centerCoords.lng} />
          {this.props.destCoords.lat && (
            <Marker id={2} lat={this.props.destCoords.lat} lng={this.props.destCoords.lng} />
          )}
          {this.props.venueCoords && this.props.venueCoords.length > 0 && (
            this.props.venueCoords.map((coords, index) => (
              <Marker id={2 + index} lat={coords.lat} lng={coords.lng} description={this.props.events[index].title} />
            ))
          )}
        </GoogleMapReact>
        {/*<Map*/}
        {/*  google={this.props.google} zoom={14}*/}
        {/*  style={this.state.style}*/}
        {/*  initialCenter={{lat: this.props.centerCoords.lat, lng: this.props.centerCoords.lng}}*/}
        {/*  center={{lat: this.props.centerCoords.lat, lng: this.props.centerCoords.lng}}>*/}
        {/*  <Marker*/}
        {/*    position={{lat: this.props.centerCoords.lat, lng: this.props.centerCoords.lng}}*/}
        {/*    name={'Current location'} />*/}
        {/*</Map>*/}
      </div>
    );
  }
}
class Marker extends Component {
  state = {
    isDetailVisible: false
  }
  handleHover = (visible) => {
    this.setState({
      isDetailVisible: visible,
    });
  };
  render() {
    return (
      <div className='markerContainer'>
        <MdPlace text='Office' size='4em' className='md-place' onMouseEnter={() => this.handleHover(true)} onMouseLeave={() => this.handleHover(false)} />
        {this.state.isDetailVisible && this.props.description && (
          <div className='popup-thingy'>
            <div className='d-flex flex-row align-items-center'>
              <Image src={this.props.image} width='30px' roundedCircle onError={(e) => { e.target.src = '/listerProfile.png'; }} />
              <div className='popUpHeader  ml-2'>{this.props.description}</div>
            </div>
            <div className='mapMarkerLocationTxt popUpAddress my-2'><i>{this.props.address}</i></div>
          </div>
        )}
      </div>
    );
  }
}