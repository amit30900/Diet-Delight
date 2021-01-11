import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Cookies } from 'react-cookie'

import axios from './axiosInstance'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import LandingPage from './components/Landing_Page';
import AdminDash from './components/Admin';

import { login } from './features/userSlice'
import { setToken } from './features/tokenSlice'

import { useDispatch } from 'react-redux'


function App() {

  let cookie = new Cookies();
  let dispatch = useDispatch();
  let gettingcookie = cookie.get("access_token")

  useEffect(() => {

    const ac = new AbortController();

    dispatch(setToken({
      access_token: gettingcookie,
    }))

    return () => ac.abort();

  }, [dispatch, gettingcookie])

  useEffect(() => {

    const ac = new AbortController();

    axios.get('user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    }).then((res) => {
      dispatch(login({
        id: res.data.id,
        name: res.data.name,
        email: res.data.email,
        mobile: res.data.mobile,
        first_name: res.data.first_name,
        last_name: res.data.last_name,
      }))
    }).catch(err => console.log(err))

    return () => ac.abort();

  }, [dispatch])



  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Navbar isOpen={isOpen} toggle={toggle} />
          <Sidebar isOpen={isOpen} toggle={toggle} />
          <LandingPage />
        </Route>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/admin" exact component={AdminDash} />
      </Switch>
    </Router>
  );
}

export default App;
