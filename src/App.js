import './App.css';
import Contact from './ChatPage/Contact';
import React, {Component} from "react";
import './AppStyle.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

//if i want to write children inside my component, instead of returning it in them, i can write them between its tag and make sure to return props.children from it.
class App extends Component {
  render(){
      return(
        
        <></> // return only LOGIN!
      
      )
  }
}
export default App;
