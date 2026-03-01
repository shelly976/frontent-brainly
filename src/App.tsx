// import {Signup} from './assets/pages/signup';
import './App.css'
import axios from 'axios';
import {useState} from 'react';
import {Signin} from './assets/pages/signin';
import {Signup} from './assets/pages/signup';
import {Dashboard} from './assets/pages/dashboard';
import {HomePage} from './assets/pages/home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (<BrowserRouter>
  <Routes>
    <Route path='/signup' element={<Signup/>}></Route>
    <Route path='/signin' element={<Signin/>}></Route>
    <Route path='/dashboard'element={<Dashboard/>}></Route>
    <Route path='/' element={<HomePage></HomePage>}></Route>
  </Routes>
  </BrowserRouter>);
}

export default App