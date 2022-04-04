import './App.css';
import {Navigate} from "react-router-dom"
import Contact from './ChatPage/Contact';
import React, { Component, useState } from "react";
import './AppStyle.css';
import { BrowserRouter, Routes, Route, Link, Router } from 'react-router-dom';
import Login from "./LoginPage/Login";
import Register from "./LoginPage/Register";
import Chat from "./ChatPage/Chat";

//if i want to write children inside my component, instead of returning it in them, i can write them between its tag and make sure to return props.children from it.
function App() {
  const [name,setName] = useState('');
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={name==='' ? <Login setName = {setName}/> : <Navigate to = "./Chat"/>}></Route>
          <Route path='Register' element={<Register  />}></Route>
          <Route path='Chat' element={<Chat />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
