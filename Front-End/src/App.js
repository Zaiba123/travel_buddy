import React from 'react'; //telling file to import react file
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

//const API_KEY = '';

//intilize component, create an instance of App that is extending React.component 
class App extends React.Component {
  //state is object that lives in component and keeps track of changing data in component, that change could be result of user interaction like clicking a button
  state = {
    //inital state of object
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }



  //create own method called getWeather, arrow functions allow you to use this keyword, it is bound to this function App component 
  getWeather = async (e) => {
    //this signifies single page applications
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;


    //`` template strings allow you to inject varaibles you defined into files
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=metric`);
    //convert response to json format
    const data = await api_call.json();

    //this is only rendering if we have these to avoid an error, basically if value has been added then only we render code otherwise do nothing
    if (city && country) {
      //logging what we get back from API
      //console.log(data);

      //how do we make sure this state contains whatever we get back from api?
      this.setState({
        //find where temperature is in the object and set temperature state to that
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    }
    //we set back to undefined b/c if we get false data then we dont need to access values 
    else {
      this.setState({
        //find where temperature is in the object and set temperature state to that
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter values"
      });
    }
  }
  render() {
    //render method returns JSX, and jsx can only return only element like ie: one div and put everything in one div
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
//we need to export so other files can import this component

 //setting up a prop and its value to this function 
 //<Form getWeather={this.getWeather}/>



