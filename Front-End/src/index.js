import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import App from './App.js'; //importing App component from this file
import * as serviceWorker from './serviceWorker';

//This is telling file to render this file "App" in this element
ReactDOM.render(<App />, document.getElementById('root'));
//first argument it takes is name of component, second argument is location of div you want to insert component into 


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
