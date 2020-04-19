import React, {Component} from 'react';

export class AboutPage extends Component {
  state = {
  
  };
  
  render() {
    return (
      // <h2>About Us</h2>
      <div className="aboutus">
      <h1 className="name">Adrian Barros</h1>
      <p>Senior at Hunter College graduating 2020</p>
      <a href={"https://github.com/Adrianbarros"} class="namel">Adrian's Github</a>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1 className="name">Zaiba Iqbal</h1>
      <p>Senior at Hunter College graduating 2020</p>
      <a href={"https://github.com/Zaiba123"} class="namel">Zaiba's Github</a>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1 className="name">Umar</h1>
      <p>Senior at Hunter College graduating 2020</p>
      <a href={"https://github.com/umarkhan207322405"} class="namel">Umar's Github</a>
    </div>
    )
  }
}
