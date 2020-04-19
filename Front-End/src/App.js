import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {IndexPage, CurrencyExchangePage, ContactUsPage, AboutPage, HubPage} from './pages';
import {geolocated} from "react-geolocated";
import 'bootstrap/dist/css/bootstrap.min.css';
import {DefaultLayout} from './layouts';



class App extends React.Component {
  
  render() {
    return (
      <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
        <div className="App">
          <DefaultLayout />
          <Switch>
            <Route
              path='/currency-exchange' strict
              render={ props => <CurrencyExchangePage currLocation={this.props} /> }
            />
            <Route
              path='/contact-us' strict
              render={ props => <ContactUsPage /> }
            />
            <Route
              path='/about-us' strict
              render={ props => <AboutPage /> }
            />
             <Route
              path='/hub-page' strict
              render={ props => <HubPage /> }
            />
            <Route
              path='/' strict
              render={ props =>
                !this.props.isGeolocationAvailable ? (
                  <div>Your browser does not support Geolocation</div>
                ) : !this.props.isGeolocationEnabled ? (
                  <div>Geolocation is not enabled</div>
                ) : this.props.coords ? (
                  <IndexPage currLocation={this.props} />
                ) : (
                    <div>Getting the location data&hellip; </div>
                  )
              }
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
    
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(App);
