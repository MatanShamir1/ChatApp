import './App.css';
import { Navigate } from "react-router-dom"
import React, { useState, useEffect } from "react";
import './AppStyle.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./LoginPage/Login";
import Register from "./LoginPage/Register";
import Chat from "./ChatPage/Chat";
import users from './LoginPage/usersList';
import contactLists from "./ChatPage/contactLists";

//if i want to write children inside my component, instead of returning it in them, i can write them between its tag and make sure to return props.children from it.
function App() {
  const [name, setName] = useState('');
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={name === '' || name === 'GO_TO_LOGIN' ? <Login setName={setName} /> : <Navigate to="./Chat" />}></Route>
          <Route path='Register' element={name === 'GO_TO_LOGIN' ? <Navigate to="/" /> : <Register setName={setName} />}></Route>
          <Route path='Chat' element={<Chat user={name} setName={setName}/>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
