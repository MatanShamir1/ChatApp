import './App.css';
import Contact from './ChatPage/Contact';
import React, { Component } from "react";
import './AppStyle.css';
import { BrowserRouter, Routes, Route, Link, Router } from 'react-router-dom';
import Login from "./LoginPage/Login";
import Register from "./LoginPage/Register";
import Chat from "./ChatPage/Chat";

//if i want to write children inside my component, instead of returning it in them, i can write them between its tag and make sure to return props.children from it.
class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='Register' element={<Register/>}></Route>
          <Route path='./ChatPage/Chat' element={<Chat/>}></Route>
        </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
export default App;
